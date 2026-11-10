import React, { useRef, useEffect, useState } from 'react';
import { motion as motionBase, useScroll, useVelocity } from 'framer-motion';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../constants';

const motion = motionBase as any;

const MarqueeCard: React.FC<{ text: string; tag: string }> = ({ text, tag }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-deep-charcoal/80 border border-white/[0.08] hover:border-copper/40 hover:bg-graphite/60 backdrop-blur-md transition-all duration-300 shadow-lg shrink-0 group">
    <span className="w-1.5 h-1.5 rounded-full bg-copper group-hover:shadow-[0_0_8px_rgba(184,115,80,0.8)]" />
    <span className="font-space font-bold text-sm md:text-base text-warm-ivory/90 group-hover:text-warm-ivory uppercase tracking-tight">
      {text}
    </span>
    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-copper/10 border border-copper/30 text-copper uppercase tracking-widest font-semibold">
      {tag}
    </span>
  </div>
);

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Dynamically increase speed when user scrolls
  useEffect(() => {
    let timeout: any;
    const unsubscribe = scrollVelocity.on('change', (latest) => {
      const absVelocity = Math.abs(latest);
      if (absVelocity > 100) {
        // Boost speed up to 3x based on scroll velocity
        const boost = Math.min(3, 1 + absVelocity / 600);
        setSpeedMultiplier(boost);

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setSpeedMultiplier(1);
        }, 200);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [scrollVelocity]);

  // Repeated items for seamless infinite loop
  const row1Repeats = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Repeats = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  // Duration scales inversely with speedMultiplier
  const durationRow1 = 28 / speedMultiplier;
  const durationRow2 = 32 / speedMultiplier;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 md:py-16 bg-obsidian/90 border-y border-white/[0.08] marquee-mask select-none flex flex-col gap-4"
    >
      {/* Line 1: Scrolls Left */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: durationRow1,
          }}
          className="flex items-center gap-4 will-change-transform"
        >
          {row1Repeats.map((item, idx) => (
            <MarqueeCard key={`row1-${item.text}-${idx}`} text={item.text} tag={item.tag} />
          ))}
        </motion.div>
      </div>

      {/* Line 2: Scrolls Right */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: durationRow2,
          }}
          className="flex items-center gap-4 will-change-transform"
        >
          {row2Repeats.map((item, idx) => (
            <MarqueeCard key={`row2-${item.text}-${idx}`} text={item.text} tag={item.tag} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
