import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GetStaticPaths, GetStaticProps } from 'next';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkDetailLayout from '@/components/WorkDetailLayout';
import { getAppProjects, getAppProjectById } from '@/lib/worksData';
import type { AppProject } from '@/lib/worksData';

interface Props {
  project: AppProject;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer bg-transparent border-none outline-none"
      >
        <span className="text-sm font-medium text-white/90 pr-4">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-white/50" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkSupport({ project }: Props) {
  const { support } = project;

  return (
    <>
      <Head>
        <title>{`Support - ${project.title} - EternaxCode`}</title>
        <meta name="description" content={support.headline} />
      </Head>

      <WorkDetailLayout project={project} currentTab="support">
        <StaggerContainer className="space-y-10">
          {/* Headline */}
          <StaggerItem>
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90 mb-4">
              {support.headline}
            </h2>
            <p className="text-base text-white/70 leading-relaxed max-w-2xl">
              {support.description}
            </p>
          </StaggerItem>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {support.faqs.map((faq) => (
              <StaggerItem key={faq.question}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </StaggerItem>
            ))}
          </div>

          {/* Contact & Privacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StaggerItem>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center gap-4 h-full">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Still need help?</p>
                  <a
                    href={`mailto:${support.contactEmail}`}
                    className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {support.contactEmail}
                  </a>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <Link
                href={`/works/${project.id}/privacy`}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center gap-4 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-200 block"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-white/70" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-1">Legal</p>
                  <span className="text-sm font-medium text-white/90">Privacy Policy</span>
                </div>
              </Link>
            </StaggerItem>
          </div>
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
