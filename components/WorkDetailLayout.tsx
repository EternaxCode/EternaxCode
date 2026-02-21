'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { AppProject } from '@/lib/worksData';
import { ReactNode } from 'react';

type TabKey = 'overview' | 'spec' | 'support' | 'marketing';

const tabs: { key: TabKey; label: string; suffix: string }[] = [
  { key: 'overview', label: 'Overview', suffix: '' },
  { key: 'spec', label: 'Specification', suffix: '/spec' },
  { key: 'support', label: 'Support', suffix: '/support' },
  { key: 'marketing', label: 'Marketing', suffix: '/marketing' },
];

interface WorkDetailLayoutProps {
  project: AppProject;
  currentTab: TabKey;
  children: ReactNode;
}

export default function WorkDetailLayout({
  project,
  currentTab,
  children,
}: WorkDetailLayoutProps) {
  const router = useRouter();
  const basePath = `/works/${project.id}`;

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-8 pt-24 text-white">
      <div className="w-full max-w-4xl">
        {/* Back link */}
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Works
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-base text-white/60 mb-8">{project.subtitle}</p>

        {/* Tab navigation */}
        <nav className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            const href = `${basePath}${tab.suffix}`;
            return (
              <Link
                key={tab.key}
                href={href}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-white/20 text-white ring-1 ring-white/20'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Content with tab transition */}
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
