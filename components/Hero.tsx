import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Aurora from './Aurora';

const motion = motionBase as any;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleExploreClick = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* React Bits Aurora Ambient Shader Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
        <Aurora
          colorStops={["#0284c7", "#06b6d4", "#4f46e5"]}
          blend={0.65}
          amplitude={1.2}
          speed={0.6}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
      </div>

      {/* Editorial Headline & Narrative Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left flex flex-col justify-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="max-w-4xl"
        >
          {/* Signature Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-xl text-zinc-400 text-base md:text-xl font-light leading-relaxed mb-10"
          >
            We design and build high-performance interactive websites, bespoke digital products, and experimental digital architectures that command attention.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
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
