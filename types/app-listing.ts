export type AppListing = {
  id: string;
  name: string;
  tagline: { en: string; tr: string };
  description: { en: string; tr: string };
  appStoreUrl?: string;
  image?: string;
  initials: string;
  askingPrice?: { amount: number; currency: OfferCurrency };
  tags: string[];
};

export type OfferCurrency = 'TRY' | 'USD';

export type AppOffer = {
  id: string;
  appId: string;
  email: string;
  amount: number;
  currency: OfferCurrency;
  message?: string;
  createdAt: string;
};
