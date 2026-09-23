import React, { useState, useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Layers, Terminal, Sparkles, ArrowUpRight } from 'lucide-react';
import Hero3D from './Hero3D';
import { soundManager } from './SoundManager';
import { BRAND } from '../constants';

const motion = motionBase as any;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Scroll Transformation (Requirement 6)
  // As user scrolls: 3D scene scales down & moves back in depth, headline translates & fades
  const objectScale = useTransform(smoothProgress, [0, 1], [1, 0.65]);
  const objectY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const objectOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.4, 0]);

  const textY = useTransform(smoothProgress, [0, 0.8], [0, -120]);
  const textOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  const badgeY = useTransform(smoothProgress, [0, 1], [0, -60]);

  const handleExploreClick = () => {
    soundManager.playWarp();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden pt-24 md:pt-28 pb-16"
    >
      {/* 3D Centerpiece with Scroll-linked Transformation */}
      <motion.div
        style={{
          scale: objectScale,
          y: objectY,
          opacity: objectOpacity,
        }}
        className="absolute inset-0 z-0 pointer-events-auto"
      >
        <Hero3D wireframe={wireframeMode} />
      </motion.div>

      {/* Floating Interactive UI Fragments / Badges */}
      <div className="absolute top-28 left-6 md:left-12 z-20 hidden md:block">
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-[11px] font-mono text-zinc-400"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>STUDIO DEPLOYED // {BRAND.institution}</span>
        </motion.div>
      </div>

      <div className="absolute top-28 right-6 md:right-12 z-20 hidden md:block">
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-2"
        >
          {/* 3D Wireframe / Solid Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setWireframeMode(!wireframeMode);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 text-[11px] font-mono text-zinc-400 hover:text-white transition-all backdrop-blur-md"
            title="Toggle 3D Wireframe View"
          >
            <Layers size={13} className={wireframeMode ? 'text-cyan-400' : 'text-zinc-500'} />
            <span>{wireframeMode ? 'WIREFRAME FLUX' : 'METALLIC PBR'}</span>
          </button>
        </motion.div>
      </div>

      {/* Editorial Headline & Narrative Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left flex flex-col justify-between min-h-[75vh]">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-4xl"
        >
          {/* Overline Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Sparkles size={12} className="text-cyan-300" />
            <span>CREATIVE TECHNOLOGY & INTERACTIVE SYSTEMS</span>
          </motion.div>

          {/* Signature Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-space font-extrabold tracking-tighter leading-[0.88] text-white mb-6 uppercase"
          >
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500">
              DIGITAL
            </span> <br />
            EXPERIENCES.
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="max-w-xl text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10"
          >
            We design and build high-performance interactive websites, bespoke digital products, and experimental 3D architectures that leave lasting memories.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleExploreClick}
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="VIEW"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={16} />
            </button>

            <a
              href="#about"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
            >
              <span>OUR PHILOSOPHY</span>
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Explorer Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex items-center justify-between pt-12 border-t border-white/[0.06] text-xs font-mono text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">⚡</span>
            <span>WEB⚡BITS STUDIO // INFAS.MK</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleExploreClick}>
            <span className="tracking-widest uppercase text-[10px] group-hover:text-cyan-400 transition-colors">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-7 rounded-full border border-zinc-700 flex justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 bg-cyan-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
