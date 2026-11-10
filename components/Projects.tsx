import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { FEATURED_PROJECTS } from '../projects';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

const motion = motionBase as any;

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect?: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onProjectSelect,
}) => {
  const projects = FEATURED_PROJECTS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 md:py-40 bg-obsidian/85 backdrop-blur-sm relative overflow-hidden select-none border-t border-white/[0.08]"
    >
      {/* Ambient Copper Lighting Background Auras */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-copper/8 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#8C4E31]/10 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-space font-extrabold text-warm-ivory tracking-tighter uppercase mb-4"
          >
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-ivory via-[#E29875] to-copper">WORKS.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-silver text-sm sm:text-base font-light max-w-2xl leading-relaxed"
          >
            Selected production platforms, audio systems, and creative digital architectures engineered by WEB⚡BITS Studio.
          </motion.p>
        </div>

        {/* Responsive Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="flex"
            >
              <ProjectCard
                project={project}
                index={idx}
                total={projects.length}
                onSelect={onProjectSelect}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
