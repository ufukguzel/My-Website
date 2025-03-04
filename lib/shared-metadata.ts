const _title = 'Ufuk Güzel - Software Developer, | Portfolio & Blog';
const _titleShort = 'Ufuk Güzel';
const _subTitle = 'Software Developer';
const _description = 'I develop web-based applications professionally. I also develop mobile applications and open source software for hobby purposes. You can review what is published on GitHub, Google Play Store and AppStore.';
const _keywords = ['Ufuk GÜZEL', 'Ufuk Güzel', 'ufukkguzel', 'ufukguzel', 'guzelufuk', 'ufukguzel58', 'dev', 'developer', 'ufukguzel15', 'blog', 'mask'];
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
  subTitle: _subTitle,
  description: _description,
  keywords: _keywords,
  email: _email,
  urls: _urls,
  social: _socialAccounts,
  ogImage: {
    width: 1200,
    height: 630,
    type: 'image/png'
  }
  // openGraph: {
  //   title: _title,
  //   description: _description,
  //   url: _urls.website,
  //   siteName: _title,
  //   images: [
  //     {
  //       url: _ogImgPath,
  //       width: 1200,
  //       height: 630,
  //       alt: _title,
  //       type: 'image/png',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: _title,
  //   description: _description,
  //   images: [_ogImgPath],
  // },
};
