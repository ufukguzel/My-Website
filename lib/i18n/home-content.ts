import type { LanguageKey } from '@/lib/i18n/config';

export const homeTranslations: Record<
  LanguageKey,
  {
    heroTagline: string;
    heroTitle: string;
    heroDescription: string;
    contactCta: string;
    currentLabel: string;
    currentRole: string;
    currentDescription: string;
    statsLabel: string;
    statsDetails: string[];
    workHeading: string;
    workDescription: string;
    chatHeading: string;
    latestPostsHeading: string;
    featuredProjectsHeading: string;
    viewAllLabel: string;
    languageLabel: string;
    languageOptions: Record<LanguageKey, string>;
  }
> = {
  en: {
    heroTagline: 'Product-minded software engineer',
    heroTitle: 'Hi, I’m Ufuk Güzel.',
    heroDescription:
      'I design scalable web applications and AI-powered experiences. From backend architecture to interface details, I focus on keeping the entire journey fast, simple, and reliable.',
    contactCta: 'Get in touch',
    currentLabel: 'Currently',
    currentRole: 'Junior Software Developer · Valde',
    currentDescription:
      'I craft data-centric modules for SaaS platforms and help teams establish shared engineering standards.',
    statsLabel: 'shipped projects & open-source contributions',
    statsDetails: [
      '• Modern UI architectures with React, Next.js, and Remix',
      '• AI-powered automations and conversational experiences',
    ],
    workHeading: 'How I work',
    workDescription:
      'I create end-to-end solutions across design systems, front-end architectures, and AI integrations. Partnering closely with product teams, I make data-informed decisions and continuously refine the user experience.',
    chatHeading: 'Chat with PlayAI',
    latestPostsHeading: 'Latest posts',
    featuredProjectsHeading: 'Featured projects',
    viewAllLabel: 'View all →',
    languageLabel: 'Language',
    languageOptions: {
      en: 'English',
      tr: 'Turkish',
    },
  },
  tr: {
    heroTagline: 'Ürün odaklı yazılım mühendisi',
    heroTitle: 'Merhaba, ben Ufuk Güzel.',
    heroDescription:
      'Ölçeklenebilir web uygulamaları ve yapay zekâ destekli deneyimler tasarlıyorum. Arka uç mimarisinden arayüz detaylarına kadar tüm yolculuğu hızlı, yalın ve güvenilir tutmaya odaklanıyorum.',
    contactCta: 'İletişime geç',
    currentLabel: 'Şu anda',
    currentRole: 'Junior Yazılım Geliştirici · Valde',
    currentDescription:
      'SaaS platformları için veri odaklı modüller geliştiriyor ve ekiplerin ortak mühendislik standartları oluşturmasına yardımcı oluyorum.',
    statsLabel: 'tamamlanan proje ve açık kaynak katkısı',
    statsDetails: [
      '• React, Next.js ve Remix ile modern UI mimarileri',
      '• Yapay zekâ destekli otomasyonlar ve sohbet deneyimleri',
    ],
    workHeading: 'Nasıl çalışıyorum',
    workDescription:
      'Tasarım sistemlerinden ön uç mimarilerine ve yapay zekâ entegrasyonlarına kadar uçtan uca çözümler geliştiriyorum. Ürün ekipleriyle yakın çalışarak veriye dayalı kararlar alıyor ve kullanıcı deneyimini sürekli iyileştiriyorum.',
    chatHeading: 'PlayAI ile sohbet et',
    latestPostsHeading: 'Son yazılar',
    featuredProjectsHeading: 'Öne çıkan projeler',
    viewAllLabel: 'Tümünü gör →',
    languageLabel: 'Dil',
    languageOptions: {
      en: 'İngilizce',
      tr: 'Türkçe',
    },
  },
};

export const homeExpertiseTags: Record<LanguageKey, string[]> = {
  en: [
    'React & Next.js',
    'TypeScript',
    'UI Engineering',
    'AI & LLM Integrations',
    'Data Analytics',
    'Cloud Architecture',
  ],
  tr: [
    'React & Next.js',
    'TypeScript',
    'Arayüz Mühendisliği',
    'Yapay Zekâ & LLM Entegrasyonları',
    'Veri Analitiği',
    'Bulut Mimarisi',
  ],
};

export const homeFocusAreas: Record<
  LanguageKey,
  Array<{
    title: string;
    description: string;
  }>
> = {
  en: [
    {
      title: 'Product-led experiences',
      description:
        'I design modern web products that balance performance, accessibility, and user delight throughout the journey.',
    },
    {
      title: 'AI-augmented solutions',
      description:
        'I build data-informed, scalable AI integrations that automate workflows and create new product capabilities.',
    },
    {
      title: 'Mentorship & community',
      description:
        'I collaborate with teams, share best practices, and contribute to community initiatives and events.',
    },
  ],
  tr: [
    {
      title: 'Ürün odaklı deneyimler',
      description:
        'Performans, erişilebilirlik ve kullanıcı memnuniyetini dengede tutan modern web ürünleri tasarlıyorum.',
    },
    {
      title: 'Yapay zekâ ile güçlenen çözümler',
      description:
        'İş akışlarını otomatikleştiren ve yeni ürün yetenekleri oluşturan, veriye dayalı ölçeklenebilir yapay zekâ entegrasyonları geliştiriyorum.',
    },
    {
      title: 'Mentorluk ve topluluk',
      description:
        'Ekiplerle iş birliği yapıyor, en iyi uygulamaları paylaşıyor ve topluluk girişimlerine katkıda bulunuyorum.',
    },
  ],
};

