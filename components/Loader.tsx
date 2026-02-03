
import React, { useState, useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const messages = [
  "Initializing Modules...",
  "Installing Assets...",
  "Configuring Experience...",
  "Optimizing Performance...",
  "Finalizing Installation...",
  "Installation Complete",
  "Opening..."
];

const Loader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through 7 messages over ~2800ms (approx 400ms per message)
    const messageInterval = setInterval(() => {
      setIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 400);

    // Reach 100% smoothly over ~2700ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 6; // Reduced increment to slow down progress
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] font-space text-white px-6"
    >
      <div className="w-full max-w-md relative">
        {/* Decorative Glow */}
        <div className="absolute -inset-10 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-3">
            <motion.p
              key={messages[index]}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-blue-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase"
            >
              {messages[index]}
            </motion.p>
            <p className="text-zinc-500 text-[10px] font-bold tabular-nums tracking-widest">{Math.floor(progress)}%</p>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          <div className="mt-10 grid grid-cols-6 gap-3 opacity-10">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scaleY: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                className="h-0.5 bg-zinc-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end border-t border-white/5 pt-4 text-[9px] text-zinc-600 tracking-widest uppercase font-bold">
        <div className="space-y-1">
          <p>System v4.0.2 // Core Protocol Linked</p>
          <p>Aesthetics: 100% // Performance: 100%</p>
        </div>
        <div className="text-right opacity-40">
          <p>TEAM AWT</p>
          <p>Infas.mk</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
