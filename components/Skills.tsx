
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { SKILLS } from '../constants';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const SkillItem: React.FC<{ name: string; level: number; delay: number }> = ({ name, level, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center text-xs md:text-sm">
        <span className="text-zinc-300 font-semibold tracking-wide">{name}</span>
        <span className="text-blue-500 font-bold tabular-nums">{level}%</span>
      </div>
      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full bg-blue-600"
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-zinc-950/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-white mb-6"
          >
            CORE CAPABILITIES
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-16 bg-blue-600 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Frontend */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              FRONTEND
            </h3>
            <div className="space-y-6 md:space-y-8">
              {SKILLS.frontend.map((skill, idx) => (
                <SkillItem key={skill.name} {...skill} delay={idx * 0.05} />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              BACKEND
            </h3>
            <div className="space-y-6 md:space-y-8">
              {SKILLS.backend.map((skill, idx) => (
                <SkillItem key={skill.name} {...skill} delay={idx * 0.05 + 0.2} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-zinc-500 rounded-full" />
              DESIGN & TOOLS
            </h3>
            <div className="space-y-6 md:space-y-8">
              {SKILLS.tools.map((skill, idx) => (
                <SkillItem key={skill.name} {...skill} delay={idx * 0.05 + 0.4} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
