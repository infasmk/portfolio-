import React, { useState, useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Terminal, Zap, CheckCircle2 } from 'lucide-react';

const motion = motionBase as any;

interface LoaderProps {
  onComplete?: () => void;
}

const BUILD_LOGS = [
  { text: "> web-bits@2.4.0 build", time: 100, status: "cmd" },
  { text: "> vite build --mode production", time: 300, status: "cmd" },
  { text: "✓ 2536 modules transformed & cached", time: 700, status: "ok" },
  { text: "✓ [1/3] Compiling WebGL shaders & 3D matrices", time: 1100, status: "ok" },
  { text: "✓ [2/3] Rendering 6 featured production platforms", time: 1450, status: "ok" },
  { text: "✓ [3/3] Optimizing kinetic motion & spring physics", time: 1750, status: "ok" },
  { text: "✓ Build complete in 1.98s // Deploying UI Core", time: 1950, status: "ready" },
];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [visibleLogs, setVisibleLogs] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reveal logs sequentially
    BUILD_LOGS.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogs(index + 1);
      }, log.time);
    });

    // Smoothly progress to 100% over exactly 2000ms
    const interval = 40; // 50 steps
    const step = 100 / (2000 / interval);
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Complete exactly at 2000ms
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] font-mono text-white px-6 select-none"
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      {/* Terminal Window Box */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090b10] border border-white/10 overflow-hidden shadow-2xl shadow-black/80">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-zinc-400 font-mono ml-2 flex items-center gap-1.5">
              <Terminal size={12} className="text-cyan-400" />
              web-bits-cli: bash — 80x24
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-space text-cyan-400 font-bold tracking-wider">
            <Zap size={11} className="fill-cyan-400" />
            <span>WEB⚡BITS</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-2 text-xs font-mono min-h-[220px]">
          {BUILD_LOGS.slice(0, visibleLogs).map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`flex items-start gap-2 ${
                log.status === "ready"
                  ? "text-emerald-400 font-bold"
                  : log.status === "ok"
                  ? "text-zinc-300"
                  : "text-zinc-500"
              }`}
            >
              <span>{log.text}</span>
            </motion.div>
          ))}

          {/* Active blinking terminal prompt */}
          <div className="flex items-center gap-1 text-cyan-400 pt-1">
            <span className="text-zinc-600">~</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Terminal Footer with Real 2s Progress Bar */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono mb-1.5">
              <span>INITIALIZING PORTFOLIO EXPERIENCE</span>
              <span className="text-cyan-400 font-bold tabular-nums">{Math.min(100, Math.floor(progress))}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
