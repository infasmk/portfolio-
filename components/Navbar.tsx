import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMagnetic } from '../hooks/useMagnetic';
import { BRAND } from '../constants';

const motion = motionBase as any;

interface NavbarProps {
  onNavigateProjects?: () => void;
  isProjectView?: boolean;
}

// Custom Distinctive Geometric WEB⚡BITS Logo
const WebBitsLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="40" height="40" rx="10" fill="#0d1117" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <path
      d="M9 13L14 27L19 15L23 27L28 13"
      stroke="#38bdf8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 9L15 22H22L17 31"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]"
    />
  </svg>
);

const MagneticNavLink: React.FC<{
  href: string;
  name: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ href, name, active, onClick }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-3 py-1.5"
    >
      <motion.a
        href={href}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 15, stiffness: 250 }}
        className={`relative text-xs font-semibold tracking-wider uppercase transition-colors duration-300 block ${
          active ? 'text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        {name}
        {active && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        )}
      </motion.a>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onNavigateProjects, isProjectView = false }) => {
  const { scrollDirection, isAtTop } = useScrollDirection(12);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  // Magnetic button for CTA
  const ctaMagnetic = useMagnetic(0.3);

  // Handle section detection on scroll
  useEffect(() => {
    if (isProjectView) return;

    const sections = ['work', 'about', 'stack', 'team', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectView]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'WORK', href: '#projects', id: 'work' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'STACK', href: '#stack', id: 'stack' },
    { name: 'TEAM', href: '#team', id: 'team' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  // Auto-hide when scrolling down, show when scrolling up or at top
  const isHidden = !isAtTop && scrollDirection === 'down' && !isMobileMenuOpen;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAtTop
          ? 'py-6 md:py-8 bg-transparent'
          : 'py-3 md:py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a
          href="#"
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="transition-transform duration-300 group-hover:scale-105">
            <WebBitsLogo className="w-9 h-9" />
          </div>
          <span className="font-space font-extrabold text-lg md:text-xl tracking-tighter text-white">
            WEB<span className="text-cyan-400">⚡</span>BITS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-inner">
          {navLinks.map((link) => (
            <MagneticNavLink
              key={link.name}
              href={link.href}
              name={link.name}
              active={activeSection === link.id}
            />
          ))}
        </nav>

        {/* Right Action: Magnetic "START A PROJECT" CTA */}
        <div className="hidden md:flex items-center">
          <div
            ref={ctaMagnetic.ref}
            onMouseMove={ctaMagnetic.handleMouseMove}
            onMouseLeave={ctaMagnetic.handleMouseLeave}
          >
            <motion.a
              href="#contact"
              animate={{ x: ctaMagnetic.position.x, y: ctaMagnetic.position.y }}
              transition={{ type: 'spring', damping: 15, stiffness: 220 }}
              data-cursor="CONTACT"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-space font-bold text-xs uppercase tracking-wider hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 hover:text-white transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-white bg-white/5 rounded-full border border-white/10 active:scale-95 transition-transform"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050505] z-40 md:hidden flex flex-col justify-between p-8 pt-24"
          >
            <div className="flex flex-col space-y-6 relative z-10">
              <span className="text-cyan-400 text-[10px] font-mono tracking-[0.3em] uppercase">
                // NAVIGATION
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-space font-extrabold text-zinc-300 hover:text-white active:text-cyan-400 flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    0{idx + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 space-y-6">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-space font-bold text-center block tracking-wider uppercase text-sm shadow-[0_0_25px_rgba(37,99,235,0.4)]"
              >
                START A PROJECT →
              </a>

              <div className="flex justify-between items-center text-xs text-zinc-500 font-mono">
                <a href={BRAND.socials.github} target="_blank" rel="noreferrer" className="hover:text-white">
                  GITHUB
                </a>
                <a href={BRAND.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                  INSTAGRAM
                </a>
                <a href={BRAND.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">
                  WHATSAPP
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
