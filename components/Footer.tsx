import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUp, Zap, Sparkles } from 'lucide-react';
import { BRAND } from '../constants';
import Ballpit from './Ballpit';

const motion = motionBase as any;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 md:py-28 bg-[#050505] relative overflow-hidden select-none border-t border-white/[0.08]">
      {/* Animated Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        />
      </div>

      {/* Background Animated Gradient Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-blue-600 to-cyan-500 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* React Bits Ballpit Interactive Physics Arena */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] mb-16 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#090b14]/70 to-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm group">
          {/* HUD Badging */}
          <div className="absolute top-4 left-6 z-10 pointer-events-none flex items-center gap-2.5 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-widest uppercase">PHYSICS SIMULATION LAB // INTERACTIVE COLLISION MATRIX</span>
          </div>

          <div className="absolute top-4 right-6 z-10 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span>MOVE CURSOR TO SCATTER SPHERES</span>
          </div>

          <Ballpit
            count={90}
            gravity={0.45}
            friction={0.995}
            wallBounce={0.92}
            followCursor={true}
            colors={["#06b6d4", "#2563eb", "#3b82f6", "#6366f1", "#0284c7"]}
            ambientColor={0x1e1b4b}
            ambientIntensity={1.4}
            lightIntensity={180}
            minSize={0.6}
            maxSize={1.4}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16 pb-12 border-b border-white/[0.06]">
          {/* Brand Identity & Live Status Beacon */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Zap size={16} className="fill-cyan-300" />
              </div>
              <span className="font-space font-extrabold text-2xl text-white tracking-tighter">
                WEB<span className="text-cyan-400">⚡</span>BITS
              </span>
            </div>

            <p className="text-zinc-400 text-sm font-light max-w-md leading-relaxed mb-4">
              Building next-generation interactive web applications, real-time 3D spatial platforms, and high-performance digital architectures.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>SYSTEMS ONLINE // {BRAND.institution}</span>
            </div>
          </div>

          {/* Social Links with Animated Underlines */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono text-zinc-400">
            <a
              href={BRAND.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase relative group"
            >
              <span>GITHUB</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href={BRAND.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase relative group"
            >
              <span>INSTAGRAM</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href={BRAND.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase relative group"
            >
              <span>WHATSAPP</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href={BRAND.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase relative group"
            >
              <span>LINKEDIN</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Animated Back to Top Button */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 text-zinc-300 hover:text-white transition-all shadow-lg self-end lg:self-center"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        {/* Copyright Footnote */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
          <span>&copy; {new Date().getFullYear()} WEB⚡BITS STUDIO. Engineered by {BRAND.founder}.</span>
          <span className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-cyan-400" />
            POWERED BY REACT, THREE.JS & TAILWIND
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
