import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Box, Server, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../constants';

const motion = motionBase as any;

const SkillRow: React.FC<{ name: string; level: number; description: string }> = ({
  name,
  level,
  description,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-300 group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-space font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-[11px] font-bold text-cyan-400 tabular-nums">
          {level}%
        </span>
      </div>

      <p className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-1 mb-2">
        {description}
      </p>

      {/* Mini Segmented Bar */}
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
        />
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="stack" className="py-20 md:py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 03 SYSTEM CAPABILITIES
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ARSENAL.</span>
            </h2>
          </div>

          <p className="text-zinc-400 font-mono text-xs max-w-sm">
            Compact architectural matrix verified across production environments.
          </p>
        </div>

        {/* High-Density 3-Column Studio Matrix (No endless scrolling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Frontend & Spatial 3D */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Box size={18} />
              </div>
              <div>
                <h3 className="text-white font-space font-bold text-base">Frontend & 3D WebGL</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">React, Next.js, Three.js</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {SKILLS.frontend.map((skill) => (
                <SkillRow
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  description={skill.description}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Backend & Data Architecture */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Server size={18} />
              </div>
              <div>
                <h3 className="text-white font-space font-bold text-base">Backend & Systems</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Node.js, Python, PostgreSQL</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {SKILLS.backend.map((skill) => (
                <SkillRow
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  description={skill.description}
                />
              ))}
            </div>
          </div>

          {/* Column 3: DevOps & Tooling */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Wrench size={18} />
              </div>
              <div>
                <h3 className="text-white font-space font-bold text-base">Tooling & Design</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Git, Figma, Docker, Blender</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {SKILLS.tools.map((skill) => (
                <SkillRow
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  description={skill.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
