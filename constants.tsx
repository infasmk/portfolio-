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
    whatsapp: "https://wa.me/919876543210",
    linkedin: "https://linkedin.com/in/infasmk",
  }
};

export { PROJECTS, FEATURED_PROJECTS, ALL_PROJECTS } from './projects';

export const SKILLS = {
  frontend: [
    { name: "React & Next.js", level: 96, category: "frontend" as const, description: "Component architecture, SSR, RSC & high-performance state" },
    { name: "TypeScript", level: 94, category: "frontend" as const, description: "Type safety, generics & design patterns" },
    { name: "Three.js & WebGL", level: 92, category: "frontend" as const, description: "Custom shaders, lighting, 3D scenes & R3F" },
    { name: "Tailwind CSS", level: 98, category: "frontend" as const, description: "Modern design systems, fluid spacing & responsive layouts" },
    { name: "Framer Motion", level: 95, category: "frontend" as const, description: "Kinetic animations, spring physics & layout gestures" },
  ],
  backend: [
    { name: "Node.js & Express", level: 88, category: "backend" as const, description: "Asynchronous APIs, Fastify & microservice architecture" },
    { name: "Python", level: 85, category: "backend" as const, description: "Data automation, AI workflows & algorithmic processing" },
    { name: "PostgreSQL & Prisma", level: 86, category: "backend" as const, description: "Relational data modeling, indexing & query tuning" },
    { name: "REST & GraphQL", level: 90, category: "backend" as const, description: "Type-safe schemas, caching & real-time subscriptions" },
  ],
  tools: [
    { name: "Git & GitHub CI/CD", level: 94, category: "tools" as const, description: "Automated test pipelines, branches & preview deployments" },
    { name: "Figma UI/UX", level: 92, category: "tools" as const, description: "Design systems, auto-layout tokens & rapid prototyping" },
    { name: "Docker & Cloud", level: 82, category: "tools" as const, description: "Containerized environments, Vercel & AWS deployments" },
    { name: "Blender 3D", level: 78, category: "tools" as const, description: "Hard-surface 3D assets, low-poly geometry & glTF pipelines" },
  ]
};

export const MARQUEE_ROW_1 = [
  { text: "CREATIVE TECHNOLOGY", tag: "CORE" },
  { text: "3D WEBGL EXPERIENCES", tag: "THREE.JS" },
  { text: "HIGH-PERFORMANCE WEB", tag: "99.9% CRASH-FREE" },
  { text: "INTERACTIVE UI/UX", tag: "TAILWIND" },
  { text: "NEXT.JS ARCHITECTURES", tag: "FULL-STACK" }
];

export const MARQUEE_ROW_2 = [
  { text: "KINETIC MOTION DESIGN", tag: "FRAMER" },
  { text: "SYSTEM TELEMETRY", tag: "TYPESCRIPT" },
  { text: "SPATIAL INTERFACES", tag: "WEB AUDIO" },
  { text: "MODERN PRODUCT DESIGN", tag: "FIGMA" },
  { text: "PRECISION CODE", tag: "NIT RAIPUR" }
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Infas.mk",
    role: "Founder & Creative Technologist",
    bio: "NIT Raipur engineer sculpting high-performance 3D web platforms and cinematic user experiences.",
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
