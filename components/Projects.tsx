
import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

// Fix for framer-motion type issues where initial/animate/exit are not recognized
const motion = motionBase as any;

const ProjectCard: React.FC<{ project: Project; index: number; onSelect: (p: Project) => void }> = ({ project, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative aspect-[3/4] sm:aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900 cursor-pointer"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
      
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <p className="text-blue-500 text-[10px] md:text-sm font-bold tracking-widest uppercase mb-2">
          {project.category}
        </p>
        <h3 className="text-2xl md:text-3xl font-space font-extrabold text-white mb-3 md:mb-4 leading-tight">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-tighter">
              {t}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.8 }}
          className="flex items-center gap-2 text-white font-bold text-xs md:text-sm"
        >
          VIEW CASE STUDY <ArrowRight size={14} className="md:w-4 md:h-4" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 hidden md:block"
          >
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white">
              <ExternalLink size={18} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onBrowseAll, onProjectSelect }) => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="max-w-xl">
            <h2 className="text-blue-500 font-space font-bold tracking-[0.2em] uppercase text-xs mb-4">
              // PORTFOLIO
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold font-space text-white tracking-tighter leading-none">
              SELECTED <br /> <span className="text-zinc-600">PROJECTS</span>
            </h3>
          </div>
          <p className="max-w-xs text-zinc-500 text-base md:text-lg">
            A curated selection of digital experiences that define our craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.slice(0, 4).map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx} 
              onSelect={onProjectSelect}
            />
          ))}
        </div>
        
        <div className="mt-16 md:mt-20 text-center">
          <button 
            onClick={onBrowseAll}
            className="w-full sm:w-auto px-10 py-5 border border-white/10 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all active:scale-95"
          >
            BROWSE ALL WORK
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
