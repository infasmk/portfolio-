
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-space tracking-tighter text-white mb-2">
              NOVA<span className="text-blue-500">.</span>
            </h2>
            <p className="text-zinc-600 text-sm">
              &copy; {new Date().getFullYear()} Nova Creative Studio. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-zinc-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="hover:text-white transition-colors">DRIBBBLE</a>
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="p-4 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
