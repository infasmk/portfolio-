import React, { useRef } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

const motion = motionBase as any;

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onProjectSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Vertical scroll translates into right-to-left horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 120,
    restDelta: 0.001
  });

  // 6 projects of ~60vw each: translate from right to left (0% to -78%)
  const x = useTransform(smoothProgress, [0, 1], ['2%', '-78%']);

  // Active project calculation
  const activeIndex = useTransform(smoothProgress, [0, 1], [1, PROJECTS.length]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[340vh] bg-[#050505]"
    >
      {/* Sticky viewport pinned while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 md:py-14">
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/8 rounded-full blur-[200px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-end z-20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 02 SIGNATURE SHOWCASE [06 PLATFORMS]
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">WORKS.</span>
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCROLL DOWN TO ADVANCE PROJECTS</span>
          </div>
        </div>

        {/* Pinned Right-to-Left Horizontal Track for all 6 projects */}
        <div className="relative z-10 w-full overflow-visible py-4">
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-6 md:pl-16 will-change-transform"
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

        {/* Bottom Pinned Progress Guide */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center z-20 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>01</span>
            <div className="w-32 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-left"
              />
            </div>
            <span>0{PROJECTS.length}</span>
          </div>

          <span className="text-zinc-500 hidden sm:inline-block">
            CLICK CARD FOR FULL CASE STUDY
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
