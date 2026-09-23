import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';
import { MapPin, Code2, Award, Sparkles, Terminal } from 'lucide-react';
import { BRAND } from '../constants';

const motion = motionBase as any;

// Scroll-linked word highlight component
const HighlightWord: React.FC<{
  children: React.ReactNode;
  progress: any;
  range: [number, number];
  color?: string;
}> = ({ children, progress, range, color = 'text-white' }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const scale = useTransform(progress, range, [0.98, 1]);

  return (
    <motion.span
      style={{ opacity, scale }}
      className={`inline-block transition-colors duration-200 ${color}`}
    >
      {children}&nbsp;
    </motion.span>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 md:py-40 bg-transparent overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-1/4 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-10 md:mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
            // 01 ARCHITECTURE & PHILOSOPHY
          </span>
          <div className="h-[1px] w-24 bg-white/10" />
        </div>

        {/* Large Editorial Statement with Scroll-Linked Word Highlights */}
        <div className="mb-24 md:mb-36">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-space font-extrabold tracking-tighter leading-[1.05] uppercase">
            <HighlightWord progress={scrollYProgress} range={[0.05, 0.15]}>
              WE
            </HighlightWord>
            <HighlightWord progress={scrollYProgress} range={[0.1, 0.2]}>
              DON'T
            </HighlightWord>
            <HighlightWord progress={scrollYProgress} range={[0.15, 0.25]}>
              JUST
            </HighlightWord>
            <HighlightWord progress={scrollYProgress} range={[0.2, 0.3]}>
              BUILD
            </HighlightWord>
            <HighlightWord progress={scrollYProgress} range={[0.25, 0.35]}>
              WEBSITES.
            </HighlightWord>
            <br className="hidden sm:block" />
            <HighlightWord progress={scrollYProgress} range={[0.3, 0.42]}>
              WE
            </HighlightWord>
            <HighlightWord progress={scrollYProgress} range={[0.35, 0.48]}>
              BUILD
            </HighlightWord>
            <HighlightWord
              progress={scrollYProgress}
              range={[0.4, 0.55]}
              color="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 italic"
            >
              EXPERIENCES.
            </HighlightWord>
          </h2>
        </div>

        {/* Two-Column Editorial Narrative & Infas Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Left Column: Creative Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-4 block">
                CREATIVE PHILOSOPHY
              </span>

              <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-6 leading-snug">
                Where technical engineering precision meets cinematic spatial art.
              </h3>

              <div className="space-y-4 text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                <p>
                  Most websites are digital brochures. We build immersive web destinations that command attention.
                  At <strong className="text-white font-medium">WEB⚡BITS</strong>, every interaction, scroll response, and 3D surface is calibrated to provide frictionless tactile delight.
                </p>
                <p>
                  Rooted in real-time WebGL, Three.js, and modern React architectures, we eliminate the false compromise between groundbreaking visual aesthetics and ultra-fast performance.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  ⚡ 60FPS TARGET
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  ⚡ SUB-100MS LATENCY
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  ⚡ ACCESSIBLE MOTION
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Identity Badge */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] relative">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/30">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt="Infas.mk"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
                </div>
                <div>
                  <h4 className="text-xl font-space font-bold text-white">{BRAND.founder}</h4>
                  <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
                    FOUNDER & CREATIVE TECHNOLOGIST
                  </p>
                  <p className="text-zinc-500 text-xs flex items-center gap-1.5 mt-1 font-mono">
                    <MapPin size={12} className="text-blue-400" /> {BRAND.institution}, India
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                Engineering high-dimensional web interfaces, procedural shader systems, and full-stack software from NIT Raipur.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <a
                  href={BRAND.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all"
                >
                  GITHUB PROFILE ↗
                </a>
                <a
                  href={BRAND.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all"
                >
                  LINKEDIN ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Experience Stats (Requirement 7: Use actual values from constants) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {BRAND.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all group"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-white group-hover:text-cyan-400 transition-colors tabular-nums block mb-2">
                {stat.value}
              </span>
              <p className="text-white text-xs md:text-sm font-bold uppercase tracking-wider font-space mb-1">
                {stat.label}
              </p>
              <p className="text-zinc-500 text-[11px] font-mono">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
