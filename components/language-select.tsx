'use client';

import { useMemo } from 'react';
import type { LanguageKey } from '@/lib/i18n/config';
import { homeTranslations } from '@/lib/i18n/home-content';
import { useLanguage } from '@/components/language-provider';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSelect() {
  const { language, setLanguage } = useLanguage();
  const copy = useMemo(() => homeTranslations[language], [language]);

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as LanguageKey)}>
      <SelectTrigger
        aria-label={copy.languageLabel}
        className="flex h-8 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80 px-0 text-sm shadow-sm hover:border-primary/50 focus:ring-primary/40"
      >
        <Globe size={14} className="text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent className="min-w-[140px] rounded-lg border border-border/60 bg-background/95 backdrop-blur">
        {Object.entries(copy.languageOptions).map(([key, label]) => (
          <SelectItem key={key} value={key} className="text-sm">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

