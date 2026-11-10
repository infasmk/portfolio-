import React, { useRef, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const motion = motionBase as any;

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onSelect?: (p: Project) => void;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  onSelect,
  compact = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt Values
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const glareX = useSpring(useMotionValue(50), { damping: 20, stiffness: 200 });
  const glareY = useSpring(useMotionValue(50), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / height) - 0.5) * -10;
    const rY = ((mouseX / width) - 0.5) * 10;

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

  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else if (onSelect) {
      onSelect(project);
    }
  };

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
  const formattedTotal = total < 9 ? `0${total}` : `${total}`;

  return (
    <div
      style={{ perspective: 1200 }}
      className={`shrink-0 select-none ${
        compact
          ? 'w-full'
          : 'w-[75vw] sm:w-[55vw] md:w-[44vw] lg:w-[36vw] max-w-xl h-[390px] sm:h-[430px] md:h-[460px] lg:h-[480px]'
      }`}
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
        className="relative w-full h-full rounded-[1.75rem] bg-deep-charcoal border border-white/[0.08] hover:border-copper/50 overflow-hidden cursor-pointer shadow-2xl transition-colors duration-300 group flex flex-col justify-between"
      >
        {/* Dynamic Specular Glare in Ambient Copper */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glareX.get()}% ${glareY.get()}%, rgba(184, 115, 80, 0.20), transparent 70%)`,
          }}
        />

        {/* Project Background Image with subtle zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/20" />
        </div>

        {/* Top Header Overlay */}
        <div className="relative z-20 p-5 md:p-6 flex justify-between items-start">
          <div className="flex flex-wrap items-center gap-2">
            {project.subheading && (
              <span className="text-copper font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-copper/10 border border-copper/30 backdrop-blur-md">
                {project.subheading}
              </span>
            )}
            {project.createdBy && (
              <span className="text-muted-silver font-mono text-[10px] md:text-xs hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-graphite/60 border border-white/5">
                by {project.createdBy}
              </span>
            )}
          </div>

          <div className="font-space font-extrabold text-lg md:text-xl text-graphite-light group-hover:text-copper transition-colors font-mono">
            {formattedIndex} <span className="text-muted-silver/60 text-xs">/ {formattedTotal}</span>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-20 p-5 md:p-6 flex flex-col justify-end">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-space font-extrabold text-warm-ivory tracking-tight mb-2 leading-tight group-hover:text-copper-light transition-colors">
            {project.title}
          </h3>

          <p className="max-w-xl text-muted-silver text-xs md:text-sm leading-relaxed mb-3.5 font-light line-clamp-2">
            {project.description}
          </p>

          {/* Optional Special Features Bullet Points (only shows if provided!) */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-1 mb-3.5 hidden sm:block">
              {project.features.slice(0, 2).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] md:text-xs font-mono text-muted-silver truncate">
                  <span className="text-copper shrink-0">⚡</span>
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Card Action Row: Direct Link Only */}
          <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-white/10">
            <span className="text-[11px] font-mono text-muted-silver/80 hidden sm:inline-block">
              DIRECT ACCESS
            </span>

            <div className="flex items-center gap-2 ml-auto">
              {project.link ? (
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-copper text-obsidian font-space font-extrabold text-xs uppercase tracking-wider group-hover:bg-copper-light transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(184,115,80,0.4)]">
                  <span>VISIT SITE</span>
                  <ArrowUpRight size={14} />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite/60 text-muted-silver font-mono text-xs">
                  <span>PREVIEW</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
