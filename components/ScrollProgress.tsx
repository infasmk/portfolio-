import React from 'react';
import { motion as motionBase, useScroll, useSpring } from 'framer-motion';

const motion = motionBase as any;

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-white/[0.03]">
      <motion.div
        className="h-full bg-gradient-to-r from-copper-dark via-copper to-copper-light shadow-[0_0_12px_rgba(184,115,80,0.6)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgress;
