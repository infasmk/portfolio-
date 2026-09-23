import React, { useState, useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Layers, Sparkles, ArrowUpRight } from 'lucide-react';
import Hero3D from './Hero3D';
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

  // Hero Scroll Transformation
  const objectScale = useTransform(smoothProgress, [0, 1], [1, 0.65]);
  const objectY = useTransform(smoothProgress, [0, 1], [0, 180]);
  const objectOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.35, 0]);

  const textY = useTransform(smoothProgress, [0, 0.8], [0, -100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  const handleExploreClick = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-12"
    >
      {/* 3D Centerpiece with Full Mouse Drag & Orbit Interaction */}
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

      {/* Floating 3D Mode Switcher (Discrete, Top-Right) */}
      <div className="absolute top-24 right-6 md:right-12 z-20">
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-cyan-400/50 text-[10px] font-mono text-zinc-400 hover:text-white transition-all backdrop-blur-md"
          title="Toggle 3D Wireframe View"
        >
          <Layers size={12} className={wireframeMode ? 'text-cyan-400' : 'text-zinc-500'} />
          <span>{wireframeMode ? 'WIREFRAME' : 'METALLIC'}</span>
        </button>
      </div>

      {/* Editorial Headline & Narrative Composition (No overlap) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left flex flex-col justify-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-4xl"
        >
          {/* Overline Tag (In-flow to prevent overlap) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Sparkles size={12} className="text-cyan-300" />
            <span>CREATIVE TECHNOLOGY STUDIO // {BRAND.institution}</span>
          </motion.div>

          {/* Signature Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-space font-extrabold tracking-tighter leading-[0.9] text-white mb-6 uppercase"
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
            transition={{ duration: 0.8, delay: 0.45 }}
            className="max-w-xl text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10"
          >
            We design and build high-performance interactive websites, bespoke digital products, and experimental 3D architectures.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleExploreClick}
              data-cursor="VIEW"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={16} />
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
