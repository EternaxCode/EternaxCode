import Head from 'next/head';
import { ExternalLink } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkDetailLayout from '@/components/WorkDetailLayout';
import { getAppProjects, getAppProjectById } from '@/lib/worksData';
import type { AppProject } from '@/lib/worksData';

interface Props {
  project: AppProject;
}

export default function WorkMarketing({ project }: Props) {
  const { marketing } = project;

  return (
    <>
      <Head>
        <title>{`Marketing - ${project.title} - EternaxCode`}</title>
        <meta name="description" content={marketing.headline} />
      </Head>

      <WorkDetailLayout project={project} currentTab="marketing">
        <StaggerContainer className="space-y-10">
          {/* Hero headline */}
          <StaggerItem>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
              {marketing.headline}
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl">
              {marketing.subheadline}
            </p>
          </StaggerItem>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {marketing.highlights.map((h) => (
              <StaggerItem key={h.label}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white/90 mb-1">
                    {h.metric}
                  </p>
                  <p className="text-xs text-white/50">{h.label}</p>
                </div>
              </StaggerItem>
            ))}
          </div>

          {/* CTA */}
          <StaggerItem>
            <a
              href={marketing.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-sm font-semibold text-white hover:from-pink-400 hover:to-fuchsia-400 transition-all duration-200 shadow-lg shadow-pink-500/20"
            >
              {marketing.ctaText}
              <ExternalLink size={16} />
            </a>
          </StaggerItem>
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
