import React, { useRef, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const motion = motionBase as any;

interface ProjectCardProps {
  project: Project;
  index: number;
  total?: number;
  onSelect?: (p: Project) => void;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt Values with Smooth Springs
  const rotateX = useSpring(useMotionValue(0), { damping: 24, stiffness: 220 });
  const rotateY = useSpring(useMotionValue(0), { damping: 24, stiffness: 220 });
  const glareX = useSpring(useMotionValue(50), { damping: 24, stiffness: 220 });
  const glareY = useSpring(useMotionValue(50), { damping: 24, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Subtle, elegant tilt (max 7 degrees)
    const rX = ((mouseY / height) - 0.5) * -7;
    const rY = ((mouseX / width) - 0.5) * 7;

    rotateX.set(rX);
    rotateY.set(rY);

    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked directly on the anchor button, let standard browser behavior handle it
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else if (onSelect) {
      onSelect(project);
    }
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full select-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="VISIT"
        className="relative w-full h-full rounded-3xl bg-deep-charcoal/90 border border-white/[0.08] hover:border-copper/50 overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_35px_rgba(184,115,80,0.18)] transition-all duration-500 group flex flex-col justify-between"
      >
        {/* Dynamic Specular Glare in Ambient Copper */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${glareX.get()}% ${glareY.get()}%, rgba(184, 115, 80, 0.16), transparent 70%)`,
          }}
        />

        {/* Top: 16:9 Thumbnail Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-obsidian">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient vignette at bottom of thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent opacity-80" />

          {/* Floating Category Badge */}
          {project.subheading && (
            <div className="absolute top-4 left-4 z-20">
              <span className="text-copper font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-obsidian/80 border border-copper/30 backdrop-blur-md shadow-sm">
                {project.subheading}
              </span>
            </div>
          )}

          {/* Top-Right Quick Link Icon */}
          <div className="absolute top-4 right-4 z-20">
            <div className="w-8 h-8 rounded-full bg-obsidian/75 border border-white/10 group-hover:border-copper/50 text-muted-silver group-hover:text-copper flex items-center justify-center backdrop-blur-md transition-colors shadow-sm">
              <ExternalLink size={13} />
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4 relative z-20">
          <div>
            <h3 className="text-xl sm:text-2xl font-space font-extrabold text-warm-ivory tracking-tight mb-2 leading-tight group-hover:text-copper-light transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-silver text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Key Feature Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {project.features.slice(0, 2).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-muted-silver/90 truncate">
                  <span className="text-copper font-bold shrink-0">⚡</span>
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Card Action Row: External Link Button */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06] mt-auto">
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-silver/60 uppercase tracking-wider">
              LIVE PRODUCTION
            </span>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-copper text-obsidian font-space font-extrabold text-xs uppercase tracking-wider group-hover:bg-copper-light group-hover:shadow-[0_0_15px_rgba(184,115,80,0.4)] transition-all"
            >
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
