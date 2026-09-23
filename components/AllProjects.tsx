import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import Footer from './Footer';

const motion = motionBase as any;

interface AllProjectsProps {
  onBack: () => void;
  onProjectSelect: (project: Project) => void;
}

export const AllProjects: React.FC<AllProjectsProps> = ({ onBack, onProjectSelect }) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white relative selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* Floating Thumbnail Preview Following Cursor */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x + 30,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
            className="fixed pointer-events-none z-50 hidden lg:block w-72 h-48 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/20"
          >
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
              <span className="text-[10px] font-mono text-cyan-300 uppercase">
                {hoveredProject.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {hoveredProject.year}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 bg-[#050505]/75 backdrop-blur-xl border-b border-white/[0.08] flex justify-between items-center">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
            <ArrowLeft size={16} />
          </div>
          <span>RETURN TO HOME</span>
        </button>

        <span className="font-space font-extrabold text-lg tracking-tight text-white">
          WEB<span className="text-cyan-400">⚡</span>BITS
        </span>

        <span className="text-zinc-500 font-mono text-xs uppercase hidden sm:inline-block">
          ARCHIVE // 0{PROJECTS.length} ENTRIES
        </span>
      </header>

      {/* Hero Title */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-4">
            // COMPREHENSIVE INDEX
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-space font-extrabold tracking-tighter leading-none uppercase">
            SELECTED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-white italic">
              WORK.
            </span>
          </h1>
        </motion.div>

        {/* Editorial Project Rows with Hover Expansion */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {PROJECTS.map((project, idx) => {
            const formattedNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onProjectSelect(project)}
                className="group py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 hover:px-4 hover:bg-white/[0.02]"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="font-mono text-xl md:text-2xl font-bold text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    {formattedNum}
                  </span>
                  <div>
                    <h3 className="text-3xl md:text-5xl font-space font-extrabold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-cyan-200 group-hover:to-blue-400 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-2">
                      {project.category} // {project.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end md:self-center">
                  <div className="hidden lg:flex gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-white/5 text-[10px] font-mono text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
