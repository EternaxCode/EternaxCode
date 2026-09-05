'use client';

import Head from 'next/head';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Package, Globe, Smartphone, Gamepad2, Palette } from 'lucide-react';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkCard from '@/components/WorkCard';
import { worksData, getCategories, categoryLabels } from '@/lib/worksData';
import type { WorkCategory } from '@/lib/worksData';

const capabilities: {
  category: WorkCategory;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  {
    category: 'web',
    title: 'Web Development',
    icon: Globe,
    description:
      'Brand sites, AI-powered platforms, and web services — designed and engineered end-to-end with modern stacks.',
  },
  {
    category: 'app',
    title: 'Mobile Apps',
    icon: Smartphone,
    description:
      'Cross-platform iOS & Android apps, from product design to App Store launch, built with privacy-first architecture.',
  },
  {
    category: 'game',
    title: 'Games & Live Ops',
    icon: Gamepad2,
    description:
      'Original games we design, build, and operate ourselves — from pixel-art prototypes to live-service updates.',
  },
  {
    category: 'design',
    title: 'UI/UX & Brand Design',
    icon: Palette,
    description:
      'Design systems, brand identities, and interfaces that give every product a distinct, professional presence.',
  },
];

type Filter = 'all' | WorkCategory;

export default function Works() {
  const [filter, setFilter] = useState<Filter>('all');

  const categories = useMemo(() => getCategories(), []);
  const filtered = useMemo(
    () => (filter === 'all' ? worksData : worksData.filter((p) => p.type === filter)),
    [filter],
  );

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: worksData.length },
    ...categories.map((c) => ({
      key: c as Filter,
      label: categoryLabels[c],
      count: worksData.filter((p) => p.type === c).length,
    })),
  ];

  return (
    <>
      <Head>
        <title>Works - EternaxCode</title>
        <meta
          name="description"
          content="Explore case studies by EternaxCode — web platforms, mobile apps, games, and design systems, each documented with overview, design system, and references."
        />
      </Head>

      <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 pt-24 pb-20 text-white">
        <StaggerContainer className="w-full max-w-6xl">
          {/* Header */}
          <StaggerItem className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white/80 mb-6">
              <Package size={14} />
              Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Selected Works
            </h1>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
              Case studies across web, app, game, and design — each documented with a service overview,
              design system, and references so you can see exactly how we work.
            </p>
          </StaggerItem>

          {/* Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 sm:mb-14">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <StaggerItem key={cap.category}>
                  <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                    <Icon size={22} className="text-white/70 mb-3" />
                    <h2 className="text-base font-semibold text-white/90 mb-2">{cap.title}</h2>
                    <p className="text-sm text-white/55 leading-relaxed">{cap.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </div>

          {/* Category filter */}
          <StaggerItem className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
            {filters.map((f) => {
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    border cursor-pointer transition-all duration-200
                    ${
                      isActive
                        ? 'bg-white/20 text-white border-white/25 ring-1 ring-white/20'
                        : 'bg-transparent text-white/60 border-white/10 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {f.label}
                  <span
                    className={`text-xs font-mono ${isActive ? 'text-white/70' : 'text-white/40'}`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </StaggerItem>

          {/* Project Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <WorkCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </StaggerContainer>
      </div>
    </>
  );
}
