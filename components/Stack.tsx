
import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

interface TechItemProps {
  name: string;
  icon?: React.ReactNode;
}

const TechItem: React.FC<TechItemProps> = ({ name, icon }) => (
  <motion.div 
    whileHover={{ scale: 1.1, color: '#3b82f6' }}
    className="flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl transition-all hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group cursor-pointer"
  >
    <div className="w-6 h-6 md:w-8 md:h-8 text-zinc-500 group-hover:text-blue-500 transition-colors duration-500 flex items-center justify-center">
      {icon || <div className="w-2 h-2 bg-current rounded-full" />}
    </div>
    <span className="text-zinc-500 group-hover:text-white font-space font-bold text-sm md:text-lg tracking-tight transition-colors duration-500 uppercase">
      {name}
    </span>
  </motion.div>
);

const MarqueeRow: React.FC<{ items: TechItemProps[]; direction: 'left' | 'right'; speed?: number }> = ({ 
  items, 
  direction, 
  speed = 40 
}) => {
  // Triple the items to ensure seamless loop on all screen widths
  const content = [...items, ...items, ...items];
  
  return (
    <div className="flex overflow-hidden marquee-mask py-4">
      <motion.div
        className="flex gap-4 md:gap-8 flex-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1035] : [-1035, 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
        // Pause on hover
        style={{ width: 'max-content' }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {content.map((item, idx) => (
          <TechItem key={`${item.name}-${idx}`} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

// Custom Brand Icons (Simplified SVGs for brands)
const Icons = {
  Github: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.89 15.672L6.255.485A.5.5 0 017.152.27l2.134 4.026zM13.5 13.5l1.5-9 2 9zM3.5 16l1.5-2.5 8.5-4 4 10z"/></svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.362 9.354H12V.348a.35.35 0 00-.594-.253L2.638 8.651a.35.35 0 00.244.595h9.362v9.006a.35.35 0 00.594.253l8.768-8.557a.35.35 0 00-.244-.594z"/></svg>
  ),
  Node: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 6.33v8.67L12 19.33l7.5-4.33V6.33L12 2zm6 12l-6 3.46L6 14V7.46L12 4l6 3.46V14z"/></svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
  )
};

const Stack: React.FC = () => {
  const row1 = [
    { name: "GitHub", icon: Icons.Github },
    { name: "Firebase", icon: Icons.Firebase },
    { name: "Supabase", icon: Icons.Supabase },
    { name: "Node.js", icon: Icons.Node },
    { name: "Vercel", icon: Icons.Vercel },
    { name: "Antigravity", icon: null },
  ];

  const row2 = [
    { name: "TypeScript", icon: null },
    { name: "Next.js", icon: Icons.Vercel },
    { name: "React", icon: null },
    { name: "Tailwind", icon: null },
    { name: "Three.js", icon: null },
    { name: "Framer", icon: null },
  ];

  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-blue-500 font-space font-bold tracking-[0.2em] uppercase text-xs mb-4">
            // OUR TECH ECOSYSTEM
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space text-white leading-tight">
            Industry Standard <span className="text-zinc-600 italic">Tools.</span>
          </h3>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={35} />
      </div>
      
      <div className="container mx-auto px-6 mt-16 flex justify-center">
        <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
};

export default Stack;
