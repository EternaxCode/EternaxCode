import Head from 'next/head';
import { Package } from 'lucide-react';
import StaggerContainer, { StaggerItem } from '@/components/StaggerContainer';
import WorkCard from '@/components/WorkCard';
import { worksData } from '@/lib/worksData';

export default function Works() {
  return (
    <>
      <Head>
        <title>Works - EternaxCode</title>
        <meta
          name="description"
          content="Explore projects built by EternaxCode — from branded web experiences to AI-powered platforms."
        />
      </Head>

      <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 pt-24 text-white">
        <StaggerContainer className="w-full max-w-6xl">
          {/* Header */}
          <StaggerItem className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white/80 mb-6">
              <Package size={14} />
              Portfolio
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Selected Works
            </h1>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
              A collection of projects we&apos;ve crafted — each built with modern technologies and a focus on great user experience.
            </p>
          </StaggerItem>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {worksData.map((project) => (
              <StaggerItem key={project.id}>
                <WorkCard project={project} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </>
  );
}
