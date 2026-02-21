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

export interface PrivacySection {
  title: string;
  content: string;
}

export interface PrivacyContent {
  effectiveDate: string;
  introduction: string;
  sections: PrivacySection[];
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
  privacy: PrivacyContent;
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
    privacy: {
      effectiveDate: '2025-02-21',
      introduction:
        'EternaxCode ("we", "us", or "our") operates the Memoire application. This Privacy Policy explains how we collect, use, and protect your information when you use our app.',
      sections: [
        {
          title: '1. Information We Collect',
          content:
            'Memoire is designed with a local-first architecture. Your diary entries, photos, and personal data are stored locally on your device. We collect the following information only when you opt in to specific features:\n\n• Account Information: When you sign in with Google or Apple, we receive your name, email address, and profile photo to create your account.\n• Diary Data (Cloud Sync only): If you enable cloud sync, your diary entries and attached photos are uploaded to your personal iCloud (iOS) or Google Drive (Android) storage. This data is stored in your own cloud account, not on our servers.\n• Usage Analytics: We use Firebase Analytics to collect anonymous usage data (e.g., feature usage frequency, crash reports) to improve the app. No personal diary content is included in analytics.',
        },
        {
          title: '2. How We Use Your Information',
          content:
            '• To provide and maintain the app\'s core functionality\n• To sync your data across your devices via iCloud or Google Drive\n• To process in-app purchases for premium themes\n• To send daily reminder notifications (if enabled by you)\n• To improve app performance and fix bugs through anonymous analytics',
        },
        {
          title: '3. Data Storage & Security',
          content:
            '• Local Storage: All diary entries are stored in an encrypted SQLite database on your device.\n• Cloud Storage: When sync is enabled, data is stored in your personal iCloud or Google Drive account, protected by their respective security measures.\n• Authentication: We use Firebase Authentication with OAuth 2.0 (Google Sign-In, Apple Sign-In) for secure account access.\n• We do not store your diary content, photos, or personal entries on our servers.',
        },
        {
          title: '4. Third-Party Services',
          content:
            'Memoire uses the following third-party services:\n\n• Firebase (Google): Authentication, analytics, and user profile management\n• Apple iCloud: Cloud sync for iOS users\n• Google Drive: Cloud sync for Android users\n\nEach service has its own privacy policy. We encourage you to review them.',
        },
        {
          title: '5. Permissions',
          content:
            '• Camera: To take photos directly for diary entries\n• Photo Library: To select existing photos for diary entries\n• Notifications: To send daily writing reminders (optional)\n• Internet: To sync data and authenticate your account',
        },
        {
          title: '6. Data Retention & Deletion',
          content:
            'Your diary data remains on your device and in your cloud storage as long as you choose to keep it. You can delete individual entries at any time within the app. To delete your account and all associated data, go to Settings > Account > Delete Account. Cloud-synced data can be removed from your iCloud or Google Drive settings.',
        },
        {
          title: '7. Children\'s Privacy',
          content:
            'Memoire is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.',
        },
        {
          title: '8. Changes to This Policy',
          content:
            'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy within the app and updating the effective date.',
        },
        {
          title: '9. Contact Us',
          content:
            'If you have any questions about this Privacy Policy, please contact us at eternaxcode@gmail.com.',
        },
      ],
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
