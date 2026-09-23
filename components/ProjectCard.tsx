import React, { useRef, useState } from 'react';
import { motion as motionBase, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { soundManager } from './SoundManager';

const motion = motionBase as any;

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onSelect: (p: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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

    const rX = ((mouseY / height) - 0.5) * -12; // tilt angle
    const rY = ((mouseX / width) - 0.5) * 12;

    rotateX.set(rX);
    rotateY.set(rY);

    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
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
      className="w-[82vw] md:w-[72vw] max-w-5xl h-[68vh] md:h-[72vh] shrink-0"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          soundManager.playWarp();
          onSelect(project);
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="VIEW"
        className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] bg-[#0c0d12] border border-white/10 hover:border-cyan-500/50 overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 group"
      >
        {/* Dynamic Specular Glare following mouse pointer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 400px at ${glareX.get()}% ${glareY.get()}%, rgba(56, 189, 248, 0.15), transparent 70%)`,
          }}
        />

        {/* Project Background Image with subtle parallax zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070a]/90 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Top Header Information Overlay */}
        <div className="relative z-20 p-8 md:p-12 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xs md:text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md">
              {project.category}
            </span>
            {project.year && (
              <span className="text-zinc-500 font-mono text-xs hidden sm:inline-block">
                // {project.year}
              </span>
            )}
          </div>

          <div className="font-space font-extrabold text-2xl md:text-3xl text-zinc-600 group-hover:text-cyan-400 transition-colors font-mono">
            {formattedIndex} <span className="text-zinc-700 text-lg">/ {formattedTotal}</span>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 flex flex-col justify-end">
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter mb-4 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-cyan-200 group-hover:to-blue-400 transition-all">
            {project.title}
          </h3>

          <p className="max-w-2xl text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* View Case Study Pill */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-space font-bold text-xs uppercase tracking-wider group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-lg">
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
