import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkDetailLayout from '@/components/WorkDetailLayout';
import { getAppProjects, getAppProjectById } from '@/lib/worksData';
import type { AppProject } from '@/lib/worksData';

interface Props {
  project: AppProject;
}

export default function WorkSpec({ project }: Props) {
  const { spec } = project;

  return (
    <>
      <Head>
        <title>{`Specification - ${project.title} - EternaxCode`}</title>
        <meta name="description" content={spec.headline} />
      </Head>

      <WorkDetailLayout project={project} currentTab="spec">
        <StaggerContainer className="space-y-10">
          {/* Headline & introduction */}
          <StaggerItem>
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4">
              {spec.headline}
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-2xl">
              {spec.introduction}
            </p>
          </StaggerItem>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spec.features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <span className="text-2xl mb-3 block">{feature.icon}</span>
                  <h3 className="text-base font-semibold text-white/90 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>

          {/* Tech stack */}
          <StaggerItem>
            <h3 className="text-lg font-semibold text-white/90 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {spec.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
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
