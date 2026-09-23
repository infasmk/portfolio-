import React from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import GhostFibers from './GhostFibers';
import DotGrid from './DotGrid';

const motion = motionBase as any;

interface BackgroundEffectsProps {
  isAllProjectsView?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isAllProjectsView = false }) => {
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax shifts on scroll
  const blob1Y = useTransform(smoothScroll, [0, 1], [0, -350]);
  const blob2Y = useTransform(smoothScroll, [0, 1], [0, -600]);

  // GhostFibers is active across all sections EXCEPT Hero (fades in as user scrolls past Hero)
  const scrollGhostFibersOpacity = useTransform(smoothScroll, [0, 0.06], [0, 1]);
  const ghostFibersOpacity = isAllProjectsView ? 1 : scrollGhostFibersOpacity;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* React Bits GhostFibers Background for all sections except Hero */}
      <motion.div
        style={{ opacity: ghostFibersOpacity }}
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
      >
        <GhostFibers
          lineColor="#0284c7"
          glowColor="#1e3a8a"
          speed={0.2}
          scale={1.8}
          rotation={0}
          rotationSpeed={0.2}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.8}
          brightness={2.2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
        />
      </motion.div>

      {/* Continuous Animated Aurora Orbs with Scroll Parallax */}
      <motion.div
        style={{ y: blob1Y }}
        animate={{
          x: [0, 40, -30, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-blue-700/10 blur-[160px]"
      />

      <motion.div
        style={{ y: blob2Y }}
        animate={{
          x: [0, -50, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/8 blur-[180px]"
      />

      {/* React Bits Interactive DotGrid Layer */}
      <div className="absolute inset-0 z-10 opacity-40">
        <DotGrid
          dotSize={2.5}
          gap={32}
          baseColor="#172554"
          activeColor="#22d3ee"
          proximity={120}
          shockRadius={220}
          shockStrength={3.5}
          resistance={800}
          returnDuration={1.4}
        />
      </div>

      {/* Depth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.85)_100%)] z-20 pointer-events-none" />
    </div>
  );
};

export default BackgroundEffects;
