
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../constants';
import Footer from './Footer';
import { Project } from '../types';

const motion = motionBase as any;

const ArchiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Slow Moving Light Leaks */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/10 blur-[180px] rounded-full"
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-indigo-900/15 blur-[200px] rounded-full"
      />

      {/* Subtle Dust/Shimmer Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [null, "-20%", "20%"],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
          />
        ))}
      </div>
      
      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90" />
    </div>
  );
};

interface AllProjectsProps {
  onBack: () => void;
  onProjectSelect: (project: Project) => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack, onProjectSelect }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative">
      <ArchiveBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
          >
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">Back to Home</span>
          </button>
          
          <div className="text-xl font-bold font-space tracking-tighter">
            Portfolio<span className="text-blue-500">.</span>
          </div>
          
          <div className="hidden md:block">
            <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              Gallery / {PROJECTS.length} Items
            </span>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="pt-40 pb-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-space font-extrabold tracking-tighter leading-none mb-8">
              FULL <br /> <span className="text-zinc-800 italic">ARCHIVE.</span>
            </h1>
            <p className="max-w-xl text-zinc-500 text-lg md:text-xl leading-relaxed">
              Explore our complete collection of digital artifacts, platforms, and interactive experiments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => onProjectSelect(project)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-900 mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div className="p-4 bg-white text-black rounded-full font-bold flex items-center gap-2 shadow-xl">
                      VIEW PROJECT <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
                
                <p className="text-blue-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl font-space font-bold text-white mb-3">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-zinc-500 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllProjects;
