const _title = 'Ufuk Güzel - Yazılım Geliştirici | Kişisel Web Sitesi';
const _titleShort = 'Ufuk Güzel';
const _subTitle = 'Yazılım Geliştirici';
const _description = 'Ufuk Güzel - Profesyonel web uygulamaları geliştiriyorum. Ayrıca mobil uygulamalar ve açık kaynak yazılımlar geliştiriyorum. GitHub, Google Play Store ve AppStore\'da yayınlanan projelerimi inceleyebilirsiniz.';
const _keywords = [
  'Ufuk Güzel',
  'Ufuk GÜZEL',
  'ufukkguzel',
  'ufukguzel',
  'guzelufuk',
  'ufukguzel58',
  'yazılım geliştirici',
  'web developer',
  'mobil uygulama geliştirici',
  'software developer',
  'frontend developer',
  'react developer',
  'next.js developer',
  'türk yazılımcı',
  'türk developer',
  'ufukguzel15',
  'blog',
  'mask'
];
const _email = 'me@kocosman.com.tr';
//const _ogImgPath = '/og-image.png';

const _socialAccounts = {
  x: 'ufukkguzel',
  medium: 'ufukkguzel',
  linkedin: 'ufukguzel',
  github: 'ufukguzel58'
};

const _urls = {
  website: 'https://ufukguzel.com',
  playStore: 'https://play.google.com/store/apps/dev?id=5499115100085978154',
  appStore: 'https://apps.apple.com/us/developer/osman-koc/id1729993108',
  gravatarImg: 'https://gravatar.com/avatar/8cdcd03a8317d08a507265de2fef0c73?s=96&d=mp',
};

export const sharedMetadata = {
  title: _title,
  titleShort: _titleShort,
  description: _description,
  keywords: _keywords,
  authors: [
    {
      name: _titleShort,
      url: _urls.website,
    }
  ],
  creator: _titleShort,
  publisher: _titleShort,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(_urls.website),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'wYTeRYwHS6QvhUtILNHaNgeAr6jTRh77g2vre6ZYST0',
  },
  subTitle: _subTitle,
  email: _email,
  urls: _urls,
  social: _socialAccounts,
  ogImage: {
    width: 1200,
    height: 630,
    type: 'image/png'
  },
  openGraph: {
    title: _title,
    description: _description,
    url: _urls.website,
    siteName: _title,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: _title,
        type: 'image/png',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _description,
    creator: `@${_socialAccounts.x}`,
    images: ['/og-image.png'],
  },
};
