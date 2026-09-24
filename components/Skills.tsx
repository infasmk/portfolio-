import React from 'react';
import LogoLoop, { LogoItem } from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiThreedotjs,
  SiWebgl,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiVite,
  SiDocker,
  SiGraphql,
  SiBlender,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiGithub,
  SiVercel,
  SiSupabase,
  SiOpengl,
  SiRust
} from 'react-icons/si';

const TECH_LOGOS_ROW_1: LogoItem[] = [
  { node: <SiReact className="text-zinc-400 hover:text-[#61DAFB] transition-colors duration-300" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-zinc-400 hover:text-white transition-colors duration-300" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-zinc-400 hover:text-[#3178C6] transition-colors duration-300" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiThreedotjs className="text-zinc-400 hover:text-white transition-colors duration-300" />, title: "Three.js", href: "https://threejs.org" },
  { node: <SiWebgl className="text-zinc-400 hover:text-[#990000] transition-colors duration-300" />, title: "WebGL", href: "https://www.khronos.org/webgl" },
  { node: <SiTailwindcss className="text-zinc-400 hover:text-[#06B6D4] transition-colors duration-300" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiVite className="text-zinc-400 hover:text-[#646CFF] transition-colors duration-300" />, title: "Vite", href: "https://vite.dev" },
  { node: <SiJavascript className="text-zinc-400 hover:text-[#F7DF1E] transition-colors duration-300" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiBlender className="text-zinc-400 hover:text-[#E87D0D] transition-colors duration-300" />, title: "Blender 3D", href: "https://www.blender.org" },
  { node: <SiFigma className="text-zinc-400 hover:text-[#F24E1E] transition-colors duration-300" />, title: "Figma", href: "https://figma.com" },
];

const TECH_LOGOS_ROW_2: LogoItem[] = [
  { node: <SiNodedotjs className="text-zinc-400 hover:text-[#5FA04E] transition-colors duration-300" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython className="text-zinc-400 hover:text-[#3776AB] transition-colors duration-300" />, title: "Python", href: "https://www.python.org" },
  { node: <SiPostgresql className="text-zinc-400 hover:text-[#4169E1] transition-colors duration-300" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiDocker className="text-zinc-400 hover:text-[#2496ED] transition-colors duration-300" />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGraphql className="text-zinc-400 hover:text-[#E10098] transition-colors duration-300" />, title: "GraphQL", href: "https://graphql.org" },
  { node: <SiSupabase className="text-zinc-400 hover:text-[#3ECF8E] transition-colors duration-300" />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiVercel className="text-zinc-400 hover:text-white transition-colors duration-300" />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiOpengl className="text-zinc-400 hover:text-[#5586A4] transition-colors duration-300" />, title: "OpenGL", href: "https://www.opengl.org" },
  { node: <SiRust className="text-zinc-400 hover:text-[#DEA584] transition-colors duration-300" />, title: "Rust", href: "https://www.rust-lang.org" },
  { node: <SiGithub className="text-zinc-400 hover:text-white transition-colors duration-300" />, title: "GitHub", href: "https://github.com" },
  { node: <SiMongodb className="text-zinc-400 hover:text-[#47A248] transition-colors duration-300" />, title: "MongoDB", href: "https://www.mongodb.com" },
];

export const Skills: React.FC = () => {
  return (
    <section id="stack" className="py-20 md:py-28 bg-[#050505] relative overflow-hidden select-none border-t border-white/[0.06]">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-700/8 via-cyan-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>// CORE TECHNOLOGIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-white tracking-tight">
          POWERED BY MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ECOSYSTEMS.</span>
        </h2>
      </div>

      {/* Dual-Direction Logo Loops — Just Pure Logos */}
      <div className="space-y-10 relative z-10">
        {/* Row 1: Scrolling Left */}
        <LogoLoop
          logos={TECH_LOGOS_ROW_1}
          speed={65}
          direction="left"
          logoHeight={44}
          gap={56}
          hoverSpeed={15}
          scaleOnHover
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Frontend and 3D technologies"
        />

        {/* Row 2: Scrolling Right */}
        <LogoLoop
          logos={TECH_LOGOS_ROW_2}
          speed={55}
          direction="right"
          logoHeight={44}
          gap={56}
          hoverSpeed={15}
          scaleOnHover
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Backend and architecture technologies"
        />
      </div>
    </section>
  );
};

export default Skills;
