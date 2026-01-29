
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { TEAM } from '../constants';
import { TeamMember } from '../types';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-4 left-4 flex gap-2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {member.socials.twitter && (
            <a href={member.socials.twitter} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-blue-500 transition-colors">
              <Twitter size={16} />
            </a>
          )}
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-blue-500 transition-colors">
              <Linkedin size={16} />
            </a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-blue-500 transition-colors">
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
      
      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{member.name}</h4>
      <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">{member.role}</p>
      <p className="text-zinc-500 text-sm line-clamp-2">{member.bio}</p>
    </motion.div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-zinc-950/30">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-zinc-500 font-space font-medium tracking-widest uppercase text-sm mb-4">
            // THE SQUAD
          </h2>
          <h3 className="text-5xl md:text-6xl font-bold font-space text-white">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">MINDS</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {TEAM.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
