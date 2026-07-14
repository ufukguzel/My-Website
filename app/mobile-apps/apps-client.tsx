'use client';

import { useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { formatDistanceToNow } from 'date-fns';
import { tr as trLocale, enUS } from 'date-fns/locale';
import {
  BadgeDollarSign,
  Lightbulb,
  Loader2,
  Mail,
  MessageSquareText,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FallbackImage } from '@/components/ui/fallback-image';
import { useLanguage } from '@/components/language-provider';
import { AppListings, getAppListing } from '@/lib/app-listings';
import { type AppListing, type AppOffer, type OfferCurrency } from '@/types/app-listing';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const translations = {
  en: {
    title: 'Apps for Sale',
    description:
      'Mobile apps I designed, built, and shipped — now looking for their next owner. Make an offer on any app, or pitch me an idea you want built.',
    asking: 'Asking',
    makeOffer: 'Make an offer',
    appStore: 'App Store',
    recentOffers: 'Recent offers',
    noOffers: 'No offers yet — be the first!',
    offerFor: 'Offer for',
    offerDialogDesc: 'Your offer goes straight to my inbox. I usually reply within 24 hours.',
    emailLabel: 'Your email',
    amountLabel: 'Offer amount',
    messageLabel: 'Message (optional)',
    messagePlaceholder: 'Anything you want to ask or add — transfer details, source code, timeline…',
    submitOffer: 'Send offer',
    sending: 'Sending…',
    offerSuccess: 'Your offer is in! 🎉 I will get back to you shortly.',
    offerError: 'Something went wrong. Please try again.',
    ideaTitle: 'Got an app idea?',
    ideaDescription:
      'Tell me what you want built, your expectations, and your budget in mind. If it clicks, we build it together.',
    ideaCta: 'I have an idea',
    ideaDialogTitle: 'Tell me your idea',
    ideaDialogDesc: 'Describe what you want to build and what you expect. It lands directly in my inbox.',
    ideaLabel: 'Your idea',
    ideaPlaceholder: 'What do you want to build? What problem does it solve? Who is it for?',
    expectationsLabel: 'Expectations (optional)',
    expectationsPlaceholder: 'Timeline, budget range, platforms, must-have features…',
    submitIdea: 'Send idea',
    ideaSuccess: 'Idea received! 💡 I will reach out to you soon.',
    close: 'Close',
  },
  tr: {
    title: 'Satılık Uygulamalar',
    description:
      'Tasarlayıp geliştirdiğim ve yayınladığım mobil uygulamalar — yeni sahibini arıyor. Dilediğin uygulamaya teklif ver ya da bana yaptırmak istediğin fikri anlat.',
    asking: 'İstenen',
    makeOffer: 'Teklif ver',
    appStore: 'App Store',
    recentOffers: 'Son teklifler',
    noOffers: 'Henüz teklif yok — ilk teklifi sen ver!',
    offerFor: 'Teklif:',
    offerDialogDesc: 'Teklifin doğrudan e-posta kutuma düşer. Genellikle 24 saat içinde dönüş yaparım.',
    emailLabel: 'E-posta adresin',
    amountLabel: 'Teklif tutarı',
    messageLabel: 'Mesaj (opsiyonel)',
    messagePlaceholder: 'Sormak ya da eklemek istediğin her şey — devir detayları, kaynak kod, zaman planı…',
    submitOffer: 'Teklifi gönder',
    sending: 'Gönderiliyor…',
    offerSuccess: 'Teklifin ulaştı! 🎉 En kısa sürede dönüş yapacağım.',
    offerError: 'Bir şeyler ters gitti. Lütfen tekrar dene.',
    ideaTitle: 'Bir fikrin mi var?',
    ideaDescription:
      'Ne yaptırmak istediğini, beklentilerini ve aklındaki bütçeyi anlat. Uyuşursak birlikte hayata geçirelim.',
    ideaCta: 'Bir fikrim var',
    ideaDialogTitle: 'Fikrini anlat',
    ideaDialogDesc: 'Ne yapmak istediğini ve beklentilerini yaz. Doğrudan e-posta kutuma ulaşır.',
    ideaLabel: 'Fikrin',
    ideaPlaceholder: 'Ne yaptırmak istiyorsun? Hangi problemi çözüyor? Kimin için?',
    expectationsLabel: 'Beklentilerin (opsiyonel)',
    expectationsPlaceholder: 'Zaman planı, bütçe aralığı, platformlar, olmazsa olmaz özellikler…',
    submitIdea: 'Fikri gönder',
    ideaSuccess: 'Fikrin ulaştı! 💡 En kısa sürede sana ulaşacağım.',
    close: 'Kapat',
  },
} as const;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const currencySymbol: Record<OfferCurrency, string> = { TRY: '₺', USD: '$' };

function formatAmount(amount: number, currency: OfferCurrency, locale: string) {
  return `${currencySymbol[currency]}${amount.toLocaleString(locale)}`;
}

async function fetchOffers(url: string): Promise<{ offers: AppOffer[] }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch offers');
  return res.json();
}

