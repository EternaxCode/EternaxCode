'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  Globe,
  Mail,
  MessageCircle,
  Package,
  Sparkles,
} from 'lucide-react';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import { worksData, getProjectStatus, statusLabels, categoryLabels } from '@/lib/worksData';
import type { WorkProject } from '@/lib/worksData';

const SITE_URL = 'https://eternaxcode.com';
const CONTACT_EMAIL = 'eternaxcode@gmail.com';

/** Display order for the bio page; anything not listed follows in data order. */
const ORDER = ['bbang-eonjeon', 'memoire', 'sajulens', 'lottopuri', 'jejuway', 'ddubakehouse'];

function orderedProjects(): WorkProject[] {
  const rank = (p: WorkProject) => {
    const i = ORDER.indexOf(p.id);
    return i === -1 ? ORDER.length : i;
  };
  return worksData
    .filter((p) => getProjectStatus(p) !== 'discontinued')
    .sort((a, b) => rank(a) - rank(b));
}

function ctaLabel(project: WorkProject): string {
  if (project.type === 'game') return 'Play now';
  if (project.type === 'app') return 'Download';
  return 'Visit site';
}

/** External product URL when one exists, otherwise the case study on this site. */
function primaryHref(project: WorkProject): { href: string; external: boolean } {
  if (project.url && project.url !== '#') return { href: project.url, external: true };
  return { href: `/works/${project.id}`, external: false };
}

const statusDot: Record<string, string> = {
  live: 'bg-emerald-400',
  'in-development': 'bg-amber-400',
  discontinued: 'bg-red-400',
};

function ProductRow({ project }: { project: WorkProject }) {
  const { href, external } = primaryHref(project);
  const status = getProjectStatus(project);
  const inner = (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md p-3 pr-4 transition-colors hover:bg-white/10 hover:border-white/20"
      style={{ boxShadow: `0 12px 40px -24px ${project.accentColor}` }}
    >
      <div className="relative h-[72px] w-[104px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.fallbackGradient}`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-base font-semibold text-white">{project.title}</h3>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-white/45">
            {categoryLabels[project.type]}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-white/60">{project.description}</p>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] font-medium text-white/70">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
          {statusLabels[status]}
          <span className="text-white/30">·</span>
          <span className="text-white/60 group-hover:text-white">{ctaLabel(project)}</span>
        </div>
      </div>
      <ChevronRight size={18} className="shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/80" />
    </motion.div>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <Link href={href} className="block">
      {inner}
    </Link>
  );
}

function FeaturedCard({ project }: { project: WorkProject }) {
  const { href, external } = primaryHref(project);
  const status = getProjectStatus(project);
  const stores = project.type === 'game' ? project.game.stores ?? [] : [];

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="overflow-hidden rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md"
      style={{ boxShadow: `0 30px 80px -30px ${project.accentColor}` }}
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="relative block aspect-video w-full overflow-hidden bg-black/40"
      >
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized priority />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.fallbackGradient}`} />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm border border-white/20">
          <Sparkles size={11} className="text-amber-300" />
          Featured
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm border border-white/20">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]}`} />
          {statusLabels[status]}
        </span>
      </a>

      <div className="p-5">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">
          {categoryLabels[project.type]}
          {project.type === 'game' && ` · ${project.game.platforms.join(' · ')}`}
        </div>
        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</p>

        <div className="mt-4 flex flex-col gap-2">
          {stores.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {stores.map((store) => (
                <a
                  key={store.url}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  {store.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          ) : (
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              {ctaLabel(project)}
              <ArrowUpRight size={15} />
            </a>
          )}
          <div className="grid grid-cols-2 gap-2">
            {external && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
              >
                <Globe size={14} />
                {project.type === 'game' ? 'Official site' : 'Website'}
              </a>
            )}
            <Link
              href={`/works/${project.id}`}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 ${
                external ? '' : 'col-span-2'
              }`}
            >
              Story
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const moreLinks = [
  { label: 'eternaxcode.com', desc: 'Studio website', href: SITE_URL, icon: Globe, external: true },
  { label: 'All case studies', desc: 'How each product was made', href: '/works', icon: Package, external: false },
  { label: 'Contact us', desc: 'Projects, partnerships, press', href: '/contact', icon: MessageCircle, external: false },
  { label: CONTACT_EMAIL, desc: 'Email the team', href: `mailto:${CONTACT_EMAIL}`, icon: Mail, external: true },
];

export default function LinksPage() {
  const projects = orderedProjects();
  const [featured, ...rest] = projects;
  const title = 'EternaxCode — Products & Links';
  const description =
    'Games, apps, and web services designed, built, and operated by EternaxCode. Play 빵어전, download Memoire, and explore our work.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/links`} />
        <meta property="og:image" content={`${SITE_URL}/og-links.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/og-links.png`} />
      </Head>

      {/* Dark scrim over the starfield so text stays legible in the Instagram in-app browser */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/75 via-black/55 to-black/85"
        aria-hidden
      />

      <div className="relative min-h-screen w-full flex justify-center px-4 pt-10 pb-16 sm:pt-16 text-white">
        <StaggerContainer className="w-full max-w-md space-y-8">
          {/* ── Profile ── */}
          <StaggerItem className="text-center">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_60px_-10px_rgba(147,197,253,0.6)]">
              <Image
                src="/assets/ico-about.svg"
                alt="EternaxCode"
                width={316}
                height={394}
                className="h-9 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">EternaxCode</h1>
            <p className="mt-1 text-sm font-medium bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Alive Code, Infinite Evolution
            </p>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              We design, build, and operate our own products — games, apps, and web services.
            </p>
          </StaggerItem>

          {/* ── Featured ── */}
          {featured && (
            <StaggerItem>
              <FeaturedCard project={featured} />
            </StaggerItem>
          )}

          {/* ── Products ── */}
          <div className="space-y-3">
            <StaggerItem>
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Our products</h2>
                <span className="text-[11px] text-white/35">{projects.length} live</span>
              </div>
            </StaggerItem>
            {rest.map((project) => (
              <StaggerItem key={project.id}>
                <ProductRow project={project} />
              </StaggerItem>
            ))}
          </div>

          {/* ── More ── */}
          <div className="space-y-3">
            <StaggerItem>
              <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">More</h2>
            </StaggerItem>
            {moreLinks.map((item) => {
              const Icon = item.icon;
              const body = (
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md px-4 py-3.5 transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/80">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">{item.label}</span>
                    <span className="block text-xs text-white/50">{item.desc}</span>
                  </span>
                  {item.external ? (
                    <ArrowUpRight size={16} className="shrink-0 text-white/40 group-hover:text-white/80" />
                  ) : (
                    <ChevronRight size={16} className="shrink-0 text-white/40 group-hover:text-white/80" />
                  )}
                </motion.div>
              );
              return (
                <StaggerItem key={item.href}>
                  {item.external ? (
                    <a href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="block">
                      {body}
                    </a>
                  ) : (
                    <Link href={item.href} className="block">
                      {body}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </div>

          <StaggerItem className="pt-2 text-center text-[11px] text-white/35">
            © EternaxCode Inc. All rights reserved.
          </StaggerItem>
        </StaggerContainer>
      </div>
    </>
  );
}
