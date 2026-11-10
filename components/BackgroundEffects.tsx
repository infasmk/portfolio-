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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian">
      {/* Continuous Animated Copper & Graphite Glow Orbs */}
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
        className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-copper/10 blur-[180px]"
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
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-[#8C4E31]/10 blur-[180px]"
      />

      {/* React Bits Hyperspeed Global Cyber Highway Background in Warm Ivory & Copper */}
      <div className="absolute inset-0 z-5 opacity-60 mix-blend-screen pointer-events-none">
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
          tailColors={['#FFFFFF', '#D4D4D8', '#8E8E93', '#B87350']}
          headColors={['#F5F2EA', '#D4D4D8', '#A1A1AA', '#C98563']}
          poleColors={['#B8B8B8', '#71717A']}
          roadColor="#080808"
          lineColor="#151518"
          roadOpacity={0.18}
          background="transparent"
          interactive={false}
        />
      </div>

      {/* React Bits Interactive DotGrid Layer */}
      <div className="absolute inset-0 z-10 opacity-35">
        <DotGrid
          dotSize={2.5}
          gap={32}
          baseColor="#1A1A1A"
          activeColor="#B87350"
          proximity={120}
          shockRadius={220}
          shockStrength={3.5}
          resistance={800}
          returnDuration={1.4}
        />
      </div>

      {/* Depth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,8,8,0.85)_100%)] z-20 pointer-events-none" />
    </div>
  );
};

export default BackgroundEffects;