function AppCard({ app, onOffer, t, locale }: {
  app: AppListing;
  onOffer: (app: AppListing) => void;
  t: (typeof translations)['en' | 'tr'];
  locale: string;
}) {
  const { language } = useLanguage();

  return (
    <div
      data-anim="app-card"
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/80 via-background/70 to-background/80 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start gap-4 p-6 pb-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/20 via-background to-background">
          {app.image ? (
            <FallbackImage src={app.image} alt={app.name} fill className="object-cover" sizes="64px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
              {app.initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary">{app.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{app.tagline[language]}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{app.description[language]}</p>

        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          {app.askingPrice && (
            <p className="text-sm text-muted-foreground">
              {t.asking}:{' '}
              <span className="text-base font-semibold text-foreground">
                {formatAmount(app.askingPrice.amount, app.askingPrice.currency, locale)}
              </span>
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOffer(app)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.02] hover:shadow-lg"
            >
              <BadgeDollarSign size={16} />
              {t.makeOffer}
            </button>
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {t.appStore}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppsClient() {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language], [language]);
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  const dateLocale = language === 'tr' ? trLocale : enUS;
  const rootRef = useRef<HTMLDivElement>(null);

  const { data, mutate } = useSWR('/api/offers', fetchOffers);
  const offers = data?.offers ?? [];

  // Teklif dialogu
  const [selectedApp, setSelectedApp] = useState<AppListing | null>(null);
  const [offerEmail, setOfferEmail] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerCurrency, setOfferCurrency] = useState<OfferCurrency>('TRY');
  const [offerMessage, setOfferMessage] = useState('');
  const [offerStatus, setOfferStatus] = useState<FormStatus>('idle');
  const [offerError, setOfferError] = useState('');

  // Fikir dialogu
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [ideaEmail, setIdeaEmail] = useState('');
  const [ideaText, setIdeaText] = useState('');
  const [ideaExpectations, setIdeaExpectations] = useState('');
  const [ideaStatus, setIdeaStatus] = useState<FormStatus>('idle');
  const [ideaError, setIdeaError] = useState('');

  useGSAP(
    () => {
      const targets = '[data-anim="apps-header"], [data-anim="app-card"], [data-anim="apps-panel"]';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(targets, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        '[data-anim="apps-header"]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      );
      gsap.fromTo(
        '[data-anim="app-card"]',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.15 },
      );
      gsap.utils.toArray<HTMLElement>('[data-anim="apps-panel"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [language] },
  );

  const openOfferDialog = (app: AppListing) => {
    setSelectedApp(app);
    setOfferStatus('idle');
    setOfferError('');
  };

  const closeOfferDialog = () => {
    setSelectedApp(null);
    if (offerStatus === 'success') {
      setOfferEmail('');
      setOfferAmount('');
      setOfferMessage('');
    }
  };

  const submitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || offerStatus === 'sending') return;
    setOfferStatus('sending');
    setOfferError('');
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: selectedApp.id,
          email: offerEmail,
          amount: Number(offerAmount),
          currency: offerCurrency,
          message: offerMessage,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.error || t.offerError);
      }
      if (payload.offers) {
        mutate({ offers: payload.offers }, { revalidate: false });
      }
      setOfferStatus('success');
    } catch (err) {
      setOfferStatus('error');
      setOfferError(err instanceof Error ? err.message : t.offerError);
    }
  };

  const submitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaStatus === 'sending') return;
    setIdeaStatus('sending');
    setIdeaError('');
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ideaEmail, idea: ideaText, expectations: ideaExpectations }),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.error || t.offerError);
      }
      setIdeaStatus('success');
    } catch (err) {
      setIdeaStatus('error');
      setIdeaError(err instanceof Error ? err.message : t.offerError);
    }
  };

  return (
    <div ref={rootRef} className="space-y-12">
      <div data-anim="apps-header" className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Sparkles size={16} />
          {language === 'tr' ? 'Devren satılık' : 'Ready for acquisition'}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{t.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {AppListings.map((app) => (
          <AppCard key={app.id} app={app} onOffer={openOfferDialog} t={t} locale={locale} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Son teklifler */}
        <section
          data-anim="apps-panel"
          className="rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm md:p-8"
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <BadgeDollarSign className="h-5 w-5 text-primary" />
            {t.recentOffers}
          </h2>
          <div className="mt-6 space-y-4">
            {offers.length === 0 && (
              <p className="text-sm text-muted-foreground">{t.noOffers}</p>
            )}
            {offers.map((offer) => {
              const app = getAppListing(offer.appId);
              return (
                <div
                  key={offer.id}
                  className="rounded-2xl border border-border/60 bg-background/80 p-4 transition hover:border-primary/30"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium">
                      {app?.name ?? offer.appId}
                      <span className="ml-2 text-base font-semibold text-primary">
                        {formatAmount(offer.amount, offer.currency, locale)}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(offer.createdAt), { addSuffix: true, locale: dateLocale })}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{offer.email}</p>
                  {offer.message && (
                    <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MessageSquareText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {offer.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bir fikrim var */}
        <section
          data-anim="apps-panel"
          className="flex flex-col justify-between rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background/80 p-6 shadow-sm md:p-8"
        >
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <Lightbulb className="h-5 w-5 text-primary" />
              {t.ideaTitle}
            </h2>
            <p className="leading-relaxed text-muted-foreground">{t.ideaDescription}</p>
          </div>
          <button
            onClick={() => {
              setIdeaOpen(true);
              setIdeaStatus('idle');
              setIdeaError('');
            }}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.02] hover:shadow-lg"
          >
            <Lightbulb size={16} />
            {t.ideaCta}
          </button>
        </section>
      </div>

      {/* Teklif dialogu */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && closeOfferDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t.offerFor} {selectedApp?.name}
            </DialogTitle>
            <DialogDescription>{t.offerDialogDesc}</DialogDescription>
          </DialogHeader>

          {offerStatus === 'success' ? (
            <div className="space-y-4 py-4 text-center">
              <p className="text-lg">{t.offerSuccess}</p>
              <button
                onClick={closeOfferDialog}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={submitOffer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer-email" className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {t.emailLabel}
                </Label>
                <Input
                  id="offer-email"
                  type="email"
                  required
                  placeholder="adiniz@gmail.com"
                  value={offerEmail}
                  onChange={(e) => setOfferEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="offer-amount">{t.amountLabel}</Label>
                <div className="flex gap-2">
                  <Input
                    id="offer-amount"
                    type="number"
                    required
                    min={1}
                    step={1}
                    placeholder="25000"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex overflow-hidden rounded-md border border-input">
                    {(['TRY', 'USD'] as const).map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setOfferCurrency(cur)}
                        className={
                          offerCurrency === cur
                            ? 'bg-primary px-3 text-sm font-semibold text-primary-foreground'
                            : 'bg-background px-3 text-sm text-muted-foreground hover:bg-muted'
                        }
                      >
                        {currencySymbol[cur]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offer-message">{t.messageLabel}</Label>
                <Textarea
                  id="offer-message"
                  rows={3}
                  maxLength={1000}
                  placeholder={t.messagePlaceholder}
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                />
              </div>

              {offerStatus === 'error' && (
                <p className="text-sm text-destructive">{offerError}</p>
              )}

              <button
                type="submit"
                disabled={offerStatus === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:shadow-lg disabled:opacity-60"
              >
                {offerStatus === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.submitOffer}
                  </>
                )}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Fikir dialogu */}
      <Dialog open={ideaOpen} onOpenChange={setIdeaOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.ideaDialogTitle}</DialogTitle>
            <DialogDescription>{t.ideaDialogDesc}</DialogDescription>
          </DialogHeader>

          {ideaStatus === 'success' ? (
            <div className="space-y-4 py-4 text-center">
              <p className="text-lg">{t.ideaSuccess}</p>
              <button
                onClick={() => setIdeaOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={submitIdea} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idea-email" className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {t.emailLabel}
                </Label>
                <Input
                  id="idea-email"
                  type="email"
                  required
                  placeholder="adiniz@gmail.com"
                  value={ideaEmail}
                  onChange={(e) => setIdeaEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idea-text">{t.ideaLabel}</Label>
                <Textarea
                  id="idea-text"
                  rows={4}
                  required
                  minLength={10}
                  maxLength={3000}
                  placeholder={t.ideaPlaceholder}
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idea-expectations">{t.expectationsLabel}</Label>
                <Textarea
                  id="idea-expectations"
                  rows={3}
                  maxLength={3000}
                  placeholder={t.expectationsPlaceholder}
                  value={ideaExpectations}
                  onChange={(e) => setIdeaExpectations(e.target.value)}
                />
              </div>

              {ideaStatus === 'error' && <p className="text-sm text-destructive">{ideaError}</p>}

              <button
                type="submit"
                disabled={ideaStatus === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:shadow-lg disabled:opacity-60"
              >
                {ideaStatus === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.submitIdea}
                  </>
                )}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
