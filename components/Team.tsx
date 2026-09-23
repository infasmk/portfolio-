import React, { useRef, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';
import { Twitter, Linkedin, Github, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { TEAM } from '../constants';
import { TeamMember } from '../types';

const motion = motionBase as any;

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt on hover
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = ((mouseY / rect.height) - 0.5) * -12;
    const rY = ((mouseX / rect.width) - 0.5) * 12;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-500/50 p-6 md:p-8 transition-colors duration-500 overflow-hidden cursor-pointer shadow-xl"
      >
        {/* Animated Background Accent Glow */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? 0.35 : 0,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Large Portrait Image with Cinematic Reveals */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-6 bg-zinc-900">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />

          {/* Staggered Social Icons Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex gap-2">
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-cyan-500 hover:text-black transition-all"
                  title="GitHub"
                >
                  <Github size={15} />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-cyan-500 hover:text-black transition-all"
                  title="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
              {member.socials.instagram && (
                <a
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-cyan-500 hover:text-black transition-all"
                  title="Instagram"
                >
                  <Instagram size={15} />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-cyan-500 hover:text-black transition-all"
                  title="Twitter"
                >
                  <Twitter size={15} />
                </a>
              )}
            </div>

            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-cyan-500/30">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Member Details */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-space font-extrabold text-white mb-1 group-hover:text-cyan-300 transition-colors">
              {member.name}
            </h4>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
              {member.role}
            </p>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
              {member.bio}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
            <span>WEB⚡BITS STUDIO</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 04 COLLECTIVE MINDS
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">SQUAD.</span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm md:text-base font-light">
            Engineers, creative developers, and motion designers crafting tomorrow's web standards together.
          </p>
        </div>

        {/* 3D Animated Squad Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
