import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { soundManager } from './SoundManager';

const motion = motionBase as any;

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onBrowseAll,
  onProjectSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Vertical scroll translates into horizontal track motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 120,
    restDelta: 0.001
  });

  // Calculate horizontal shift: 4 projects of ~75vw + gaps => around -70% transform
  const x = useTransform(smoothProgress, [0, 1], ['2%', '-68%']);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[320vh] bg-[#050505]"
    >
      {/* Sticky viewport frame that stays pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 md:py-16">
        {/* Background Ambient Atmosphere */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[180px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between sm:items-end gap-4 z-20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 02 SIGNATURE SHOWCASE
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">WORKS.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                if (onBrowseAll) onBrowseAll();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] hover:border-cyan-500/50 hover:bg-white/10 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>ARCHIVE [{PROJECTS.length}]</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Pinned Horizontal Carousel Track */}
        <div className="relative z-10 w-full overflow-visible py-4">
          <motion.div
            style={{ x }}
            className="flex gap-8 md:gap-12 pl-6 md:pl-16 will-change-transform"
          >
            {PROJECTS.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                total={PROJECTS.length}
                onSelect={onProjectSelect}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Scroll Guide Indicator */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center z-20 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCROLL VERTICAL TO PAN HORIZONTALLY</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span>01</span>
            <div className="w-20 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-cyan-400 origin-left"
              />
            </div>
            <span>0{PROJECTS.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
