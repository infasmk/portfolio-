import React, { useRef, useState, useEffect } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(3000);
  const [activeIdx, setActiveIdx] = useState(0);

  // Vertical scroll translates into right-to-left horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 140,
    restDelta: 0.001
  });

  // Calculate exact horizontal travel distance based on track width and viewport
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        const isMobile = viewW < 768;
        const extraPad = isMobile ? 32 : 80;
        const dist = Math.max(0, scrollW - viewW + extraPad);
        setMaxDistance(dist);
      }
    };

    calculateDistance();
    const t = setTimeout(calculateDistance, 400);
    window.addEventListener('resize', calculateDistance);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calculateDistance);
    };
  }, []);

  // Update active project index on scroll
  useEffect(() => {
    return smoothProgress.on('change', (latest: number) => {
      const idx = Math.min(PROJECTS.length - 1, Math.max(0, Math.floor(latest * PROJECTS.length)));
      setActiveIdx(idx);
    });
  }, [smoothProgress]);

  // Translate track from 0 to -maxDistance (full right-to-left travel till 6th project is fully revealed)
  const x = useTransform(smoothProgress, [0, 1], [0, -maxDistance]);

  const handleNext = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollTotal = containerRef.current.offsetHeight - window.innerHeight;
    const nextProgress = Math.min(1, (activeIdx + 1) / (PROJECTS.length - 1));
    window.scrollTo({
      top: containerTop + nextProgress * scrollTotal,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollTotal = containerRef.current.offsetHeight - window.innerHeight;
    const prevProgress = Math.max(0, (activeIdx - 1) / (PROJECTS.length - 1));
    window.scrollTo({
      top: containerTop + prevProgress * scrollTotal,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[460vh] bg-[#050505]"
    >
      {/* Sticky viewport pinned while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-10">
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
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">WORKS.</span>
            </h2>
          </div>

          {/* Quick jump arrows & current index indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">PROJECT</span>
              <span className="text-white font-bold">0{activeIdx + 1}</span>
              <span>/ 0{PROJECTS.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous Project"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIdx === PROJECTS.length - 1}
                aria-label="Next Project"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Right-to-Left Horizontal Track for all 6 projects */}
        <div className="relative z-10 w-full overflow-visible py-2">
          <motion.div
            ref={trackRef}
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
          <div className="flex items-center gap-3">
            <span>01</span>
            <div className="w-36 md:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 origin-left"
              />
            </div>
            <span>0{PROJECTS.length}</span>
          </div>

          <span className="text-zinc-500 hidden sm:inline-block">
            CLICK ANY CARD FOR FULL CASE STUDY
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
