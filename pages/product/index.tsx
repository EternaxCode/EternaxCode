import Head from 'next/head';
import Link from 'next/link';
import {
  Brain,
  Zap,
  Database,
  BarChart3,
  Activity,
  Layers,
  Binary,
  FlaskConical,
  Gauge,
  Globe,
  Smartphone,
  Server,
  ArrowRight,
} from 'lucide-react';
import SectionScroll from '@/components/SectionScroll';
import StaggerContainer from '@/components/StaggerContainer';
import { StaggerItem } from '@/components/StaggerContainer';

export default function Product() {
  return (
    <>
      <Head>
        <title>RAXI Engine - EternaxCode</title>
        <meta
          name="description"
          content="RAXI Engine: A novel hybrid architecture for efficient, self-evolving AI."
        />
      </Head>

      <SectionScroll>
        {/* Section 1 - Hero */}
        <section>
          <StaggerContainer className="max-w-4xl mx-auto text-center px-4">
            <StaggerItem>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/80 mb-8">
                <FlaskConical className="w-4 h-4" />
                Research Preview
              </div>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                RAXI Engine
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl md:text-2xl text-white/60 mb-4">
                Hybrid Architecture for Self-Evolving AI
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-white/40 max-w-2xl mx-auto">
                A novel architecture that combines linear-time sequence modeling
                with sparse attention — enabling efficient, adaptive intelligence
                that improves through autonomous evolution.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Section 2 - Key Capabilities */}
        <section>
          <StaggerContainer className="max-w-6xl mx-auto px-4" delay={0.2}>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Key Capabilities
              </h2>
              <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
                Designed for efficiency, adaptability, and scale
              </p>
            </StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <Gauge className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Linear-Time Processing
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Processes sequences with O(N) complexity instead of
                    quadratic, enabling dramatically faster inference on long
                    sequences without sacrificing quality.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Self-Evolution
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Continuously improves through an autonomous training loop —
                    generating tasks, learning, evaluating, and adapting without
                    manual intervention.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Memory Efficient
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Proprietary compression reduces memory footprint by an order
                    of magnitude, making deployment feasible on resource-constrained
                    environments.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </section>

        {/* Section 3 - Vision */}
        <section>
          <StaggerContainer className="max-w-6xl mx-auto px-4" delay={0.2}>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Vision
              </h2>
              <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
                Where we&apos;re heading — fully autonomous management across Web, App, and Infrastructure
              </p>
            </StaggerItem>

            {/* 3-layer management */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: 'Web',
                  desc: 'Targeting autonomous deployment, monitoring, content updates, and performance optimization for web products.',
                  icon: Globe,
                  color: 'text-blue-400',
                  bgColor: 'bg-blue-500/20',
                },
                {
                  title: 'App',
                  desc: 'Aiming for end-to-end app lifecycle management — from build and release to user feedback analysis and iterative updates.',
                  icon: Smartphone,
                  color: 'text-purple-400',
                  bgColor: 'bg-purple-500/20',
                },
                {
                  title: 'Infrastructure',
                  desc: 'Building toward self-healing infrastructure that detects anomalies, scales resources, and resolves incidents autonomously.',
                  icon: Server,
                  color: 'text-pink-400',
                  bgColor: 'bg-pink-500/20',
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>

            {/* Goal statement */}
            <StaggerItem>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3 text-white/60 text-sm shrink-0">
                    <span className="text-white font-medium">RAXI Engine</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                    <span>Build</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                    <span>Deploy</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                    <span>Monitor</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                    <span>Maintain</span>
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-4">
                  Our goal is not just creation — but continuous maintenance, updates,
                  and evolution of products throughout their entire lifecycle.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex justify-center mt-6">
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  See products RAXI will manage
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Section 4 - Performance */}
        <section>
          <StaggerContainer className="max-w-6xl mx-auto px-4" delay={0.2}>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Performance
              </h2>
              <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
                Early results from self-evolution training
              </p>
            </StaggerItem>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: 'Up to 80×', label: 'Faster Inference', sub: 'vs standard Transformer', color: 'text-green-400' },
                { value: '~55%', label: 'Loss Reduction', sub: 'during self-evolution', color: 'text-pink-400' },
                { value: '10×', label: 'Memory Savings', sub: 'via compression', color: 'text-blue-400' },
                { value: 'O(N)', label: 'Sequence Scaling', sub: 'linear complexity', color: 'text-purple-400' },
              ].map((metric) => (
                <StaggerItem key={metric.label}>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                    <div className={`text-2xl md:text-3xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-white/60 mt-2">{metric.label}</div>
                    <div className="text-xs text-white/30 mt-1">{metric.sub}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>

            {/* Task Domains */}
            <StaggerItem>
              <h3 className="text-lg font-semibold text-white text-center mb-4">
                Evaluation Domains
              </h3>
            </StaggerItem>
            <StaggerItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { category: 'Text Understanding', icon: Binary },
                  { category: 'Visual Reasoning', icon: Layers },
                  { category: 'Structured Data', icon: Database },
                  { category: 'Cross-modal Tasks', icon: BarChart3 },
                ].map((cat) => (
                  <div
                    key={cat.category}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3"
                  >
                    <cat.icon className="w-4 h-4 text-white/30 shrink-0" />
                    <div className="text-sm text-white/60">{cat.category}</div>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="text-white/20 text-xs text-center mt-8">
                Benchmarks measured on proprietary synthetic evaluation suite.
                Results reflect research preview and may change.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Section 5 - Status & Contact */}
        <section>
          <StaggerContainer className="max-w-4xl mx-auto px-4 text-center" delay={0.2}>
            <StaggerItem>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 mb-8">
                <Activity className="w-4 h-4" />
                Research Preview — Active Development
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
                How It Works
              </h2>
            </StaggerItem>

            {/* Evolution Diagram */}
            <StaggerItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { step: '01', title: 'Generate', desc: 'Task synthesis' },
                  { step: '02', title: 'Train', desc: 'Adaptive learning' },
                  { step: '03', title: 'Evaluate', desc: 'Performance scoring' },
                  { step: '04', title: 'Evolve', desc: 'Self-improvement' },
                ].map((item, i) => (
                  <div key={item.step} className="relative">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                      <div className="text-xs text-purple-400 font-mono mb-2">
                        {item.step}
                      </div>
                      <div className="text-white font-semibold text-sm mb-1">
                        {item.title}
                      </div>
                      <div className="text-white/30 text-xs">{item.desc}</div>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 text-white/20 text-lg">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="text-white/40 mb-8 max-w-lg mx-auto text-sm">
                RAXI Engine is under active development. We share select
                capabilities and performance highlights for the research community.
                Architecture details, code, and model weights are proprietary.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 transition-all"
                >
                  About EternaxCode
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>
      </SectionScroll>
    </>
  );
}
