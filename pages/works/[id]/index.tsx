import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, ReactNode } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FileText,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  Layers,
  Palette,
  Type,
  Compass,
} from 'lucide-react';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import GameDetail from '@/components/GameDetail';
import {
  worksData,
  getProjectById,
  getProjectStatus,
  categoryLabels,
  statusLabels,
} from '@/lib/worksData';
import type { WorkProject } from '@/lib/worksData';

const statusBadgeClass = {
  live: '',
  'in-development': 'bg-amber-400/20 border-amber-300/40 text-amber-100',
  discontinued: 'bg-red-500/20 border-red-300/40 text-red-100',
} as const;

interface Props {
  project: WorkProject;
}

const appResources = [
  { key: 'spec', label: 'Specification', desc: 'Features & tech stack', icon: FileText },
  { key: 'support', label: 'Support', desc: 'FAQ & contact', icon: LifeBuoy },
  { key: 'marketing', label: 'Marketing', desc: 'Highlights & download', icon: Megaphone },
] as const;

function Section({
  index,
  title,
  icon: Icon,
  children,
}: {
  index: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}) {
  return (
    <section>
      <StaggerItem>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-white/40 tracking-widest">{index}</span>
          <span className="h-px flex-1 max-w-12 bg-white/20" aria-hidden />
          <Icon size={18} className="text-white/50" />
          <h2 className="text-xl sm:text-2xl font-bold text-white/90 tracking-tight">{title}</h2>
        </div>
      </StaggerItem>
      {children}
    </section>
  );
}

