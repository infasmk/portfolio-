import React, { useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';
import { X, ExternalLink, ArrowLeft, Github, Calendar, Layers, Trophy, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

const motion = motionBase as any;

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[10002] overflow-y-auto bg-[#050505] text-white selection:bg-cyan-500/30"
    >
      {/* Fixed Sticky Header for Detail View */}
      <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <button
          onClick={onClose}
          className="group flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
            <ArrowLeft size={16} />
          </div>
          <span>RETURN TO WORK</span>
        </button>

        <span className="font-space font-extrabold text-sm tracking-tight text-white hidden sm:inline-block">
          WEB<span className="text-cyan-400">⚡</span>BITS // CASE STUDY
        </span>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close Case Study"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Project Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
              {project.category}
            </span>
            {project.year && (
              <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
                <Calendar size={13} /> {project.year}
              </span>
            )}
            {project.role && (
              <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
                <Layers size={13} /> {project.role}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-space font-extrabold text-white tracking-tighter leading-tight mb-8">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all"
              >
                <span>OPEN LIVE EXPERIENCE</span>
                <ExternalLink size={15} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:border-white/30 transition-all"
              >
                <Github size={15} />
                <span>SOURCE REPO</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Visual Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 mb-16 shadow-2xl"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Structured Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Case Study Flow */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                // 01 ARCHITECTURAL OVERVIEW
              </h3>
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* The Challenge */}
            {project.challenge && (
              <section className="space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                  // 02 THE ENGINEERING CHALLENGE
                </h3>
                <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed">
                  {project.challenge}
                </p>
              </section>
            )}

            {/* The Solution */}
            {project.solution && (
              <section className="space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h3 className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                  // 03 OUR STRATEGIC SOLUTION
                </h3>
                <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed">
                  {project.solution}
                </p>
              </section>
            )}

            {/* The Measurable Result */}
            {project.result && (
              <section className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Trophy size={16} />
                  <h3 className="text-xs font-mono font-bold tracking-[0.25em] uppercase">
                    // 04 MEASURABLE OUTCOMES
                  </h3>
                </div>
                <p className="text-white text-base md:text-lg font-light leading-relaxed">
                  {project.result}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  CLIENT / SECTOR
                </span>
                <p className="text-white font-space font-bold text-base">{project.category}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  DISCIPLINES INVOLVED
                </span>
                <p className="text-zinc-300 font-mono text-xs">{project.role || 'Full-Stack Creative Tech'}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                  TECHNOLOGY ARSENAL
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 font-space font-bold text-xs uppercase tracking-wider transition-all"
            >
              CLOSE CASE STUDY [ESC]
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
