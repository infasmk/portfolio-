import React, { useRef, useEffect, useState } from 'react';
import { motion as motionBase, useScroll, useVelocity } from 'framer-motion';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../constants';

const motion = motionBase as any;

const MarqueeCard: React.FC<{ text: string; tag: string }> = ({ text, tag }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300 shadow-lg shrink-0 group">
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
    <span className="font-space font-bold text-sm md:text-base text-zinc-300 group-hover:text-white uppercase tracking-tight">
      {text}
    </span>
    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 uppercase tracking-widest">
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
      className="relative w-full overflow-hidden py-10 md:py-16 bg-[#06070a] border-y border-white/[0.06] marquee-mask select-none flex flex-col gap-4"
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
