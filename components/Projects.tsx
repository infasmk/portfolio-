import React, { useRef, useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, LayoutGrid, Rows } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

const motion = motionBase as any;

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onBrowseAll,
  onProjectSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stream' | 'grid'>('stream');

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - 48,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PROJECTS.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    scrollToIndex(prevIdx);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.6;
    const activeIdx = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(PROJECTS.length - 1, Math.max(0, activeIdx)));
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-blue-700/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 02 SIGNATURE SHOWCASE [{PROJECTS.length} PLATFORMS]
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">WORKS.</span>
            </h2>
          </div>

          {/* Navigation Controls & Layout Toggle */}
          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10">
              <button
                onClick={() => setViewMode('stream')}
                className={`p-2 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'stream' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
                title="Horizontal Stream"
              >
                <Rows size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid Matrix"
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Slider Next / Prev Controls (Active in stream mode) */}
            {viewMode === 'stream' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-cyan-400 hover:text-cyan-400 text-zinc-300 transition-all active:scale-95"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-cyan-400 hover:text-cyan-400 text-zinc-300 transition-all active:scale-95"
                  aria-label="Next project"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Quick Jump Indicator Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
          {PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                if (viewMode !== 'stream') setViewMode('stream');
                scrollToIndex(idx);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 ${
                currentIndex === idx && viewMode === 'stream'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              0{idx + 1} // {p.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Presentation: Stream Carousel vs Grid Matrix */}
      {viewMode === 'stream' ? (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto px-6 md:px-12 pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="snap-center">
              <ProjectCard
                project={project}
                index={idx}
                total={PROJECTS.length}
                onSelect={onProjectSelect}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="h-[520px]">
              <ProjectCard
                project={project}
                index={idx}
                total={PROJECTS.length}
                onSelect={onProjectSelect}
                compact={true}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
