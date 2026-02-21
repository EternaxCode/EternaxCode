import Head from 'next/head';
import Link from 'next/link';
import { ExternalLink, FileText, LifeBuoy, Megaphone } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkDetailLayout from '@/components/WorkDetailLayout';
import { getAppProjects, getAppProjectById } from '@/lib/worksData';
import type { AppProject } from '@/lib/worksData';

interface Props {
  project: AppProject;
}

const navCards = [
  { key: 'spec', label: 'Specification', desc: 'Features & tech stack', icon: FileText },
  { key: 'support', label: 'Support', desc: 'FAQ & contact', icon: LifeBuoy },
  { key: 'marketing', label: 'Marketing', desc: 'Highlights & download', icon: Megaphone },
] as const;

export default function WorkOverview({ project }: Props) {
  return (
    <>
      <Head>
        <title>{`${project.title} - EternaxCode`}</title>
        <meta name="description" content={project.description} />
      </Head>

      <WorkDetailLayout project={project} currentTab="overview">
        <StaggerContainer className="space-y-8">
          {/* Hero description */}
          <StaggerItem>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                {project.heroDescription}
              </p>
            </div>
          </StaggerItem>

          {/* Nav cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {navCards.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.key}>
                  <Link
                    href={`/works/${project.id}/${card.key}`}
                    className="group block rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <Icon size={24} className="text-white/60 group-hover:text-white/90 mb-3 transition-colors" />
                    <h3 className="text-base font-semibold text-white/90 mb-1">{card.label}</h3>
                    <p className="text-sm text-white/50">{card.desc}</p>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>

          {/* External link */}
          {project.url !== '#' && (
            <StaggerItem>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/90 hover:bg-white/20 transition-all duration-200"
              >
                Visit {project.title}
                <ExternalLink size={16} />
              </a>
            </StaggerItem>
          )}
        </StaggerContainer>
      </WorkDetailLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAppProjects().map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = getAppProjectById(params!.id as string);
  if (!project) return { notFound: true };
  return { props: { project } };
};
