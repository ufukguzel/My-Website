import { type AppListing } from '@/types/app-listing';

// Mock listings — appStoreUrl ve fiyatları gerçek verilerle güncelleyin.
export const AppListings: AppListing[] = [
  {
    id: 'cloudin',
    name: 'Cloudin',
    initials: 'CL',
    tagline: {
      en: 'All your cloud storage in one place',
      tr: 'Tüm bulut depolaman tek bir yerde',
    },
    description: {
      en: 'Manage multiple cloud accounts, move files between providers, and keep everything organized from a single iOS app.',
      tr: 'Birden fazla bulut hesabını yönet, sağlayıcılar arasında dosya taşı ve her şeyi tek bir iOS uygulamasından düzenle.',
    },
    appStoreUrl: 'https://apps.apple.com/tr/app/cloudin/id6747094017',
    askingPrice: { amount: 45000, currency: 'TRY' },
    tags: ['iOS', 'SwiftUI', 'Cloud'],
  },
  {
    id: 'sleepy-fairytales',
    name: 'Sleepy Fairytales',
    initials: 'SF',
    image: '/images/sleepy-fairytales.png',
    tagline: {
      en: 'AI-generated bedtime stories for kids',
      tr: 'Çocuklar için yapay zekâ destekli uyku masalları',
    },
    description: {
      en: 'Personalized bedtime stories generated with AI, with soothing narration and a kid-friendly interface.',
      tr: 'Yapay zekâ ile kişiselleştirilmiş uyku masalları; sakinleştirici seslendirme ve çocuk dostu arayüz.',
    },
    appStoreUrl: 'https://apps.apple.com/tr/app/', // TODO: gerçek App Store linki
    askingPrice: { amount: 60000, currency: 'TRY' },
    tags: ['iOS', 'AI', 'Kids'],
  },
  {
    id: 'handoff',
    name: 'HandOff',
    initials: 'HO',
    tagline: {
      en: 'Seamless task handoff between your devices',
      tr: 'Cihazların arasında kesintisiz görev aktarımı',
    },
    description: {
      en: 'Start a task on one device and continue on another. Clipboard, links, and files sync instantly across your ecosystem.',
      tr: 'Bir cihazda başladığın işe diğerinde devam et. Pano, bağlantılar ve dosyalar ekosistemin genelinde anında senkronize olur.',
    },
    appStoreUrl: 'https://apps.apple.com/tr/app/', // TODO: gerçek App Store linki
    askingPrice: { amount: 35000, currency: 'TRY' },
    tags: ['iOS', 'Productivity', 'Sync'],
  },
];

export function getAppListing(id: string): AppListing | undefined {
  return AppListings.find((app) => app.id === id);
}
