"use client";

import { useMemo, useState } from "react";
import { MediumPosts } from "@/components/medium-posts";
import { useLanguage } from "@/components/language-provider";
import { blogTranslations } from "@/lib/i18n/blog-content";

export default function BlogClient() {
  const { language } = useLanguage();
  const t = blogTranslations[language];
  const [query, setQuery] = useState("");

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">{t.heading}</h1>
          <p className="text-sm text-muted-foreground">
            {t.description}
          </p>
        </div>

        <div className="w-full sm:w-[320px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-10 w-full rounded-full border border-border/60 bg-background/70 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            aria-label={t.searchAriaLabel}
          />
        </div>
      </div>

      <MediumPosts query={normalizedQuery} />
    </div>
  );
}
