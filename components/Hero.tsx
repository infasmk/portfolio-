import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Aurora from './Aurora';
import ColorBends from './ColorBends';
import Hyperspeed from './Hyperspeed';

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
      {/* React Bits Multi-Shader Hero Architecture: Hyperspeed + ColorBends + Aurora */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Layer 1: React Bits Hyperspeed 3D Cyber Warp Highway in Warm Ivory & Metallic Copper */}
        <div className="absolute inset-0 opacity-85 mix-blend-screen pointer-events-auto">
          <Hyperspeed
            curve="winding"
            curvature={0.8}
            speed={1.2}
            boost={3}
            fov={90}
            boostFov={130}
            lanes={3}
            roadWidth={12}
            density={45}
            trailLength={1.2}
            lightSize={1.1}
            glow={0.7}
            tailColors={['#FFFFFF', '#D4D4D8', '#8E8E93', '#B87350']}
            headColors={['#F5F2EA', '#D4D4D8', '#A1A1AA', '#C98563']}
            poleColors={['#B8B8B8', '#71717A']}
            roadColor="#080808"
            lineColor="#151518"
            roadOpacity={0.2}
            background="transparent"
            interactive={true}
          />
        </div>

        {/* Layer 2: Three.js ColorBends interactive fluid waves */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <ColorBends
            colors={["#B87350", "#D48B68", "#F5F2EA", "#8C4E31"]}
            rotation={90}
            speed={0.2}
            scale={1.1}
            frequency={1.1}
            warpStrength={1.2}
            mouseInfluence={1.2}
            parallax={0.5}
            noise={0.12}
            iterations={1}
            intensity={1.5}
            bandWidth={6}
            transparent={true}
          />
        </div>

        {/* Layer 3: OGL Aurora spectral curtains */}
        <div className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none">
          <Aurora
            colorStops={["#B87350", "#F5F2EA", "#8C4E31"]}
            blend={0.55}
            amplitude={1.1}
            speed={0.5}
          />
        </div>

        {/* Ambient Gradient Depth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian pointer-events-none" />
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
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-space font-extrabold tracking-tighter leading-[0.9] text-warm-ivory mb-6 uppercase"
          >
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-ivory via-[#E29875] to-copper">
              DIGITAL
            </span> <br />
            EXPERIENCES.
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-xl text-muted-silver text-base md:text-xl font-light leading-relaxed mb-10"
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
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-copper text-obsidian font-space font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-copper-light hover:shadow-[0_0_30px_rgba(184,115,80,0.5)] active:scale-95 transition-all"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={16} />
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-warm-ivory font-space font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white/10 hover:border-copper/50 transition-all backdrop-blur-sm"
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
