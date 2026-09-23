import React, { useState, useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Zap } from 'lucide-react';

const motion = motionBase as any;

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    // Stage 1: Electric energy emerges (150ms)
    const t1 = setTimeout(() => setStage(1), 180);
    // Stage 2: Energy ring & logo scale (400ms)
    const t2 = setTimeout(() => setStage(2), 480);
    // Stage 3: WEB⚡BITS reveal & ready (750ms)
    const t3 = setTimeout(() => setStage(3), 780);
    // Complete and exit smoothly (1050ms)
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] font-space text-white px-6 select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Electric Energy Ring */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: stage >= 1 ? 1 : 0.7,
              opacity: stage >= 1 ? 1 : 0,
              rotate: 360,
            }}
            transition={{
              scale: { duration: 0.4 },
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute inset-0 rounded-full border border-blue-500/20 border-t-cyan-400 border-r-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: stage >= 2 ? [1, 1.08, 1] : 0.8,
              opacity: stage >= 2 ? 0.4 : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full border border-cyan-500/30"
          />

          {/* Central Lightning Bolt Monogram */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage >= 1 ? 1 : 0,
              opacity: stage >= 1 ? 1 : 0,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 260 }}
            className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-cyan-300 shadow-[0_0_25px_rgba(37,99,235,0.7)]"
          >
            <Zap size={22} className="fill-cyan-300 text-cyan-200" />
            <motion.div
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute inset-0 rounded-xl bg-cyan-400/20"
            />
          </motion.div>
        </div>

        {/* Brand Text Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="flex items-center gap-1.5 text-2xl font-bold font-space tracking-tight text-white">
            <span>WEB</span>
            <span className="text-cyan-400">⚡</span>
            <span>BITS</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-500 mt-2"
          >
            CREATIVE TECHNOLOGY STUDIO
          </motion.p>
        </motion.div>

        {/* Quick Skip Button for Instant Navigation */}
        <button
          onClick={() => onComplete && onComplete()}
          className="absolute -bottom-24 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] text-zinc-600 hover:text-white hover:border-white/20 transition-all font-mono tracking-widest"
        >
          SKIP [ESC]
        </button>
      </div>
    </motion.div>
  );
};

export default Loader;
