import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Box, Server, Wrench, Cpu, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../constants';

const motion = motionBase as any;

type Category = 'all' | 'frontend' | 'backend' | 'tools' | 'architecture';

interface SkillItem {
  name: string;
  level: number;
  category: Category;
  description: string;
  tag?: string;
}

const ALL_SKILLS: SkillItem[] = [
  ...SKILLS.frontend.map(s => ({ ...s, tag: 'UI / 3D' })),
  ...SKILLS.backend.map(s => ({ ...s, tag: 'CLOUD' })),
  ...SKILLS.tools.map(s => ({ ...s, tag: 'DEVOPS' })),
  {
    name: 'GLSL Shaders',
    level: 90,
    category: 'architecture' as const,
    description: 'Procedural noise, raymarching & post-processing filters',
    tag: 'GRAPHICS'
  },
  {
    name: 'Web Audio API',
    level: 88,
    category: 'architecture' as const,
    description: 'Real-time spatial oscillators & audio-reactive physics',
    tag: 'SPATIAL'
  },
  {
    name: 'GPU Particle Systems',
    level: 92,
    category: 'architecture' as const,
    description: 'Instanced compute shaders & physics simulation',
    tag: 'COMPUTE'
  },
  {
    name: 'Core Web Vitals',
    level: 98,
    category: 'architecture' as const,
    description: 'Sub-second LCP, 0 CLS, and 60fps frame budgets',
    tag: 'PERF'
  }
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const tabs = [
    { id: 'all' as Category, label: 'ALL ARSENAL', count: ALL_SKILLS.length },
    { id: 'frontend' as Category, label: 'FRONTEND & 3D', count: SKILLS.frontend.length },
    { id: 'backend' as Category, label: 'BACKEND & DATA', count: SKILLS.backend.length },
    { id: 'tools' as Category, label: 'TOOLING & DEVOPS', count: SKILLS.tools.length },
    { id: 'architecture' as Category, label: 'SHADERS & AUDIO', count: 4 },
  ];

  const filteredSkills = activeTab === 'all'
    ? ALL_SKILLS
    : ALL_SKILLS.filter(skill => skill.category === activeTab);

  const getTagColor = (cat: Category) => {
    switch (cat) {
      case 'frontend':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30';
      case 'backend':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/30';
      case 'tools':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30';
      case 'architecture':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      default:
        return 'text-zinc-400 bg-white/[0.04] border-white/10';
    }
  };

  return (
    <section id="stack" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden select-none">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-700/8 via-cyan-600/5 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 03 SYSTEM CAPABILITIES
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ARSENAL.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>PRODUCTION VERIFIED ARCHITECTURES // NIT RAIPUR</span>
          </div>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.06]">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-white bg-white/[0.08] border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                  isActive ? 'bg-cyan-400 text-black' : 'bg-white/10 text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Grid Matrix of Tech Stack */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Category Tag & Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTagColor(skill.category)}`}>
                      {skill.tag || skill.category}
                    </span>

                    <span className="font-mono text-xs font-bold text-cyan-400 tabular-nums">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-space font-bold text-base text-zinc-100 group-hover:text-cyan-300 transition-colors mb-1">
                    {skill.name}
                  </h3>
                  <p className="font-mono text-[11px] text-zinc-500 leading-relaxed mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                {/* Minimalist Micro Progress Bar */}
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Minimal Bottom Telemetry Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-space font-extrabold text-xl text-white block mb-0.5">17+</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Production Stacks</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-space font-extrabold text-xl text-cyan-400 block mb-0.5">60 FPS</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">GPU Frame Budget</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-space font-extrabold text-xl text-blue-400 block mb-0.5">100%</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Type Safety (TS)</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="font-space font-extrabold text-xl text-indigo-400 block mb-0.5">&lt; 800MS</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Optimized LCP</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
