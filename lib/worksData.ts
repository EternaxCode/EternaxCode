import type { PixelSpriteKey } from '@/lib/pixelSprites';

// ─── Lifecycle Status (shared by every project) ───

export type ProjectStatus = 'live' | 'in-development' | 'discontinued';

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In Development',
  discontinued: 'Service Ended',
};

// ─── Content Types for Game Projects ───

export interface GameStats {
  /** 0–5 scale, rendered as segmented pixel bars. */
  atk: number;
  def: number;
  spd: number;
}

export interface GameUnit {
  name: string;
  nameEn: string;
  role: string;
  description: string;
  sprite: PixelSpriteKey;
  stats: GameStats;
}

export interface GameFeature {
  sprite: PixelSpriteKey;
  title: string;
  description: string;
}

export interface GameOperation {
  title: string;
  description: string;
}

export interface GameRoadmapItem {
  phase: string;
  title: string;
  description: string;
  done: boolean;
}

export interface GameContent {
  genre: string;
  platforms: string[];
  players: string;
  /** Short build tag shown on the title screen, e.g. "DEV BUILD". */
  buildLabel: string;
  /** Spoken by the baker NPC in the intro dialogue box. */
  pitch: string;
  features: GameFeature[];
  units: GameUnit[];
  enemies: GameUnit[];
  operations: GameOperation[];
  roadmap: GameRoadmapItem[];
  /** Set once the game is playable; the "Press Start" button links here. */
  playUrl?: string;
}

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

// ─── Case Study (shared by every project) ───

export interface CaseStudyOverview {
  summary: string;
  challenge: string;
  approach: string;
  scope: string[];
}

export interface DesignColor {
  name: string;
  hex: string;
  role: string;
}

export interface DesignTypography {
  family: string;
  usage: string;
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export interface DesignSystem {
  concept: string;
  colors: DesignColor[];
  typography: DesignTypography[];
  principles: DesignPrinciple[];
}

export interface CaseStudyLink {
  label: string;
  url: string;
  description: string;
}

export interface CaseStudy {
  tagline: string;
  overview: CaseStudyOverview;
  designSystem: DesignSystem;
  techStack: string[];
  deliverables: string[];
  links: CaseStudyLink[];
}

// ─── Categories ───

export type WorkCategory = 'web' | 'app' | 'game' | 'design';

export const categoryLabels: Record<WorkCategory, string> = {
  web: 'Web',
  app: 'App',
  game: 'Game',
  design: 'Design',
};

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
  /** Defaults to 'live' when omitted. */
  status?: ProjectStatus;
  /** Shown alongside the status badge on the detail page (e.g. why a service ended). */
  statusNote?: string;
  caseStudy: CaseStudy;
}

export interface WebProject extends WorkProjectBase {
  type: 'web';
}

