import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { TEAM, BRAND } from '../constants';
import ProfileCard from './ProfileCard';

const motion = motionBase as any;

export const Team: React.FC = () => {
  const getContactLink = (name: string) => {
    if (name.includes('Infas')) {
      return BRAND.socials.github;
    }
    return BRAND.socials.linkedin;
  };

  return (
    <section id="team" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden">
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

        {/* Squad Grid with React Bits ProfileCard Component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex justify-center"
            >
              <ProfileCard
                name={member.name}
                title={member.role}
                handle={member.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
                status={idx === 0 ? "NIT Raipur // Lead" : "Core Squad // Active"}
                contactText="Profile ↗"
                avatarUrl={member.image}
                miniAvatarUrl={member.image}
                showUserInfo={true}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor={idx === 0 ? "rgba(34, 211, 238, 0.6)" : "rgba(59, 130, 246, 0.5)"}
                innerGradient={
                  idx === 0
                    ? "linear-gradient(145deg,rgba(37,99,235,0.25) 0%,rgba(6,182,212,0.18) 100%)"
                    : "linear-gradient(145deg,rgba(15,23,42,0.6) 0%,rgba(30,41,59,0.3) 100%)"
                }
                onContactClick={() => window.open(getContactLink(member.name), '_blank')}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
