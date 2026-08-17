import { NextResponse } from 'next/server';
import { getAppListing } from '@/lib/app-listings';
import { type AppOffer, type OfferCurrency } from '@/types/app-listing';

export const dynamic = 'force-dynamic';

const OWNER_EMAIL = 'ufukguzel15@gmail.com';
const MAX_MESSAGE_LENGTH = 1000;
const MAX_OFFERS_RETURNED = 8;

// In-memory store: dev/HMR arasında globalThis üzerinde yaşar.
// NOT: Vercel serverless'ta cold start'ta sıfırlanır — kalıcılık için Vercel KV/Upstash önerilir.
type OfferStore = { __appOffers?: AppOffer[] };
const store = globalThis as unknown as OfferStore;

const seedOffers: AppOffer[] = [
  {
    id: 'seed-1',
    appId: 'cloudin',
    email: 'mehmet.k@gmail.com',
    amount: 38000,
    currency: 'TRY',
    message: 'Kaynak kodu ve App Store hesabı devri dahil mi?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'seed-2',
    appId: 'sleepy-fairytales',
    email: 'aylin.dev@gmail.com',
    amount: 52000,
    currency: 'TRY',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 71).toISOString(),
  },
  {
    id: 'seed-3',
    appId: 'handoff',
    email: 'buyer.apps@gmail.com',
    amount: 900,
    currency: 'USD',
    message: 'Interested in the full IP transfer. Can we schedule a call?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
];

function getOffers(): AppOffer[] {
  if (!store.__appOffers) {
    store.__appOffers = [...seedOffers];
  }
  return store.__appOffers;
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const visible = local.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(local.length - 2, 1))}@${domain}`;
}

function toPublicOffer(offer: AppOffer) {
  return { ...offer, email: maskEmail(offer.email) };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function GET() {
  const offers = getOffers()
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, MAX_OFFERS_RETURNED)
    .map(toPublicOffer);

  return NextResponse.json({ offers });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  const { appId, email, amount, currency, message, website } = (body ?? {}) as {
    appId?: string;
    email?: string;
    amount?: number;
    currency?: OfferCurrency;
    message?: string;
    website?: string; // honeypot
  };

  // Honeypot: botlar doldurur, insanlar görmez.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const app = appId ? getAppListing(appId) : undefined;
  if (!app) {
    return NextResponse.json({ error: 'Uygulama bulunamadı.' }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin.' }, { status: 400 });
  }
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0 || numericAmount > 100_000_000) {
    return NextResponse.json({ error: 'Geçerli bir teklif tutarı girin.' }, { status: 400 });
  }
  if (currency !== 'TRY' && currency !== 'USD') {
    return NextResponse.json({ error: 'Geçersiz para birimi.' }, { status: 400 });
  }
  const trimmedMessage = (message ?? '').trim().slice(0, MAX_MESSAGE_LENGTH);

  const offer: AppOffer = {
    id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    appId: app.id,
    email: email.trim(),
    amount: Math.round(numericAmount),
    currency,
    message: trimmedMessage || undefined,
    createdAt: new Date().toISOString(),
  };

  getOffers().unshift(offer);

  let emailSent = false;
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `💰 Yeni Teklif: ${app.name} — ${offer.amount.toLocaleString('tr-TR')} ${offer.currency}`,
        _template: 'table',
        Uygulama: app.name,
        Teklif: `${offer.amount.toLocaleString('tr-TR')} ${offer.currency}`,
        'E-posta': offer.email,
        Mesaj: trimmedMessage || '-',
        Tarih: new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }),
      }),
    });
    emailSent = response.ok;
  } catch {
    emailSent = false;
  }

  const offers = getOffers()
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, MAX_OFFERS_RETURNED)
    .map(toPublicOffer);

  return NextResponse.json({ ok: true, emailSent, offers });
}
