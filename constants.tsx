import { Project, TeamMember } from './types';

export const BRAND = {
  name: "WEB⚡BITS",
  tagline: "BUILDING DIGITAL EXPERIENCES THAT PEOPLE REMEMBER.",
  subline: "We design and build interactive websites, digital products, and experimental 3D experiences.",
  founder: "Infas.mk",
  institution: "NIT Raipur",
  location: "India & Global Remote",
  stats: [
    { label: "Projects Completed", value: "157+", detail: "Across Web, 3D & Mobile" },
    { label: "Global Clients", value: "25+", detail: "Worldwide Collaborations" },
    { label: "Performance Rating", value: "99.9%", detail: "Ultra-fast Core Web Vitals" },
    { label: "Creative Energy", value: "24/7", detail: "Continuous Innovation" }
  ],
  socials: {
    github: "https://github.com/infasmk",
    instagram: "https://instagram.com/infasmk",
    email: "infasmk@gmail.com",
    whatsapp: "https://wa.me/919876543210", // Clean standard WhatsApp link format
    linkedin: "https://linkedin.com/in/infasmk",
  }
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aevo Data Matrix",
    category: "Web Platform & 3D Visualization",
    year: "2024",
    role: "Lead Creative Technologist",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    tech: ["React", "Three.js", "Node.js", "WebGL"],
    description: "A futuristic data visualization engine and trading matrix featuring real-time node telemetry and reactive WebGL topography.",
    challenge: "Rendering dense live telemetry data with zero frame drops while retaining fluid 60fps WebGL camera transitions across viewport sizes.",
    solution: "Engineered instanced buffer geometries and custom GLSL vertex shaders, reducing draw calls by 82% and achieving sub-16ms frame times.",
    result: "Selected for best interactive platform UI, achieving 99.8% crash-free sessions across 120,000 monthly active users.",
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk"
  },
  {
    id: 2,
    title: "Nebula Commerce",
    category: "Immersive E-Commerce",
    year: "2024",
    role: "Full-Stack & 3D Engineer",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
    tech: ["Next.js", "Three.js", "Stripe", "Tailwind CSS"],
    description: "High-end luxury fashion retail experience with interactive 3D product inspection, fabric physics, and zero-latency cart checkout.",
    challenge: "Balancing high-fidelity metallic/fabric materials with low bandwidth usage on mobile devices.",
    solution: "Developed an on-demand Draco compressed glTF loader pipeline with progressive texture streaming and screen-space reflections.",
    result: "Boosted session duration by 140% and improved checkout conversion rate by 34% compared to baseline e-commerce.",
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk"
  },
  {
    id: 3,
    title: "Nova Protocol",
    category: "Web3 / Decentralized Finance",
    year: "2024",
    role: "Frontend Architect",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    tech: ["Solidity", "React", "Ethers.js", "Framer Motion"],
    description: "Automated yield optimization dashboard with holographic smart-contract topology and real-time biometric-inspired wallet authentication.",
    challenge: "Presenting multi-pool liquidity calculations without overwhelming cognitive load or slowing client render cycles.",
    solution: "Designed a spatial UI hierarchy with interactive micro-charts, spring physics, and WebSockets-driven decentralized state updates.",
    result: "Successfully locked $18M+ TVL within 48 hours of mainnet deployment with zero transaction layout glitches.",
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk"
  },
  {
    id: 4,
    title: "Zenith Spatial UI",
    category: "Experimental Interface",
    year: "2024",
    role: "Design Technologist",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    tech: ["React Native", "Three.js", "Framer Motion", "Tailwind"],
    description: "Spatial sound & visual meditation environment focused on responsive fluid simulations and tactile audio-reactive geometries.",
    challenge: "Synthesizing spatial binaural sound and synchronized 3D particle turbulence on low-power devices.",
    solution: "Built a custom lightweight Web Audio oscillator coupled with GPU particle physics running on a dedicated worker thread.",
    result: "Featured across creative design communities with 4.9/5 satisfaction rating across 5,000+ early testers.",
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk"
  }
];

export const SKILLS = {
  frontend: [
    { name: "React / Next.js", level: 96, category: "frontend" as const, description: "Component architecture, SSR, RSC & state management" },
    { name: "TypeScript", level: 92, category: "frontend" as const, description: "Type safety, generics & enterprise design patterns" },
    { name: "Three.js / WebGL", level: 90, category: "frontend" as const, description: "Shaders, custom geometries, R3F & lighting" },
    { name: "Tailwind CSS", level: 98, category: "frontend" as const, description: "Design systems, fluid typography & micro-interactions" },
    { name: "Framer Motion", level: 94, category: "frontend" as const, description: "Spring physics, layout animations & scroll transitions" },
  ],
  backend: [
    { name: "Node.js", level: 88, category: "backend" as const, description: "Express, Fastify, microservices & async APIs" },
    { name: "Python", level: 84, category: "backend" as const, description: "Data automation, AI pipelines & algorithmic scripting" },
    { name: "PostgreSQL / Prisma", level: 86, category: "backend" as const, description: "Relational modeling, indexing & optimization" },
    { name: "GraphQL & REST", level: 89, category: "backend" as const, description: "High-performance data layer & caching" },
  ],
  tools: [
    { name: "Git / CI/CD", level: 92, category: "tools" as const, description: "Version control, automated pipelines & preview deployments" },
    { name: "Figma", level: 94, category: "tools" as const, description: "Design systems, component tokens & interactive prototypes" },
    { name: "Blender", level: 78, category: "tools" as const, description: "3D hard-surface modeling, UV mapping & glTF export" },
    { name: "Docker", level: 80, category: "tools" as const, description: "Containerized environments & reproducible builds" },
  ]
};

export const MARQUEE_ITEMS = [
  "WEB DEVELOPMENT",
  "UI/UX ARCHITECTURE",
  "3D EXPERIENCES",
  "CREATIVE TECHNOLOGY",
  "DIGITAL PRODUCTS",
  "INTERACTIVE DESIGN",
  "WEBGL SHADERS",
  "SYSTEM PERFORMANCE"
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Infas.mk",
    role: "Founder & Creative Technologist",
    bio: "NIT Raipur technologist sculpting high-performance 3D web platforms and cinematic user experiences.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    socials: {
      github: "https://github.com/infasmk",
      linkedin: "https://linkedin.com/in/infasmk",
      instagram: "https://instagram.com/infasmk"
    }
  },
  {
    id: 2,
    name: "Alex Sterling",
    role: "Lead Visual & Motion Designer",
    bio: "Obsessed with pixel-perfect layouts, spatial typography, and tactile spring motion curves.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    socials: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    id: 3,
    name: "Elena Thorne",
    role: "Senior 3D & Graphics Engineer",
    bio: "Turning mathematical shaders and procedural physics into responsive web experiences.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
    socials: { linkedin: "#", github: "#" }
  }
];
