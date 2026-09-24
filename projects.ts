import { Project } from './types';

/**
 * =======================================================================
 * ⚡ WEB⚡BITS — PROJECT CONFIGURATION FILE
 * =======================================================================
 * How to add or edit a project:
 * 1. To add a new project, copy the template below and paste it into the PROJECTS list.
 * 2. Set `featured: true` on up to 6 projects to show them on the home screen!
 * 3. All projects (featured or not) will appear in the "ALL PROJECTS" archive.
 * 4. Fields like `features`, `subheading`, `createdBy`, `link`, `github` are optional;
 *    if you leave them empty or don't include them, they simply won't show up!
 *
 * TEMPLATE:
 * {
 *   id: 7,
 *   title: "My New Project",
 *   subheading: "Interactive Web Experience",     // (Optional)
 *   createdBy: "Infas.mk",                       // (Optional)
 *   image: "https://images.unsplash.com/...",    // Cover image URL
 *   description: "A summary of what this project is and does.",
 *   features: [                                  // (Optional) Bullet feature points
 *     "High-performance 60FPS fluid physics",
 *     "Custom WebGL shader pipelines",
 *     "Full responsive design for mobile & desktop"
 *   ],
 *   link: "https://my-live-site.com",            // (Optional) Live site URL
 *   github: "https://github.com/...",            // (Optional) GitHub repo URL
 *   featured: true,                              // Set to true to show on the main home screen (first 6)
 *   tech: ["React", "Three.js", "Tailwind CSS"], // (Optional) Tech chips
 *   year: "2024",                                // (Optional) Year
 *   role: "Lead Creative Technologist"           // (Optional) Role
 * }
 * =======================================================================
 */

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aevo Data Matrix",
    subheading: "Web Platform & 3D Visualization",
    category: "Web Platform & 3D Visualization",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Lead Creative Technologist",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    description: "A futuristic data visualization engine and trading matrix featuring real-time node telemetry and reactive WebGL topography.",
    features: [
      "Instanced buffer geometries reducing draw calls by 82%",
      "Sub-16ms frame times under high data loads",
      "Dynamic camera transitions calibrated across all screen sizes",
      "Real-time WebSockets integration for instantaneous price feeds"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["React", "Three.js", "Node.js", "WebGL"],
    challenge: "Rendering dense live telemetry data with zero frame drops while retaining fluid 60fps WebGL camera transitions across viewport sizes.",
    solution: "Engineered instanced buffer geometries and custom GLSL vertex shaders, reducing draw calls by 82% and achieving sub-16ms frame times.",
    result: "Selected for best interactive platform UI, achieving 99.8% crash-free sessions across 120,000 monthly active users."
  },
  {
    id: 2,
    title: "Nebula Commerce",
    subheading: "Immersive 3D E-Commerce",
    category: "Immersive E-Commerce",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Full-Stack & 3D Engineer",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
    description: "High-end luxury fashion retail experience with interactive 3D product inspection, fabric physics, and zero-latency cart checkout.",
    features: [
      "On-demand Draco compressed glTF loader pipeline",
      "Screen-space reflections and physically-based material shaders",
      "140% boost in user session duration and 34% checkout conversion gain"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["Next.js", "Three.js", "Stripe", "Tailwind CSS"],
    challenge: "Balancing high-fidelity metallic/fabric materials with low bandwidth usage on mobile devices.",
    solution: "Developed an on-demand Draco compressed glTF loader pipeline with progressive texture streaming and screen-space reflections.",
    result: "Boosted session duration by 140% and improved checkout conversion rate by 34% compared to baseline e-commerce."
  },
  {
    id: 3,
    title: "Nova Protocol",
    subheading: "Decentralized Finance & Spatial UI",
    category: "Web3 / Decentralized Finance",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Frontend Architect",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    description: "Automated yield optimization dashboard with holographic smart-contract topology and real-time biometric-inspired wallet authentication.",
    features: [
      "Interactive micro-charts and kinetic spring physics",
      "WebSockets decentralized state synchronization",
      "Locked $18M+ TVL within 48 hours of mainnet deployment"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["Solidity", "React", "Ethers.js", "Framer Motion"],
    challenge: "Presenting multi-pool liquidity calculations without overwhelming cognitive load or slowing client render cycles.",
    solution: "Designed a spatial UI hierarchy with interactive micro-charts, spring physics, and WebSockets-driven decentralized state updates.",
    result: "Successfully locked $18M+ TVL within 48 hours of mainnet deployment with zero transaction layout glitches."
  },
  {
    id: 4,
    title: "Zenith Spatial UI",
    subheading: "Experimental Spatial Interface",
    category: "Experimental Interface",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Creative Director & Shader Dev",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    description: "A spatial operating concept exploring depth perception, dynamic light refraction, and gyroscopic orientation on modern web viewports.",
    features: [
      "Custom WebGL refraction shaders mimicking optical glass",
      "Kinetic drag-and-snap window physics with zero CPU lag",
      "Honored with Site of the Day in international creative tech review"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["GLSL", "Three.js", "Web Audio API", "TypeScript"],
    challenge: "Simulating volumetric frosted acrylic and caustics in real time without exceeding the 16.6ms GPU frame budget.",
    solution: "Wrote lightweight screen-space blur approximations and mipmap lod sampling inside a single render pass.",
    result: "Honored with Site of the Day in international creative tech review with over 450,000 live interactive sessions."
  },
  {
    id: 5,
    title: "Krypton Engine",
    subheading: "Cloud Infrastructure Console",
    category: "Developer Tooling",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2023",
    role: "Systems Designer",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    description: "Real-time edge server telemetry console with distributed tracing visualizations and predictive anomaly detection alerts.",
    features: [
      "Virtual rendering grid supporting 50,000+ simultaneous log nodes",
      "Instantaneous filtering with sub-5ms search indexing",
      "Adopted by 40+ engineering teams worldwide"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["Go", "React", "WebSockets", "Docker"],
    challenge: "Streaming and rendering 50,000 simultaneous telemetry log nodes without blocking the main browser thread.",
    solution: "Offloaded log ingestion to a dedicated Web Worker thread and virtualized the DOM display grid using offscreen canvases.",
    result: "Adopted by 40+ enterprise teams, cutting mean-time-to-detection (MTTD) for microservice incidents by 68%."
  },
  {
    id: 6,
    title: "Vortex Soundscape",
    subheading: "Audio-Reactive Spatial Experience",
    category: "Audiovisual Production",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2023",
    role: "Audio/Visual Technologist",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    description: "An audiovisual web synth that transforms user cursor dynamics and microphone input into blooming kinetic 3D fractal sculptures.",
    features: [
      "Fast Fourier Transform (FFT) analysis via Web Audio API",
      "Audio-reactive vertex displacement across 200,000 vertices",
      "Featured across generative art galleries"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: true,
    tech: ["Web Audio API", "Three.js", "GLSL", "React"],
    challenge: "Synchronizing high-frequency audio spectrum analysis with particle vertex displacement without jitter or audio crackling.",
    solution: "Bound AnalyserNode frequency byte arrays directly to WebGL uniform buffers via Float32Array references.",
    result: "Exhibited in 3 virtual generative art galleries and streamed by 80,000+ unique sound enthusiasts."
  },
  {
    id: 7,
    title: "Apex Sentinel",
    subheading: "Cybersecurity Threat Matrix",
    category: "Cybersecurity & Analytics",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Full-Stack Security Architect",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    description: "Enterprise threat mitigation dashboard mapping live distributed cyber attacks with geopolitical network nodes and defensive countermeasures.",
    features: [
      "Geospatial 3D globe with real-time DDoS attack vectors",
      "Automated countermeasure deployment pipelines",
      "Zero-trust RBAC access controls"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: false,
    tech: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"]
  },
  {
    id: 8,
    title: "Prism Neural Studio",
    subheading: "AI Generative Graphics Studio",
    category: "Artificial Intelligence & Creative Tech",
    createdBy: "Infas.mk // WEB⚡BITS",
    year: "2024",
    role: "Lead AI Engineer",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    description: "Browser-based generative AI design workspace enabling real-time neural diffusion guidance, procedural texture synthesis, and 3D asset exporting.",
    features: [
      "WebGPU accelerated neural inference inside the browser",
      "Procedural PBR material map generation",
      "Seamless export to glTF, USDZ, and Blender"
    ],
    link: "https://aevo-22.vercel.app/",
    github: "https://github.com/infasmk",
    featured: false,
    tech: ["WebGPU", "React", "Python", "ONNX"]
  }
];

/**
 * Filtered list of the first 6 featured projects displayed on the home page showcase.
 * Any project with `featured: true` (up to 6) is selected.
 * If fewer than 6 projects are flagged, it defaults to the first 6 projects.
 */
export const FEATURED_PROJECTS: Project[] = (() => {
  const flagged = PROJECTS.filter((p) => p.featured === true);
  if (flagged.length >= 6) {
    return flagged.slice(0, 6);
  }
  // If fewer than 6 are explicitly marked featured: true, fill with the first available
  const remaining = PROJECTS.filter((p) => !flagged.includes(p));
  return [...flagged, ...remaining].slice(0, 6);
})();

/**
 * All projects array for the full archive / catalog view.
 */
export const ALL_PROJECTS: Project[] = PROJECTS;

export default PROJECTS;
