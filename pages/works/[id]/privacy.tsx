import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import { getAppProjects, getAppProjectById } from '@/lib/worksData';
import type { AppProject } from '@/lib/worksData';

interface Props {
  project: AppProject;
}

export default function WorkPrivacy({ project }: Props) {
  const { privacy } = project;

  return (
    <>
      <Head>
        <title>{`Privacy Policy - ${project.title}`}</title>
        <meta name="description" content={`Privacy Policy for ${project.title}`} />
      </Head>

      <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-8 pt-24 text-white">
        <div className="w-full max-w-3xl">
          <Link
            href={`/works/${project.id}/support`}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Support
          </Link>

          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-2">
                Privacy Policy
              </h1>
              <p className="text-sm text-white/50">
                Effective date: {privacy.effectiveDate}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-base text-white/70 leading-relaxed">
                {privacy.introduction}
              </p>
            </StaggerItem>

            {privacy.sections.map((section) => (
              <StaggerItem key={section.title}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <h2 className="text-lg font-semibold text-white/90 mb-3">
                    {section.title}
                  </h2>
                  <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
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
