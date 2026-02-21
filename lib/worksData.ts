// ─── Content Types for App Projects ───

export interface SpecContent {
  headline: string;
  introduction: string;
  features: { icon: string; title: string; description: string }[];
  techStack: string[];
}

export interface SupportContent {
  headline: string;
  description: string;
  faqs: { question: string; answer: string }[];
  contactEmail: string;
}

export interface MarketingContent {
  headline: string;
  subheadline: string;
  highlights: { metric: string; label: string }[];
  ctaText: string;
  ctaUrl: string;
}

// ─── Discriminated Union ───

interface WorkProjectBase {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  image?: string;
  fallbackGradient: string;
  fallbackLabel: string;
  accentColor: string;
}

export interface WebProject extends WorkProjectBase {
  type: 'web';
}

export interface AppProject extends WorkProjectBase {
  type: 'app';
  subtitle: string;
  heroDescription: string;
  spec: SpecContent;
  support: SupportContent;
  marketing: MarketingContent;
}

export type WorkProject = WebProject | AppProject;

// ─── Data ───

export const worksData: WorkProject[] = [
  {
    type: 'web',
    id: 'ddubakehouse',
    title: 'ddubakehouse.com',
    url: 'https://ddubakehouse.com',
    description:
      'A web experience for Ddu Bakehouse, a bakery in Jeju. Built with modern web technologies to capture the brand\'s warm and unique atmosphere.',
    tags: ['Web', 'Branding'],
    image: '/works/ddubakehouse.png',
    fallbackGradient: 'from-amber-900 via-orange-800 to-yellow-900',
    fallbackLabel: 'ddubakehouse',
    accentColor: 'rgba(245, 158, 11, 0.4)',
  },
  {
    type: 'web',
    id: 'lottopuri',
    title: '로또풀이.kr',
    url: 'https://로또풀이.kr',
    description:
      'A fun lottery prediction service based on Korean saju (사주) fortune-telling. Combines traditional fortune analysis with modern UX.',
    tags: ['Web', 'Entertainment'],
    image: '/works/lottopuri.png',
    fallbackGradient: 'from-emerald-900 via-green-800 to-teal-900',
    fallbackLabel: '로또풀이',
    accentColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    type: 'web',
    id: 'econalk',
    title: 'econalk.com',
    url: 'https://econalk.com',
    description:
      'An AI-powered news platform delivering economic insights in multiple languages. Real-time analysis with multilingual support.',
    tags: ['AI', 'News', 'Multi-language'],
    image: '/works/econalk.png',
    fallbackGradient: 'from-blue-900 via-indigo-800 to-purple-900',
    fallbackLabel: 'econalk',
    accentColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    type: 'app',
    id: 'memoire',
    title: 'Memoire',
    url: '#',
    description:
      'A visual diary for daily moments. Capture beautiful memories with photos, organize with calendar view, and create magazine-style PDF books.',
    tags: ['App', 'iOS', 'Android', 'Coming Soon'],
    fallbackGradient: 'from-rose-900 via-pink-800 to-fuchsia-900',
    fallbackLabel: 'Memoire',
    accentColor: 'rgba(244, 63, 94, 0.4)',
    subtitle: 'A visual diary for daily moments.',
    heroDescription:
      'Memoire is an Instagram-style visual diary app that lets you record daily memories with photos and text. Browse entries on an infinite-scroll calendar, generate magazine-style PDF books, customize themes, and sync seamlessly across devices via iCloud or Google Drive — all with a local-first, privacy-focused architecture.',
    spec: {
      headline: 'What is Memoire?',
      introduction:
        'Memoire transforms daily journaling into a beautiful visual experience. Capture moments with photos, tag emotions and weather, browse your life on a calendar, and turn your memories into stunning PDF books — all while keeping your data private and synced across devices.',
      features: [
        {
          icon: '📸',
          title: 'Visual Diary Entries',
          description: 'Create entries with multiple photos, text, emotion tags (Happy, Grateful, Excited...), and weather conditions. EXIF data auto-fills the capture date.',
        },
        {
          icon: '📅',
          title: 'Calendar View',
          description: 'Infinite-scroll monthly calendar with dot indicators showing entries per date. Quickly navigate and revisit any day.',
        },
        {
          icon: '📖',
          title: 'PDF Book Export',
          description: 'Generate magazine-style PDF books from your entries. Choose from Magazine, Photo Album, or Journal templates.',
        },
        {
          icon: '☁️',
          title: 'Cloud Sync',
          description: 'Automatic bi-directional sync with iCloud (iOS) or Google Drive (Android). Smart conflict resolution keeps your data safe.',
        },
        {
          icon: '🎨',
          title: 'Theme Customization',
          description: 'Five built-in themes — Classic, Warm Sunset, Ocean Breeze, Dark Mode, and Nature — plus premium themes available via in-app purchase.',
        },
        {
          icon: '🌐',
          title: '16 Languages',
          description: 'Full localization for English, Korean, Japanese, Chinese, German, French, Spanish, Thai, Hindi, Portuguese, Arabic, Russian, and more.',
        },
      ],
      techStack: ['Flutter', 'Dart', 'Riverpod', 'Drift (SQLite)', 'Firebase', 'iCloud', 'Google Drive', 'PDF Generation'],
    },
    support: {
      headline: 'Support',
      description: 'We\'re here to help you get the most out of Memoire. Check our frequently asked questions below or reach out directly.',
      faqs: [
        {
          question: 'How do I create my first diary entry?',
          answer: 'Tap the "+" button on the home screen, write your thoughts, attach photos from your camera or gallery, select your mood and weather, then hit save.',
        },
        {
          question: 'Is my data backed up?',
          answer: 'Yes. Memoire syncs automatically in the background — via iCloud on iOS and Google Drive on Android. Your entries and photos are safely backed up every hour.',
        },
        {
          question: 'Can I export my diary as a book?',
          answer: 'Absolutely! Go to the Book tab, tap "Create New Book", select a date range, choose from Magazine, Photo Album, or Journal templates, and generate a beautiful PDF.',
        },
        {
          question: 'Is Memoire free?',
          answer: 'Memoire is free to download with all core features — unlimited entries, calendar view, PDF export, cloud sync, and daily reminders. Premium themes are available as optional in-app purchases.',
        },
        {
          question: 'How do I change the app theme?',
          answer: 'Go to Settings > Theme. Five themes are included for free (Classic, Warm Sunset, Ocean Breeze, Dark Mode, Nature). Additional premium themes can be purchased from the Theme Shop.',
        },
        {
          question: 'Which languages are supported?',
          answer: 'Memoire supports 16 languages: English, Korean, Japanese, Chinese, German, French, Spanish, Thai, Hindi, Portuguese, Arabic, Russian, Indonesian, Vietnamese, Turkish, and Italian.',
        },
      ],
      contactEmail: 'eternaxcode@gmail.com',
    },
    marketing: {
      headline: 'Every moment deserves to be remembered.',
      subheadline: 'Memoire — the visual diary app that makes capturing your daily life effortless and beautiful. Available on iOS and Android.',
      highlights: [
        { metric: '16+', label: 'Languages Supported' },
        { metric: '∞', label: 'Unlimited Entries' },
        { metric: '3', label: 'PDF Book Templates' },
        { metric: '0¢', label: 'Free to Start' },
      ],
      ctaText: 'Download on the App Store',
      ctaUrl: '#',
    },
  },
];

// ─── Helpers ───

export function getAppProjects(): AppProject[] {
  return worksData.filter((p): p is AppProject => p.type === 'app');
}

export function getAppProjectById(id: string): AppProject | undefined {
  return getAppProjects().find((p) => p.id === id);
}