export interface DesignProject extends WorkProjectBase {
  type: 'design';
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

export interface GameProject extends WorkProjectBase {
  type: 'game';
  subtitle: string;
  heroDescription: string;
  game: GameContent;
}

export type WorkProject = WebProject | AppProject | GameProject | DesignProject;

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
    caseStudy: {
      tagline: 'A warm digital storefront for a Jeju bakery brand.',
      overview: {
        summary:
          'Ddu Bakehouse needed more than a menu page — it needed a website that feels like walking into the bakery itself. We designed and built a brand-driven web experience that translates the warmth of freshly baked bread into color, typography, and motion.',
        challenge:
          'Local bakeries rarely stand out online. The brand\'s handmade, cozy identity had to survive the transition to a digital medium without feeling generic or template-like.',
        approach:
          'We started from the brand\'s physical identity — warm tones, natural textures, handwritten touches — and built a design system around it. Every section was crafted to showcase products photogenically while keeping load times fast on mobile.',
        scope: ['Brand-driven UI design', 'Responsive web development', 'Product showcase', 'Location & contact experience'],
      },
      designSystem: {
        concept:
          'The visual language borrows directly from the bakery: butter, toast, and cream tones over a warm charcoal base, paired with generous whitespace so product photography stays the hero.',
        colors: [
          { name: 'Butter Amber', hex: '#F59E0B', role: 'Primary accent & CTAs' },
          { name: 'Toasted Brown', hex: '#78350F', role: 'Depth & section contrast' },
          { name: 'Cream', hex: '#FEF3C7', role: 'Highlight surfaces' },
          { name: 'Warm Charcoal', hex: '#1C1917', role: 'Base background & text' },
        ],
        typography: [
          { family: 'Pretendard', usage: 'Korean body text & UI — clean, highly legible on every device' },
          { family: 'Serif Display', usage: 'Headlines — adds an artisanal, handcrafted character' },
        ],
        principles: [
          { title: 'Photography first', description: 'Layouts frame product photos as the main content; UI stays quiet around them.' },
          { title: 'Warmth over polish', description: 'Rounded corners, soft shadows, and warm hues keep the experience approachable.' },
          { title: 'Mobile-first pace', description: 'Most visitors arrive from maps and social links on mobile, so every flow starts there.' },
        ],
      },
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      deliverables: ['UI/UX design', 'Design system', 'Frontend development', 'SEO & deployment'],
      links: [
        { label: 'Live Website', url: 'https://ddubakehouse.com', description: 'Visit the production site' },
      ],
    },
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
    caseStudy: {
      tagline: 'Traditional fortune-telling meets playful modern UX.',
      overview: {
        summary:
          '로또풀이 turns Korean saju fortune-telling into an entertaining lottery-number experience. The product needed to feel fun and lighthearted while handling a genuinely complex domain — traditional four-pillars analysis — under the hood.',
        challenge:
          'Saju terminology is dense and unfamiliar to younger users. Presenting it raw would alienate the audience; oversimplifying it would lose the charm that makes the service unique.',
        approach:
          'We layered the experience: a playful, game-like surface for casual users, with progressively deeper explanations for the curious. Motion and micro-interactions carry the "reveal" moments that make fortune results feel special.',
        scope: ['Service concept & UX flow', 'Interactive result experience', 'Responsive web development', 'Korean IDN domain setup'],
      },
      designSystem: {
        concept:
          'Jade and gold — colors of luck and prosperity in Korean tradition — reinterpreted on a dark modern canvas. The palette signals fortune without falling into old-fashioned clichés.',
        colors: [
          { name: 'Lucky Jade', hex: '#10B981', role: 'Primary accent & result highlights' },
          { name: 'Deep Forest', hex: '#064E3B', role: 'Section backgrounds' },
          { name: 'Coin Gold', hex: '#FBBF24', role: 'Fortune moments & emphasis' },
          { name: 'Night Ink', hex: '#0F172A', role: 'Base background' },
        ],
        typography: [
          { family: 'Pretendard', usage: 'Body & UI text — optimized for Korean readability' },
          { family: 'Rounded Display', usage: 'Numbers & results — friendly, game-like personality' },
        ],
        principles: [
          { title: 'Delight in the reveal', description: 'Fortune results animate in with anticipation — the core emotional beat of the product.' },
          { title: 'Serious engine, playful surface', description: 'Complex saju logic stays invisible; users only feel the fun.' },
          { title: 'One-thumb flows', description: 'Every interaction is reachable and completable with one thumb on mobile.' },
        ],
      },
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      deliverables: ['UX design', 'Interaction design', 'Frontend development', 'Saju analysis integration'],
      links: [
        { label: 'Live Website', url: 'https://로또풀이.kr', description: 'Visit the production site' },
      ],
    },
  },
  {
    type: 'web',
    id: 'econalk',
    title: 'econalk.com',
    url: '#',
    description:
      'An AI-powered news platform that delivered economic insights in multiple languages. The service has ended — this case study is kept as an archive.',
    tags: ['AI', 'News', 'Multi-language'],
    image: '/works/econalk.png',
    fallbackGradient: 'from-blue-900 via-indigo-800 to-purple-900',
    fallbackLabel: 'econalk',
    accentColor: 'rgba(99, 102, 241, 0.4)',
    status: 'discontinued',
    statusNote:
      'Econalk has ended its service and econalk.com is no longer available. Thank you to everyone who read along — this page remains as an archive of the work.',
    caseStudy: {
      tagline: 'AI-generated economic insight, readable in any language.',
      overview: {
        summary:
          'Econalk was an AI-powered news platform that analyzed economic events and delivered insights in multiple languages. The product combined automated content pipelines with an editorial-grade reading experience.',
        challenge:
          'AI-generated content platforms often feel low-trust. Econalk had to look and read like a credible publication while the content pipeline runs fully automated, across languages with very different typographic needs.',
        approach:
          'We designed an editorial layout system — clear hierarchy, disciplined type scale, restrained color — that holds up across languages and scripts. The AI pipeline was shaped to produce structured content that slots cleanly into these layouts.',
        scope: ['Editorial design system', 'Multilingual UX architecture', 'AI content pipeline integration', 'SEO-oriented development'],
      },
      designSystem: {
        concept:
          'A news-desk aesthetic: indigo authority tones on deep navy, with a strict typographic grid. Color is used sparingly so data and headlines carry the hierarchy.',
        colors: [
          { name: 'Insight Indigo', hex: '#6366F1', role: 'Primary accent & links' },
          { name: 'Midnight Navy', hex: '#1E1B4B', role: 'Header & section backgrounds' },
          { name: 'Signal Sky', hex: '#38BDF8', role: 'Data highlights & charts' },
          { name: 'Slate Black', hex: '#0F172A', role: 'Base background' },
        ],
        typography: [
          { family: 'Multiscript Sans', usage: 'Body — consistent rhythm across Korean, Latin, and CJK scripts' },
          { family: 'Condensed Display', usage: 'Headlines — dense, newsroom-style hierarchy' },
        ],
        principles: [
          { title: 'Credibility by design', description: 'Editorial discipline — grids, consistent spacing, restrained color — builds trust in automated content.' },
          { title: 'Language-agnostic layout', description: 'Every component tolerates text expansion and different scripts without breaking.' },
          { title: 'Scannable density', description: 'Readers skim; hierarchy lets them find the one insight they came for in seconds.' },
        ],
      },
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'LLM Pipeline', 'i18n'],
      deliverables: ['Editorial design system', 'Multilingual architecture', 'AI pipeline integration', 'Frontend development'],
      links: [],
    },
  },
  {
    type: 'web',
    id: 'sajulens',
    title: 'sajulens.com',
    url: 'https://sajulens.com',
    description:
      'An AI-powered saju (사주) reading service that interprets the traditional four pillars of destiny through a modern lens. Personalized insights at a glance.',
    tags: ['AI', 'Saju', 'Web'],
    image: '/works/sajulens.png',
    fallbackGradient: 'from-violet-900 via-purple-800 to-fuchsia-900',
    fallbackLabel: 'sajulens',
    accentColor: 'rgba(168, 85, 247, 0.4)',
    caseStudy: {
      tagline: 'The four pillars of destiny, interpreted by AI.',
      overview: {
        summary:
          'SajuLens reinterprets traditional Korean four-pillars analysis through AI, delivering personalized readings in a modern, approachable interface. Depth of tradition, clarity of a modern product.',
        challenge:
          'Saju readings are long-form and interpretive. Turning an AI-generated reading into something that feels personal, trustworthy, and worth reading to the end — rather than a wall of generated text — was the core design problem.',
        approach:
          'Readings are broken into a guided, sectioned journey with visual anchors for each pillar. A mystic-but-modern visual identity keeps the experience atmospheric without becoming kitsch.',
        scope: ['Product & UX design', 'AI reading experience', 'Responsive web development', 'Brand identity'],
      },
      designSystem: {
        concept:
          'Amethyst and violet on a near-black night sky — mysticism rendered with modern gradients and glassmorphism instead of traditional ornament.',
        colors: [
          { name: 'Amethyst', hex: '#A855F7', role: 'Primary accent & highlights' },
          { name: 'Deep Violet', hex: '#4C1D95', role: 'Section depth & gradients' },
          { name: 'Fuchsia Glow', hex: '#E879F9', role: 'Mystic emphasis moments' },
          { name: 'Night Sky', hex: '#0C0518', role: 'Base background' },
        ],
        typography: [
          { family: 'Pretendard', usage: 'Body & readings — sustained readability for long-form text' },
          { family: 'Elegant Serif', usage: 'Pillar titles — a ceremonial, timeless voice' },
        ],
        principles: [
          { title: 'Guided journey', description: 'Long readings become a paced, sectioned experience with a clear sense of progress.' },
          { title: 'Modern mysticism', description: 'Gradients, glass, and glow express the mystical — no clichéd fortune-teller motifs.' },
          { title: 'Personal weight', description: 'Layout and motion treat each reading as a document made for one person.' },
        ],
      },
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'LLM Integration'],
      deliverables: ['Brand identity', 'UX design', 'AI reading pipeline', 'Frontend development'],
      links: [
        { label: 'Live Website', url: 'https://sajulens.com', description: 'Visit the production site' },
      ],
    },
  },
  {
    type: 'web',
    id: 'jejuway',
    title: 'jejuway.com',
    url: 'https://jejuway.com',
    description:
      'A travel companion for exploring Jeju Island. Curated routes, hidden spots, and local recommendations to help you find your own way around Jeju.',
    tags: ['Web', 'Travel', 'Jeju'],
    image: '/works/jejuway.png',
    fallbackGradient: 'from-teal-900 via-cyan-800 to-sky-900',
    fallbackLabel: 'jejuway',
    accentColor: 'rgba(20, 184, 166, 0.4)',
    caseStudy: {
      tagline: 'Find your own way around Jeju Island.',
      overview: {
        summary:
          'JejuWay is a travel companion for exploring Jeju Island — curated routes, hidden spots, and local recommendations, organized so travelers can build their own way instead of following a fixed itinerary.',
        challenge:
          'Travel content is abundant but fragmented. The product had to organize scattered local knowledge into browsable, trustworthy curation — and feel like Jeju, not like a generic travel aggregator.',
        approach:
          'We built the information architecture around routes and moments rather than listings. The visual identity draws from Jeju itself: ocean teals, basalt darks, and photography-forward layouts.',
        scope: ['Information architecture', 'Curation UX design', 'Responsive web development', 'Local content strategy'],
      },
      designSystem: {
        concept:
          'Jeju\'s landscape as a palette — ocean teal, deep basalt, and cyan sky — with airy, photography-led layouts that let the island sell itself.',
        colors: [
          { name: 'Jeju Teal', hex: '#14B8A6', role: 'Primary accent & navigation' },
          { name: 'Ocean Cyan', hex: '#06B6D4', role: 'Interactive highlights' },
          { name: 'Basalt', hex: '#134E4A', role: 'Depth & card surfaces' },
          { name: 'Deep Sea', hex: '#042F2E', role: 'Base background' },
        ],
        typography: [
          { family: 'Pretendard', usage: 'UI & descriptions — clarity for on-the-go reading' },
          { family: 'Humanist Display', usage: 'Place names & headers — a warm, guidebook voice' },
        ],
        principles: [
          { title: 'Place before interface', description: 'Photography and place identity lead every screen; chrome stays minimal.' },
          { title: 'Routes, not lists', description: 'Content is structured as journeys — how spots connect matters as much as the spots.' },
          { title: 'Trust through locality', description: 'Local voice and specific detail differentiate curation from aggregation.' },
        ],
      },
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Map Integration'],
      deliverables: ['Information architecture', 'UI/UX design', 'Frontend development', 'Content structure'],
      links: [
        { label: 'Live Website', url: 'https://jejuway.com', description: 'Visit the production site' },
      ],
    },
  },
  {
    type: 'app',
    id: 'memoire',
    title: 'Memoire',
    url: 'https://apps.apple.com/kr/app/memoire-%EB%82%98%EB%A7%8C%EC%9D%98-%EA%B0%90%EC%84%B1-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC/id6759441421',
    description:
      'A visual diary for daily moments. Capture beautiful memories with photos, organize with calendar view, and create magazine-style PDF books.',
    tags: ['App', 'iOS', 'Android'],
    image: '/works/memoire.png',
    fallbackGradient: 'from-rose-900 via-pink-800 to-fuchsia-900',
    fallbackLabel: 'Memoire',
    accentColor: 'rgba(244, 63, 94, 0.4)',
    subtitle: 'A visual diary for daily moments.',
    heroDescription:
      'Memoire is an Instagram-style visual diary app that lets you record daily memories with photos and text. Browse entries on an infinite-scroll calendar, generate magazine-style PDF books, customize themes, and sync seamlessly across devices via iCloud or Google Drive — all with a local-first, privacy-focused architecture.',
    caseStudy: {
      tagline: 'A visual diary that turns daily moments into keepsakes.',
      overview: {
        summary:
          'Memoire is a cross-platform visual diary app for iOS and Android. Users capture daily moments with photos and text, browse them on an infinite-scroll calendar, and export magazine-style PDF books — with a local-first architecture that keeps personal data on the user\'s own device and cloud.',
        challenge:
          'Diary apps live or die on daily retention and trust. The app had to make journaling feel effortless and rewarding every day, while guaranteeing privacy — no personal content on our servers — without sacrificing multi-device sync.',
        approach:
          'A local-first architecture with per-platform cloud sync (iCloud / Google Drive) solved the trust problem structurally. On the experience side, we invested in the emotional payoff: beautiful entry layouts, theme customization, and the PDF book as a tangible reward for consistent journaling.',
        scope: ['Product design', 'iOS & Android development', 'Local-first sync architecture', 'PDF generation engine', '16-language localization'],
      },
      designSystem: {
        concept:
          'Soft rose and blush tones create an intimate, personal atmosphere — a diary should feel like a private space, not a social feed. Five built-in themes let each user make it their own.',
        colors: [
          { name: 'Memoire Rose', hex: '#F43F5E', role: 'Primary accent & actions' },
          { name: 'Blush', hex: '#FDA4AF', role: 'Soft highlights & moods' },
          { name: 'Deep Plum', hex: '#831843', role: 'Depth & dark theme accents' },
          { name: 'Paper', hex: '#FFF1F2', role: 'Light surfaces & book pages' },
        ],
        typography: [
          { family: 'System Sans (SF Pro / Roboto)', usage: 'UI — native feel on each platform' },
          { family: 'Serif Book', usage: 'PDF book exports — a printed-keepsake character' },
        ],
        principles: [
          { title: 'Effortless capture', description: 'A new entry — photo, mood, weather, text — takes under a minute, every day.' },
          { title: 'Privacy as architecture', description: 'Local-first storage and user-owned cloud sync make privacy structural, not a policy promise.' },
          { title: 'Memories as artifacts', description: 'Calendar browsing and PDF books turn scattered entries into something worth keeping.' },
        ],
      },
      techStack: ['Flutter', 'Dart', 'Riverpod', 'Drift (SQLite)', 'Firebase', 'iCloud', 'Google Drive', 'PDF Generation'],
      deliverables: ['Product design', 'Cross-platform app development', 'Sync architecture', 'App Store launch', 'Localization (16 languages)'],
      links: [
        { label: 'App Store', url: 'https://apps.apple.com/kr/app/memoire-%EB%82%98%EB%A7%8C%EC%9D%98-%EA%B0%90%EC%84%B1-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC/id6759441421', description: 'Download for iOS' },
      ],
    },
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
      ctaUrl: 'https://apps.apple.com/kr/app/memoire-%EB%82%98%EB%A7%8C%EC%9D%98-%EA%B0%90%EC%84%B1-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC/id6759441421',
    },
    privacy: {
      effectiveDate: '2026-03-04',
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
  {
    type: 'game',
    id: 'bbang-eonjeon',
    title: '빵어전',
    url: '#',
    description:
      'A pixel-art bread defense game built and operated by EternaxCode. Rally an army of bread to hold the bakery against waves of mold and crumb-hungry pests.',
    tags: ['Game', 'Pixel Art', 'Defense'],
    image: '/works/bbang-eonjeon.png',
    fallbackGradient: 'from-amber-900 via-orange-900 to-stone-900',
    fallbackLabel: '빵어전',
    accentColor: 'rgba(246, 199, 67, 0.4)',
    status: 'in-development',
    statusNote:
      'In development — designed, built, and operated in-house by EternaxCode. Release channels will be announced here first.',
    subtitle: '빵집을 지켜라! Rally your bread and hold the bakery until dawn.',
    heroDescription:
      '빵어전 (Bbang-eonjeon) is a pun on 방어전, "defense battle", with 빵 — bread. It is EternaxCode\'s first original game: a pixel-art defense game where toast knights, baguette lancers, and melon-bread guardians hold the line against mold and ants. We design it, build it, and run it as a live service ourselves.',
    caseStudy: {
      tagline: 'Bread vs. mold. A pixel-art defense game we build and operate ourselves.',
      overview: {
        summary:
          '빵어전 is EternaxCode\'s first original game and the first product we operate as a live service end-to-end. Players place bread units along the path to the bakery and survive escalating waves of mold, ants, and other crumb-hungry pests. Every part — game design, pixel art, client, backend, and live operations — is built in-house.',
        challenge:
          'A defense game lives on its balance and pacing: too easy is boring, too hard is frustrating, and every new unit or enemy shifts the curve. Operating a game also means shipping updates continuously without breaking what players already love.',
        approach:
          'We treat the game like a product with a live roadmap. Waves, units, and the economy are data-driven so balance patches ship without a client update, telemetry feeds every tuning decision, and the pixel-art style keeps production fast enough to iterate weekly.',
        scope: ['Game design & balancing', 'Pixel art & animation', 'Game client development', 'Backend & telemetry', 'Live operations'],
      },
      designSystem: {
        concept:
          'Warm bakery colors on a midnight-blue night: crust orange and butter yellow for everything friendly, mold purple and jam red for everything hostile. Chunky 4px borders, hard shadows, and no rounded corners — the UI is part of the pixel world, not a layer floating above it.',
        colors: [
          { name: 'Crust Orange', hex: '#D4813F', role: 'Bread units & primary accents' },
          { name: 'Butter Yellow', hex: '#F6C743', role: 'Buttons, coins & highlights' },
          { name: 'Mold Purple', hex: '#8B5CF6', role: 'Enemies & danger states' },
          { name: 'Midnight Blue', hex: '#0D0B1E', role: 'Night sky & base background' },
        ],
        typography: [
          { family: 'Galmuri', usage: 'Korean & body text — an open-source Korean bitmap font that stays crisp at every scale' },
          { family: 'Press Start 2P', usage: 'HUD, labels & headings — the classic arcade voice' },
        ],
        principles: [
          { title: 'Readable at a glance', description: 'Every unit and enemy has one unmistakable silhouette and color, so even a crowded wave stays readable.' },
          { title: 'Juicy, not noisy', description: 'Stepped animations, hit flashes, and screen shake give weight to every action without visual clutter.' },
          { title: 'One thumb, one break', description: 'Placing and upgrading units works with a single thumb, and a full run fits into a coffee break.' },
        ],
      },
      techStack: ['TypeScript', 'HTML5 Canvas', 'Pixel Art', 'Node.js', 'PostgreSQL', 'Cloud Hosting'],
      deliverables: ['Game design', 'Pixel art & animation', 'Client & backend development', 'Live operations & analytics'],
      links: [],
    },
    game: {
      genre: 'Pixel-art defense',
      platforms: ['Web (browser)', 'Mobile (planned)'],
      players: 'Single player',
      buildLabel: 'DEV BUILD',
      pitch:
        'The mold is at the gates! Grab your toast, hold the line, and keep the ovens warm until dawn.',
      features: [
        {
          sprite: 'bakery',
          title: 'Defend the Bakery',
          description: 'Waves of pests march down the path toward the ovens. Place bread units, hold every lane, and survive until dawn.',
        },
        {
          sprite: 'toastKnight',
          title: 'A Bread Army',
          description: 'Toast knights, baguette lancers, melon-bread guardians — each unit has a distinct role, upgrade path, and personality.',
        },
        {
          sprite: 'moldBlob',
          title: 'Escalating Waves',
          description: 'Mold blobs, crumb ants, and bosses arrive in hand-tuned waves that get smarter, not just bigger.',
        },
        {
          sprite: 'coin',
          title: 'Bake to Earn',
          description: 'Sell bread between waves to earn coins, then spend them on new units, upgrades, and oven improvements.',
        },
        {
          sprite: 'heart',
          title: 'Short, Replayable Runs',
          description: 'A run fits into a coffee break. Daily challenges and leaderboards give you a reason to come back tomorrow.',
        },
        {
          sprite: 'baker',
          title: 'Live-operated',
          description: 'New units, seasonal events, and balance patches ship continuously — the game is operated, not just released.',
        },
      ],
      units: [
        {
          name: '식빵 기사',
          nameEn: 'Toast Knight',
          role: 'Frontline',
          description: 'Reliable, cheap, and crunchy. Holds the lane while the rest of the bakery gets to work.',
          sprite: 'toastKnight',
          stats: { atk: 3, def: 3, spd: 3 },
        },
        {
          name: '바게트 창병',
          nameEn: 'Baguette Lancer',
          role: 'Reach',
          description: 'Long reach, high damage. Pierces through a whole line of mold in a single thrust.',
          sprite: 'baguetteLancer',
          stats: { atk: 4, def: 2, spd: 4 },
        },
        {
          name: '멜론빵 수호자',
          nameEn: 'Melon Bread Guardian',
          role: 'Tank',
          description: 'A thick, sugary crust soaks up hits. Slow, but nothing gets past it.',
          sprite: 'melonGuardian',
          stats: { atk: 2, def: 5, spd: 1 },
        },
      ],
      enemies: [
        {
          name: '곰팡이',
          nameEn: 'Mold Blob',
          role: 'Swarm',
          description: 'Spreads if ignored and splits into smaller blobs when hit — clear it fast.',
          sprite: 'moldBlob',
          stats: { atk: 2, def: 2, spd: 2 },
        },
        {
          name: '부스러기 개미',
          nameEn: 'Crumb Ant',
          role: 'Rusher',
          description: 'Tiny, fast, and never alone. Steals crumbs straight from your coin pile.',
          sprite: 'crumbAnt',
          stats: { atk: 1, def: 1, spd: 5 },
        },
      ],
      operations: [
        {
          title: 'Balance patches',
          description: 'Wave, unit, and economy data live on the server, so tuning ships without a client update.',
        },
        {
          title: 'Seasonal events',
          description: 'Limited-time waves, units, and bakery decorations keep every season fresh.',
        },
        {
          title: 'Telemetry-driven tuning',
          description: 'Per-wave win rates and unit pick rates inform every change we make.',
        },
        {
          title: 'Player support',
          description: 'Bug reports and feedback go straight to the team that builds the game.',
        },
      ],
      roadmap: [
        { phase: 'STAGE 1', title: 'Concept & design', description: 'Core loop, world, and the first three bread units.', done: true },
        { phase: 'STAGE 2', title: 'Playable prototype', description: 'Pixel-art pass, HUD, economy, and the first boss wave.', done: false },
        { phase: 'STAGE 3', title: 'Closed beta', description: 'Invite-only testing, telemetry, and balance tuning.', done: false },
        { phase: 'STAGE 4', title: 'Web launch', description: 'Public release in the browser with daily challenges.', done: false },
        { phase: 'STAGE 5', title: 'Mobile & live seasons', description: 'Mobile builds and the first seasonal event.', done: false },
      ],
    },
  },
];

// ─── Helpers ───

export function getProjectById(id: string): WorkProject | undefined {
  return worksData.find((p) => p.id === id);
}

export function getAppProjects(): AppProject[] {
  return worksData.filter((p): p is AppProject => p.type === 'app');
}

export function getAppProjectById(id: string): AppProject | undefined {
  return getAppProjects().find((p) => p.id === id);
}

export function getGameProjects(): GameProject[] {
  return worksData.filter((p): p is GameProject => p.type === 'game');
}

export function getProjectStatus(project: WorkProject): ProjectStatus {
  return project.status ?? 'live';
}

export function getCategories(): WorkCategory[] {
  const present = new Set(worksData.map((p) => p.type));
  return (['web', 'app', 'game', 'design'] as WorkCategory[]).filter((c) => present.has(c));
}
