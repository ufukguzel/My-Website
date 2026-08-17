import type { LanguageKey } from '@/lib/i18n/config';

export const blogTranslations: Record<
  LanguageKey,
  {
    heading: string;
    description: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    loadError: string;
    noPosts: string;
    noSearchResults: string;
    noImage: string;
    readArticle: string;
  }
> = {
  en: {
    heading: 'Blog Posts',
    description: 'Quickly search through posts (title and description).',
    searchPlaceholder: 'Search…',
    searchAriaLabel: 'Search the blog',
    loadError: 'An error occurred while loading Medium posts',
    noPosts: 'There are no published Medium posts at the moment. I’ll add new content soon.',
    noSearchResults: 'No posts match your search.',
    noImage: 'No image available',
    readArticle: 'Read article',
  },
  tr: {
    heading: 'Blog Yazıları',
    description: 'Yazılar arasında hızlıca arayın (başlık ve açıklama).',
    searchPlaceholder: 'Ara…',
    searchAriaLabel: 'Blog içinde ara',
    loadError: 'Medium yazıları yüklenirken bir hata oluştu',
    noPosts: 'Şu anda yayınlanmış Medium yazısı yok. Yakında yeni içerikler ekleyeceğim.',
    noSearchResults: 'Aramanızla eşleşen yazı bulunamadı.',
    noImage: 'Görsel yok',
    readArticle: 'Yazıyı oku',
  },
};
