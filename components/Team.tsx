import React, { useRef } from 'react';
import { motion as motionBase, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { TEAM, BRAND } from '../constants';
import { TeamMember } from '../types';

const motion = motionBase as any;

interface SquadMemberCardProps {
  member: TeamMember;
  index: number;
}

const SquadMemberCard: React.FC<SquadMemberCardProps> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D perspective tilt values
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rX = ((y / rect.height) - 0.5) * -12;
    const rY = ((x / rect.width) - 0.5) * 12;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const isLead = index === 0;

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className={`group relative rounded-3xl p-6 sm:p-7 bg-[#0b0d14]/90 border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-full ${
          isLead
            ? 'border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.15)] hover:border-cyan-400'
            : 'border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]'
        }`}
      >
        {/* Top Badges & Status */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-6">
            <span
              className={`font-mono text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md flex items-center gap-1.5 ${
                isLead
                  ? 'text-cyan-300 bg-cyan-950/70 border-cyan-500/30'
                  : 'text-zinc-400 bg-white/[0.04] border-white/10'
              }`}
            >
              <Zap size={11} className={isLead ? 'text-cyan-400 fill-cyan-400' : 'text-zinc-400'} />
              {isLead ? 'NIT RAIPUR // LEAD' : 'CORE SQUAD // ACTIVE'}
            </span>

            <span className="font-mono text-xs text-zinc-500">
              0{index + 1}
            </span>
          </div>

          {/* Member Photo Frame */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-white/10 group-hover:border-cyan-500/40 transition-colors">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover grayscale brightness-90 contrast-105 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            {/* Tech Corner Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-transparent to-transparent opacity-60" />
          </div>

          {/* Identity & Role */}
          <h3 className="text-2xl font-space font-extrabold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-4">
            {member.role}
          </p>

          {/* Bio Description */}
          <p className="text-sm font-light text-zinc-400 leading-relaxed mb-6">
            {member.bio}
          </p>
        </div>

        {/* Footer Social Links */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                aria-label={`${member.name} Github`}
              >
                <Github size={15} />
              </a>
            )}
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin size={15} />
              </a>
            )}
            {member.socials.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor="INSTAGRAM"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-400 hover:bg-pink-500/10 transition-all"
                aria-label={`${member.name} Instagram`}
              >
                <Instagram size={15} />
              </a>
            )}
            {member.socials.twitter && (
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noreferrer"
                data-cursor="TWITTER"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                aria-label={`${member.name} Twitter`}
              >
                <Twitter size={15} />
              </a>
            )}
          </div>

          <a
            href={member.socials.github || member.socials.linkedin || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
          >
            <span>PROFILE</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 md:py-36 bg-transparent relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[200px] pointer-events-none" />

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

        {/* Squad Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM.map((member, idx) => (
            <SquadMemberCard
              key={member.id}
              member={member}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
