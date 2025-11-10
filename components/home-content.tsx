'use client';

import { useMemo } from 'react';
import { BriefcaseBusiness, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import PlayAIEmbed from '@/components/playai-embed';
import { MediumPosts } from '@/components/medium-posts';
import { FeaturedProjects } from '@/components/featured-projects';
import { useLanguage } from '@/components/language-provider';
import {
  homeExpertiseTags,
  homeFocusAreas,
  homeTranslations,
} from '@/lib/i18n/home-content';

export default function HomeContent() {
  const { language } = useLanguage();

  const t = useMemo(() => homeTranslations[language], [language]);
  const tags = useMemo(() => homeExpertiseTags[language], [language]);
  const areas = useMemo(() => homeFocusAreas[language], [language]);

  return (
    <div className="relative space-y-20">

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-8 md:p-12 shadow-xl backdrop-blur">
        <div className="grid gap-12 items-center md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles size={16} />
              {t.heroTagline}
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.heroDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:me@ufukguzel.com.tr"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.02] hover:shadow-lg"
              >
                <Mail size={18} />
                {t.contactCta}
              </a>
              <div className="flex gap-2 text-muted-foreground">
                <a
                  href="https://github.com/ufukguzel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/60 transition hover:border-primary/50 hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ufukguzel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/60 transition hover:border-primary/50 hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">{t.currentLabel}</p>
                  <p className="text-base font-semibold">{t.currentRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t.currentDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background/80 p-6 shadow-sm">
              <p className="text-4xl font-bold">40+</p>
              <p className="text-sm text-muted-foreground">{t.statsLabel}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {t.statsDetails.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">{t.workHeading}</h2>
            <p className="leading-relaxed text-muted-foreground">
              {t.workDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-sm text-foreground/80 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {areas.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">{t.chatHeading}</h2>
        <div className="flex justify-center">
          <PlayAIEmbed />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tight">{t.latestPostsHeading}</h2>
          <a
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t.viewAllLabel}
          </a>
        </div>
        <MediumPosts />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tight">{t.featuredProjectsHeading}</h2>
          <a
            href="/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t.viewAllLabel}
          </a>
        </div>
        <FeaturedProjects />
      </section>
    </div>
  );
}

