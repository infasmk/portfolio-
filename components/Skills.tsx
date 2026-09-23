import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Terminal, Sparkles, Box, Server, Wrench } from 'lucide-react';
import { SKILLS } from '../constants';
import { soundManager } from './SoundManager';

const motion = motionBase as any;

interface SkillCardProps {
  name: string;
  level: number;
  description: string;
  category: string;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level,
  description,
  category,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Dynamic Specular Hover Highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-space font-bold text-white group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 tabular-nums">
          {level}%
        </span>
      </div>

      <p className="text-zinc-400 text-xs leading-relaxed font-light mb-4">
        {description}
      </p>

      {/* Futuristic Segmented Energy Indicator (Not a generic basic bar) */}
      <div className="flex items-center gap-1">
        {[...Array(10)].map((_, i) => {
          const filled = i < Math.floor(level / 10);
          return (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                filled
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.4)]'
                  : 'bg-white/10'
              }`}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const categories = [
    { id: 'all', label: 'ALL CAPABILITIES', icon: Globe },
    { id: 'frontend', label: 'FRONTEND & 3D', icon: Box },
    { id: 'backend', label: 'BACKEND & DATA', icon: Server },
    { id: 'tools', label: 'TOOLS & PIPELINE', icon: Wrench },
  ];

  const allSkills = [
    ...SKILLS.frontend.map((s, i) => ({ ...s, index: i })),
    ...SKILLS.backend.map((s, i) => ({ ...s, index: i + SKILLS.frontend.length })),
    ...SKILLS.tools.map((s, i) => ({ ...s, index: i + SKILLS.frontend.length + SKILLS.backend.length })),
  ];

  const displayedSkills = activeTab === 'all'
    ? allSkills
    : allSkills.filter((s) => s.category === activeTab);

  return (
    <section id="stack" className="py-28 md:py-36 bg-[#050505] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 03 CORE TECHNOLOGY WALL
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ARSENAL.</span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(cat.id as any);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Capabilities Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                description={skill.description}
                category={skill.category}
                index={skill.index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Architectural Credo */}
        <div className="mt-16 p-8 rounded-3xl bg-white/[0.015] border border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="text-white font-space font-bold text-base">Continuous Benchmarking</h4>
              <p className="text-zinc-500 text-xs font-mono">Profiled via Lighthouse, Chrome DevTools & WebGL Frame Debuggers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