export default function WorkCaseStudy({ project }: Props) {
  const { caseStudy } = project;
  const [imgError, setImgError] = useState(false);
  const showImage = project.image && !imgError;
  const status = getProjectStatus(project);
  const isDiscontinued = status === 'discontinued';

  // Games get their own pixel-art layout.
  if (project.type === 'game') {
    return <GameDetail project={project} />;
  }

  return (
    <>
      <Head>
        <title>{`${project.title} - Case Study - EternaxCode`}</title>
        <meta name="description" content={caseStudy.overview.summary} />
        <meta property="og:title" content={`${project.title} - EternaxCode`} />
        <meta property="og:description" content={caseStudy.tagline} />
        {project.image && <meta property="og:image" content={project.image} />}
      </Head>

      <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-8 pt-24 pb-20 text-white">
        <div className="w-full max-w-4xl">
          <StaggerContainer className="space-y-14 sm:space-y-16">
            {/* ── Hero ── */}
            <header>
              <StaggerItem>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors mb-8"
                >
                  <ArrowLeft size={16} />
                  Back to Works
                </Link>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90">
                    {categoryLabels[project.type]}
                  </span>
                  {status !== 'live' && (
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${statusBadgeClass[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                  )}
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent tracking-tight">
                  {project.title}
                </h1>
                <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-6">
                  {caseStudy.tagline}
                </p>
                {project.url !== '#' && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/90 hover:bg-white/20 transition-all duration-200"
                  >
                    {project.type === 'app' ? 'Download' : 'Visit Live Site'}
                    <ExternalLink size={15} />
                  </a>
                )}
              </StaggerItem>

              {project.statusNote && (
                <StaggerItem className="mt-8">
                  <div
                    role="note"
                    className={`flex items-start gap-4 rounded-2xl border p-5 sm:p-6 ${
                      isDiscontinued
                        ? 'bg-red-500/10 border-red-300/25'
                        : 'bg-amber-400/10 border-amber-300/25'
                    }`}
                  >
                    <Archive
                      size={20}
                      className={`shrink-0 mt-0.5 ${isDiscontinued ? 'text-red-200' : 'text-amber-200'}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white/90 mb-1">
                        {isDiscontinued ? 'This service has ended' : statusLabels[status]}
                      </p>
                      <p className="text-sm text-white/65 leading-relaxed">{project.statusNote}</p>
                    </div>
                  </div>
                </StaggerItem>
              )}

              {showImage && (
                <StaggerItem className="mt-10">
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10"
                    style={{ boxShadow: `0 20px 80px -20px ${project.accentColor}` }}
                  >
                    <Image
                      src={project.image!}
                      alt={project.title}
                      fill
                      className={`object-cover ${isDiscontinued ? 'grayscale opacity-60' : ''}`}
                      unoptimized
                      onError={() => setImgError(true)}
                    />
                    {isDiscontinued && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rotate-[-8deg] rounded-md border-4 border-red-300/70 px-6 py-2 text-2xl sm:text-4xl font-black uppercase tracking-[0.3em] text-red-200/80 bg-black/30 backdrop-blur-sm">
                          Service Ended
                        </span>
                      </div>
                    )}
                  </div>
                </StaggerItem>
              )}
            </header>

            {/* ── 01 Overview ── */}
            <Section index="01" title="Overview" icon={Compass}>
              <div className="space-y-6">
                <StaggerItem>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                      {caseStudy.overview.summary}
                    </p>
                  </div>
                </StaggerItem>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StaggerItem>
                    <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                        Challenge
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {caseStudy.overview.challenge}
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                        Approach
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {caseStudy.overview.approach}
                      </p>
                    </div>
                  </StaggerItem>
                </div>

                <StaggerItem>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                    Scope of Work
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.overview.scope.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </StaggerItem>
              </div>
            </Section>

            {/* ── 02 Design System ── */}
            <Section index="02" title="Design System" icon={Palette}>
              <div className="space-y-8">
                <StaggerItem>
                  <p className="text-base text-white/70 leading-relaxed max-w-2xl">
                    {caseStudy.designSystem.concept}
                  </p>
                </StaggerItem>

                {/* Color palette */}
                <StaggerItem>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                    Color Palette
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {caseStudy.designSystem.colors.map((color) => (
                      <div
                        key={color.name}
                        className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                      >
                        <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
                        <div className="p-4">
                          <p className="text-sm font-semibold text-white/90">{color.name}</p>
                          <p className="font-mono text-xs text-white/50 mt-0.5">{color.hex}</p>
                          <p className="text-xs text-white/50 mt-2 leading-relaxed">{color.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                {/* Typography */}
                <StaggerItem>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                    Typography
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudy.designSystem.typography.map((type) => (
                      <div
                        key={type.family}
                        className="rounded-2xl bg-white/5 border border-white/10 p-6 flex items-start gap-4"
                      >
                        <Type size={20} className="text-white/40 mt-1 shrink-0" />
                        <div>
                          <p className="text-base font-semibold text-white/90">{type.family}</p>
                          <p className="text-sm text-white/60 mt-1 leading-relaxed">{type.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                {/* Design principles */}
                <StaggerItem>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                    Design Principles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {caseStudy.designSystem.principles.map((principle, i) => (
                      <div
                        key={principle.title}
                        className="rounded-2xl bg-white/5 border border-white/10 p-6"
                      >
                        <span className="font-mono text-xs text-white/30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-sm font-semibold text-white/90 mt-2 mb-2">
                          {principle.title}
                        </h4>
                        <p className="text-xs text-white/55 leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </StaggerItem>
              </div>
            </Section>

            {/* ── 03 Stack & Deliverables ── */}
            <Section index="03" title="Stack & Deliverables" icon={Layers}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StaggerItem>
                  <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                      Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {caseStudy.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: project.accentColor.replace('0.4', '0.9') }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              </div>
            </Section>

            {/* ── 04 Links ── */}
            <Section index="04" title="Links" icon={ArrowUpRight}>
              {caseStudy.links.length === 0 && (
                <StaggerItem>
                  <div className="rounded-2xl bg-white/5 border border-dashed border-white/15 p-6 text-sm text-white/50 leading-relaxed">
                    {isDiscontinued
                      ? 'This service is no longer online, so there are no active links. The case study above is kept as an archive.'
                      : 'Links will be added once the project is publicly available.'}
                  </div>
                </StaggerItem>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.links.map((link) => (
                  <StaggerItem key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <div>
                        <p className="text-base font-semibold text-white/90">{link.label}</p>
                        <p className="text-sm text-white/50 mt-0.5">{link.description}</p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-white/40 group-hover:text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      />
                    </a>
                  </StaggerItem>
                ))}
              </div>

              {/* App-only resource pages */}
              {project.type === 'app' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {appResources.map((card) => {
                    const Icon = card.icon;
                    return (
                      <StaggerItem key={card.key}>
                        <Link
                          href={`/works/${project.id}/${card.key}`}
                          className="group block h-full rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        >
                          <Icon
                            size={22}
                            className="text-white/60 group-hover:text-white/90 mb-3 transition-colors"
                          />
                          <h3 className="text-sm font-semibold text-white/90 mb-1">{card.label}</h3>
                          <p className="text-xs text-white/50">{card.desc}</p>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </div>
              )}
            </Section>

            {/* ── CTA ── */}
            <StaggerItem>
              <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-8 sm:p-10 text-center">
                <MessageCircle size={24} className="text-white/60 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-white/90 mb-2">
                  Have a project in mind?
                </h2>
                <p className="text-sm sm:text-base text-white/60 mb-6 max-w-md mx-auto leading-relaxed">
                  From web platforms to mobile apps and brand design — we can build it together.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 border border-white/25 text-sm font-semibold text-white hover:bg-white/25 transition-all duration-200"
                >
                  Start a Conversation
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = worksData.map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = getProjectById(params!.id as string);
  if (!project) return { notFound: true };
  return { props: { project } };
};
