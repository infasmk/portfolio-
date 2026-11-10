import React, { useRef, useState, useEffect } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';
import { FEATURED_PROJECTS, ALL_PROJECTS } from '../projects';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

const motion = motionBase as any;

interface ProjectsProps {
  onBrowseAll?: () => void;
  onProjectSelect?: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onBrowseAll,
  onProjectSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(3000);
  const [activeIdx, setActiveIdx] = useState(0);

  // Pinned projects list (first 6 featured projects configured in projects.ts)
  const featuredList = FEATURED_PROJECTS;

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
  }, [featuredList.length]);

  // Update active project index on scroll
  useEffect(() => {
    return smoothProgress.on('change', (latest: number) => {
      const idx = Math.min(featuredList.length - 1, Math.max(0, Math.floor(latest * featuredList.length)));
      setActiveIdx(idx);
    });
  }, [smoothProgress, featuredList.length]);

  // Translate track from 0 to -maxDistance (full right-to-left travel till end)
  const x = useTransform(smoothProgress, [0, 1], [0, -maxDistance]);

  const handleNext = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollTotal = containerRef.current.offsetHeight - window.innerHeight;
    const nextProgress = Math.min(1, (activeIdx + 1) / (featuredList.length - 1));
    window.scrollTo({
      top: containerTop + nextProgress * scrollTotal,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollTotal = containerRef.current.offsetHeight - window.innerHeight;
    const prevProgress = Math.max(0, (activeIdx - 1) / (featuredList.length - 1));
    window.scrollTo({
      top: containerTop + prevProgress * scrollTotal,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative h-[460vh] bg-obsidian/80 backdrop-blur-sm"
    >
      {/* Sticky viewport pinned while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-10">
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-copper/8 rounded-full blur-[200px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-end z-20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-copper font-mono text-xs tracking-[0.3em] uppercase font-bold">
                // 02 SIGNATURE SHOWCASE [{featuredList.length < 10 ? `0${featuredList.length}` : featuredList.length} PLATFORMS]
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-space font-extrabold text-warm-ivory tracking-tighter leading-none">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-ivory via-[#E29875] to-copper">WORKS.</span>
            </h2>
          </div>

          {/* Quick jump arrows, All Projects button & current index indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Prominent Button to Show All Projects */}
            {onBrowseAll && (
              <button
                onClick={onBrowseAll}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-charcoal border border-white/10 hover:border-copper/50 text-warm-ivory font-space font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <Grid size={13} className="text-copper" />
                <span>ALL PROJECTS ({ALL_PROJECTS.length})</span>
                <ArrowRight size={13} className="text-copper" />
              </button>
            )}

            <div className="flex items-center gap-2 font-mono text-xs text-muted-silver">
              <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
              <span className="hidden md:inline">FEATURED</span>
              <span className="text-warm-ivory font-bold">0{activeIdx + 1}</span>
              <span>/ 0{featuredList.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous Project"
                className="w-8 h-8 rounded-full bg-deep-charcoal border border-white/10 flex items-center justify-center text-muted-silver hover:text-warm-ivory hover:border-copper transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIdx === featuredList.length - 1}
                aria-label="Next Project"
                className="w-8 h-8 rounded-full bg-deep-charcoal border border-white/10 flex items-center justify-center text-muted-silver hover:text-warm-ivory hover:border-copper transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Right-to-Left Horizontal Track for featured projects */}
        <div className="relative z-10 w-full overflow-visible py-2">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-6 md:pl-16 will-change-transform items-center"
          >
            {featuredList.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                total={featuredList.length}
                onSelect={onProjectSelect}
              />
            ))}

            {/* Terminal Card at end of track to explore full archive */}
            {onBrowseAll && (
              <div
                onClick={onBrowseAll}
                className="shrink-0 w-[75vw] sm:w-[50vw] md:w-[34vw] max-w-md h-[390px] sm:h-[430px] md:h-[460px] lg:h-[480px] rounded-[1.75rem] bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#080808] border border-copper/30 hover:border-copper p-7 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 group hover:shadow-[0_0_35px_rgba(184,115,80,0.25)] select-none mr-12"
              >
                <div className="flex justify-between items-center">
                  <span className="text-copper font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-copper/10 border border-copper/30">
                    COMPLETE CATALOG
                  </span>
                  <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-copper group-hover:text-obsidian transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-space font-extrabold text-warm-ivory tracking-tight mb-2 group-hover:text-copper-light transition-colors">
                    EXPLORE ALL PROJECTS
                  </h3>
                  <p className="text-muted-silver text-xs sm:text-sm font-light leading-relaxed mb-5">
                    Browse the full index of {ALL_PROJECTS.length} commercial web platforms, experimental 3D engines, and spatial interfaces.
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-copper-dark via-copper to-copper-light text-obsidian font-space font-extrabold text-xs uppercase tracking-wider group-hover:shadow-[0_0_20px_rgba(184,115,80,0.4)] transition-all">
                    <span>VIEW FULL ARCHIVE ({ALL_PROJECTS.length})</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Pinned Progress Guide */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center z-20 text-xs font-mono text-muted-silver/60">
          <div className="flex items-center gap-3">
            <span>01</span>
            <div className="w-36 md:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gradient-to-r from-copper-dark via-copper to-copper-light origin-left"
              />
            </div>
            <span>0{featuredList.length}</span>
          </div>

          {/* Mobile All Projects Quick Button */}
          {onBrowseAll && (
            <button
              onClick={onBrowseAll}
              className="sm:hidden text-copper hover:text-copper-light font-space font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>ALL PROJECTS ({ALL_PROJECTS.length})</span>
              <ArrowRight size={13} />
            </button>
          )}

          <span className="text-muted-silver/70 hidden sm:inline-block">
            CLICK ANY CARD TO VISIT LIVE WEBSITE ↗
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
