
import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 md:py-4 bg-black/50 backdrop-blur-lg border-b border-white/5' : 'py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold font-space tracking-tighter"
        >
          <a href="#" className="flex items-center">
            <span className="text-white">Portfolio</span>
            <span className="text-blue-500">.</span>
          </a>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-blue-500 group-hover:w-1/2 transition-all duration-300" />
            </a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block"
        >
          <a
            href="#contact"
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            LET'S TALK
          </a>
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 text-white bg-white/5 rounded-full border border-white/10 active:scale-90 transition-transform"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[40] md:hidden flex flex-col items-center justify-center text-center p-6"
          >
            <div className="flex flex-col space-y-8 w-full">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-space font-bold text-zinc-400 hover:text-white active:text-blue-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-bold w-full block"
                >
                  START A PROJECT
                </a>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 flex gap-6 text-zinc-500">
              <span className="text-xs uppercase tracking-[0.3em]">Twitter</span>
              <span className="text-xs uppercase tracking-[0.3em]">LinkedIn</span>
              <span className="text-xs uppercase tracking-[0.3em]">Dribbble</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
