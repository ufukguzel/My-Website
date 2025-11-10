'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { LanguageKey } from '@/lib/i18n/config';
import { defaultLanguage } from '@/lib/i18n/config';

type LanguageContextValue = {
  language: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageKey>(defaultLanguage);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

