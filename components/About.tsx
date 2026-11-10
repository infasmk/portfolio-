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
      className="relative py-28 md:py-40 bg-obsidian/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Background ambient lighting in Copper */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-copper/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 -left-1/4 w-[500px] h-[500px] bg-[#8C4E31]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Large Editorial Statement with Scroll-Linked Word Highlights */}
        <div className="mb-24 md:mb-36 pt-8 md:pt-12">
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
              color="text-transparent bg-clip-text bg-gradient-to-r from-warm-ivory via-[#E29875] to-copper italic"
            >
              EXPERIENCES.
            </HighlightWord>
          </h2>
        </div>

        {/* Two-Column Editorial Narrative & Infas Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Left Column: Creative Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 md:p-12 rounded-3xl bg-deep-charcoal/80 border border-white/[0.08] hover:border-copper/40 backdrop-blur-md relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-copper/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper mb-4 block">
                CREATIVE PHILOSOPHY
              </span>

              <h3 className="text-2xl md:text-3xl font-space font-bold text-warm-ivory mb-6 leading-snug">
                Where technical engineering precision meets cinematic spatial art.
              </h3>

              <div className="space-y-4 text-muted-silver text-base md:text-lg leading-relaxed font-light">
                <p>
                  Most websites are digital brochures. We build immersive web destinations that command attention.
                  At <strong className="text-warm-ivory font-medium">WEB⚡BITS</strong>, every interaction, scroll response, and 3D surface is calibrated to provide frictionless tactile delight.
                </p>
                <p>
                  Rooted in real-time WebGL, Three.js, and modern React architectures, we eliminate the false compromise between groundbreaking visual aesthetics and ultra-fast performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Identity Badge */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-deep-charcoal/80 border border-white/[0.08] hover:border-copper/40 backdrop-blur-md relative transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-copper/50 shadow-[0_0_25px_rgba(184,115,80,0.3)] shrink-0 bg-obsidian group">
                  <img
                    src="/infas.jpg"
                    alt={BRAND.founder}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
                <div>
                  <h4 className="text-xl font-space font-bold text-warm-ivory">{BRAND.founder}</h4>
                  <p className="text-copper text-xs font-mono uppercase tracking-wider font-bold">
                    FOUNDER & CREATIVE TECHNOLOGIST
                  </p>
                  <p className="text-muted-silver text-xs flex items-center gap-1.5 mt-1 font-mono">
                    <MapPin size={12} className="text-copper-light" /> {BRAND.institution}, India
                  </p>
                </div>
              </div>

              <p className="text-muted-silver text-sm leading-relaxed mb-6 font-light">
                Engineering high-dimensional web interfaces, procedural shader systems, and full-stack software from NIT Raipur.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <a
                  href={BRAND.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-graphite/60 border border-white/[0.08] text-center text-xs font-mono text-muted-silver hover:text-warm-ivory hover:border-copper/50 transition-all"
                >
                  GITHUB PROFILE ↗
                </a>
                <a
                  href={BRAND.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-graphite/60 border border-white/[0.08] text-center text-xs font-mono text-muted-silver hover:text-warm-ivory hover:border-copper/50 transition-all"
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
              className="p-6 md:p-8 rounded-2xl bg-deep-charcoal/80 border border-white/[0.08] hover:border-copper/40 backdrop-blur-md transition-all group"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-warm-ivory group-hover:text-copper transition-colors tabular-nums block mb-2">
                {stat.value}
              </span>
              <p className="text-warm-ivory text-xs md:text-sm font-bold uppercase tracking-wider font-space mb-1">
                {stat.label}
              </p>
              <p className="text-muted-silver text-[11px] font-mono">
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
