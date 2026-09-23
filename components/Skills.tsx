import React, { useRef, useState, useEffect } from 'react';
import { motion as motionBase, useScroll, useTransform, useSpring } from 'framer-motion';
import { Box, Server, Wrench, Sparkles, Cpu, Layers } from 'lucide-react';
import { SKILLS } from '../constants';

const motion = motionBase as any;

const SkillRow: React.FC<{ name: string; level: number; description: string }> = ({
  name,
  level,
  description,
}) => (
  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all">
    <div className="flex justify-between items-center mb-1">
      <span className="font-space font-bold text-sm text-zinc-200">
        {name}
      </span>
      <span className="font-mono text-[11px] font-bold text-cyan-400 tabular-nums">
        {level}%
      </span>
    </div>
    <p className="text-[11px] font-mono text-zinc-500 mb-2 line-clamp-1">
      {description}
    </p>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <div
        style={{ width: `${level}%` }}
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
      />
    </div>
  </div>
);

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(1800);
  const [activeIdx, setActiveIdx] = useState(0);

  // Vertical scroll translates into left-to-right horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 140,
    restDelta: 0.001,
  });

  // Calculate exact horizontal distance for skills track
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

  // Update active category index
  useEffect(() => {
    return smoothProgress.on('change', (latest: number) => {
      const idx = Math.min(categories.length - 1, Math.max(0, Math.floor(latest * categories.length)));
      setActiveIdx(idx);
    });
  }, [smoothProgress]);

  // Scrolls from left to right: starts shifted left by -maxDistance and moves to 0
  const x = useTransform(smoothProgress, [0, 1], [-maxDistance, 0]);

  const categories = [
    {
      id: 'frontend',
      title: 'Frontend & 3D WebGL',
      subtitle: 'React, Next.js, Three.js, R3F',
      icon: Box,
      color: 'text-cyan-400',
      skills: SKILLS.frontend,
    },
    {
      id: 'backend',
      title: 'Backend & Distributed Systems',
      subtitle: 'Node.js, Python, PostgreSQL, REST',
      icon: Server,
      color: 'text-blue-400',
      skills: SKILLS.backend,
    },
    {
      id: 'tools',
      title: 'Tooling & CI/CD Pipelines',
      subtitle: 'Git, Figma, Docker, Blender',
      icon: Wrench,
      color: 'text-indigo-400',
      skills: SKILLS.tools,
    },
    {
      id: 'architecture',
      title: 'Creative Tech & Shaders',
      subtitle: 'GLSL, Web Audio, Spatial UI',
      icon: Cpu,
      color: 'text-cyan-300',
      skills: [
        { name: "GLSL Vertex & Fragment Shaders", level: 90, description: "Procedural noise, raymarching & post-processing" },
        { name: "Web Audio API", level: 88, description: "Real-time spatial oscillators & audio-reactive physics" },
        { name: "GPU Particle Systems", level: 92, description: "Instanced compute shaders & physics simulation" },
        { name: "Core Web Vitals Tuning", level: 98, description: "Sub-second LCP, 0 CLS, and 60fps frame budgets" },
      ],
    },
  ];

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative h-[360vh] bg-[#050505]"
    >
      {/* Sticky viewport pinned while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 md:py-14">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-700/8 rounded-full blur-[200px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-end z-20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">
                // 03 SYSTEM CAPABILITIES
              </span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white tracking-tighter leading-none">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ARSENAL.</span>
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>LEFT-TO-RIGHT SYSTEM PAN [0{activeIdx + 1} / 0{categories.length}]</span>
          </div>
        </div>

        {/* Pinned Left-to-Right Horizontal Track */}
        <div className="relative z-10 w-full overflow-visible py-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-6 md:pl-16 will-change-transform"
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[38vw] max-w-lg shrink-0 p-6 md:p-8 rounded-3xl bg-[#090b11] border border-white/[0.08] hover:border-cyan-500/40 transition-colors shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-white/[0.04] ${cat.color}`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-space font-bold text-lg">{cat.title}</h3>
                          <span className="text-[11px] font-mono text-zinc-500">{cat.subtitle}</span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-zinc-600 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cat.skills.map((skill) => (
                        <SkillRow
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          description={skill.description}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>ARCHITECTURE MODULE</span>
                    <span className="text-cyan-400 flex items-center gap-1">
                      <Sparkles size={11} /> VERIFIED PRODUCTION
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Pinned Progress Guide */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center z-20 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>01</span>
            <div className="w-32 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
              />
            </div>
            <span>0{categories.length}</span>
          </div>

          <span className="text-zinc-500 hidden sm:inline-block">
            CONTINUE SCROLLING TO MEET THE SQUAD
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
