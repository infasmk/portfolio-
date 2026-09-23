import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { MARQUEE_ITEMS } from '../constants';

const motion = motionBase as any;

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth out the scroll velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Skew text slightly based on scroll velocity (subtle kinetic typography)
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-6, 6]);

  const marqueeRepeats = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-8 md:py-12 border-y border-white/[0.06] bg-[#07080b] marquee-mask select-none"
    >
      <motion.div
        style={{ skewX }}
        className="flex whitespace-nowrap"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
          className="flex items-center gap-8 md:gap-14 text-zinc-500 font-space font-bold tracking-tight text-xl md:text-3xl uppercase"
        >
          {marqueeRepeats.map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-8 md:gap-14">
              <span className="hover:text-cyan-400 transition-colors duration-300">
                {item}
              </span>
              <span className="text-cyan-500 text-lg md:text-xl">⚡</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Marquee;
