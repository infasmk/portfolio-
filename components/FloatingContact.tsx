import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Instagram, Github, Linkedin, X } from 'lucide-react';
import { BRAND } from '../constants';

const motion = motionBase as any;

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${BRAND.socials.email}`,
      color: 'hover:bg-copper/20 hover:text-copper-light',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: BRAND.socials.github,
      color: 'hover:bg-graphite hover:text-warm-ivory',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: BRAND.socials.instagram,
      color: 'hover:bg-copper/20 hover:text-copper-light',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: BRAND.socials.linkedin,
      color: 'hover:bg-copper/20 hover:text-copper-light',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Expanded Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 p-2 rounded-2xl bg-deep-charcoal/95 border border-white/[0.08] backdrop-blur-xl shadow-2xl"
          >
            {contactLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-muted-silver text-xs font-mono tracking-wider transition-all ${item.color}`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Contact"
        className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-br from-copper-dark via-copper to-copper-light text-obsidian shadow-[0_0_20px_rgba(184,115,80,0.4)] hover:shadow-[0_0_30px_rgba(184,115,80,0.7)] hover:scale-105 active:scale-95 transition-all border border-copper-light/40 flex items-center justify-center cursor-pointer"
      >
        {isOpen ? <X size={20} className="text-obsidian" /> : <Zap size={20} className="fill-obsidian text-obsidian" />}
      </button>
    </div>
  );
};

export default FloatingContact;
