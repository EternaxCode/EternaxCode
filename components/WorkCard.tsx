'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { WorkProject } from '@/lib/worksData';
import { categoryLabels } from '@/lib/worksData';

interface WorkCardProps {
  project: WorkProject;
}

export default function WorkCard({ project }: WorkCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = project.image && !imgError;

  return (
    <Link href={`/works/${project.id}`} className="block h-full">
      <motion.div
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-colors duration-300 hover:bg-white/10 hover:border-white/20"
        whileHover={{
          scale: 1.03,
          boxShadow: `0 0 40px ${project.accentColor}`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Preview Image / Fallback */}
        <div className="aspect-video w-full relative overflow-hidden">
          {showImage ? (
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.fallbackGradient} flex items-center justify-center`}
            >
              <span className="text-2xl font-bold text-white/30 group-hover:text-white/60 transition-colors duration-300">
                {project.fallbackLabel}
              </span>
            </div>
          )}

          {/* Category badge */}
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white/90">
            {categoryLabels[project.type]}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Case Study
              <ArrowRight size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-xl font-semibold text-white/90 group-hover:text-white mb-2 transition-colors">
            {project.title}
          </h2>
          <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
