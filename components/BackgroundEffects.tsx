import React from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import DotGrid from './DotGrid';
import Hyperspeed from './Hyperspeed';

const motion = motionBase as any;

export const BackgroundEffects: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax shifts on scroll
  const blob1Y = useTransform(smoothScroll, [0, 1], [0, -350]);
  const blob2Y = useTransform(smoothScroll, [0, 1], [0, -600]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
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

      {/* React Bits Hyperspeed Global Cyber Highway Background */}
      <div className="absolute inset-0 z-5 opacity-55 mix-blend-screen pointer-events-none">
        <Hyperspeed
          curve="gentle"
          curvature={0.6}
          speed={0.9}
          fov={85}
          lanes={3}
          roadWidth={14}
          density={40}
          trailLength={1.3}
          lightSize={1.2}
          glow={0.7}
          tailColors={['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef']}
          headColors={['#22d3ee', '#38bdf8', '#0284c7']}
          poleColors={['#06b6d4']}
          roadColor="#060810"
          roadOpacity={0.15}
          background="transparent"
          interactive={false}
        />
      </div>

      {/* React Bits Interactive DotGrid Layer */}
      <div className="absolute inset-0 z-10 opacity-35">
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
