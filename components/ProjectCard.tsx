import React, { useRef, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const motion = motionBase as any;

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onSelect: (p: Project) => void;
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

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
  const formattedTotal = total < 9 ? `0${total}` : `${total}`;

  return (
    <div
      style={{ perspective: 1200 }}
      className={`shrink-0 select-none ${
        compact
          ? 'w-full'
          : 'w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-3xl h-[460px] sm:h-[520px] md:h-[580px] lg:h-[600px]'
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="VIEW"
        className="relative w-full h-full rounded-[2rem] bg-[#0b0d13] border border-white/10 hover:border-cyan-500/50 overflow-hidden cursor-pointer shadow-2xl transition-colors duration-300 group flex flex-col justify-between"
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glareX.get()}% ${glareY.get()}%, rgba(56, 189, 248, 0.15), transparent 70%)`,
          }}
        />

        {/* Project Background Image with subtle zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/70 to-[#06070a]/20" />
        </div>

        {/* Top Header Information Overlay */}
        <div className="relative z-20 p-6 md:p-8 flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <span className="text-cyan-400 font-mono text-[11px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 backdrop-blur-md">
              {project.category}
            </span>
            {project.year && (
              <span className="text-zinc-400 font-mono text-xs hidden sm:inline-block">
                // {project.year}
              </span>
            )}
          </div>

          <div className="font-space font-extrabold text-xl md:text-2xl text-zinc-500 group-hover:text-cyan-400 transition-colors font-mono">
            {formattedIndex} <span className="text-zinc-600 text-sm">/ {formattedTotal}</span>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-space font-extrabold text-white tracking-tight mb-3 leading-none group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="max-w-xl text-zinc-300 text-xs md:text-sm leading-relaxed mb-6 font-light line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono text-zinc-300 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* View Case Study Pill */}
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-space font-bold text-xs uppercase tracking-wider group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-md">
              <span>CASE STUDY</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
