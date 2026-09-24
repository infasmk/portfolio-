import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { ALL_PROJECTS } from '../projects';
import { Project } from '../types';
import Footer from './Footer';

const motion = motionBase as any;

interface AllProjectsProps {
  onBack: () => void;
  onProjectSelect: (project: Project) => void;
}

export const AllProjects: React.FC<AllProjectsProps> = ({ onBack, onProjectSelect }) => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayedProjects = filter === 'featured'
    ? ALL_PROJECTS.filter((p) => p.featured === true)
    : ALL_PROJECTS;

  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-700/10 via-cyan-600/5 to-transparent rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] flex justify-between items-center">
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

        <span className="text-zinc-400 font-mono text-xs uppercase hidden sm:inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CATALOG // {ALL_PROJECTS.length} ENTRIES</span>
        </span>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-32 relative z-10">
        {/* Hero Title & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]"
        >
          <div>
            <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
              // COMPLETE WORKS CATALOG
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-space font-extrabold tracking-tighter leading-none uppercase">
              ALL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-white">PROJECTS.</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-light mt-3 max-w-xl">
              Explore the full index of production platforms, experimental 3D interfaces, and web applications created by the studio.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                filter === 'all'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              ALL ({ALL_PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                filter === 'featured'
                  ? 'bg-cyan-400 text-black font-bold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              FEATURED ({ALL_PROJECTS.filter((p) => p.featured === true).length})
            </button>
          </div>
        </motion.div>

        {/* Card-Type Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => {
            const subheadingText = project.subheading || project.category;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                className="group rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Project Image Banner */}
                  <div
                    onClick={() => onProjectSelect(project)}
                    className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent" />

                    {/* Subheading / Category Badge (Only if provided!) */}
                    {subheadingText && (
                      <span className="absolute top-4 left-4 text-cyan-300 font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md">
                        {subheadingText}
                      </span>
                    )}

                    {/* Featured Star Badge */}
                    {project.featured && (
                      <span className="absolute top-4 right-4 text-amber-300 font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                        <Sparkles size={10} className="fill-amber-300" />
                        <span>FEATURED</span>
                      </span>
                    )}
                  </div>

                  {/* Project Info Content */}
                  <div className="p-6 md:p-7">
                    {/* Created By (Only if provided!) */}
                    {project.createdBy && (
                      <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                        Created by <span className="text-zinc-300">{project.createdBy}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => onProjectSelect(project)}
                      className="text-2xl font-space font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2 cursor-pointer leading-tight"
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Special Feature Points (Only shows if provided!) */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-6 space-y-1.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                          Key Features:
                        </span>
                        {project.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs font-mono text-zinc-300 leading-snug">
                            <span className="text-cyan-400 mt-0.5 shrink-0">⚡</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges (if provided) */}
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 md:px-7 pb-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  {/* Case Study Details Button */}
                  <button
                    onClick={() => onProjectSelect(project)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-space font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={13} />
                  </button>

                  {/* Live Link Button (Only if provided!) */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 text-cyan-300 font-space font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                      title="Open Live Site"
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline">LIVE</span>
                    </a>
                  )}

                  {/* GitHub Repo Button (Only if provided!) */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
                      title="View GitHub Repository"
                      aria-label="GitHub Repo"
                    >
                      <Github size={15} />
                    </a>
                  )}
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
