export type StoreLink = {
  type: 'appstore' | 'playstore';
  url: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  sourceUrl?: string;
  storeLinks?: StoreLink[];
};