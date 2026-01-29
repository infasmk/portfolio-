
import React, { useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { Project } from '../types';

const motion = motionBase as any;

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-4 md:p-10"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl shadow-blue-500/10 flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
        >
          <X size={24} />
        </button>

        {/* Left Side: Immersive Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.2em] mb-6 uppercase">
              <Zap size={12} /> {project.category}
            </span>
            
            <h2 className="text-4xl md:text-6xl font-space font-extrabold text-white mb-6 leading-none">
              {project.title.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                {project.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map(t => (
                  <span 
                    key={t} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white font-medium hover:border-blue-500/30 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-white/10"
              >
                VISIT LIVE SITE <ExternalLink size={18} />
              </a>
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-bold hover:text-white transition-all flex items-center justify-center gap-2"
              >
                CLOSE <ArrowRight size={16} className="rotate-180" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
