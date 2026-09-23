import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUp, Zap } from 'lucide-react';
import { BRAND } from '../constants';
import { soundManager } from './SoundManager';

const motion = motionBase as any;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 md:py-24 bg-[#050505] border-t border-white/[0.08] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-cyan-300">
              <Zap size={13} className="fill-cyan-300" />
            </div>
            <span className="font-space font-extrabold text-xl text-white tracking-tighter">
              WEB<span className="text-cyan-400">⚡</span>BITS
            </span>
          </div>

          <p className="text-zinc-500 text-xs font-mono max-w-sm leading-relaxed">
            &copy; {new Date().getFullYear()} WEB⚡BITS STUDIO. Engineered by {BRAND.founder} ({BRAND.institution}).
            All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono text-zinc-400">
          <a
            href={BRAND.socials.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick()}
            className="hover:text-cyan-400 transition-colors"
          >
            GITHUB
          </a>
          <a
            href={BRAND.socials.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick()}
            className="hover:text-cyan-400 transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href={BRAND.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick()}
            className="hover:text-cyan-400 transition-colors"
          >
            WHATSAPP
          </a>
          <a
            href={BRAND.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick()}
            className="hover:text-cyan-400 transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        <motion.button
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          onMouseEnter={() => soundManager.playHover()}
          className="p-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-zinc-300 hover:text-white transition-all shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
