import { Project } from './types';

/**
 * =======================================================================
 * ⚡ WEB⚡BITS — PROJECT CONFIGURATION FILE
 * =======================================================================
 * How to add or edit projects:
 * 1. Add your project object to the PROJECTS array below.
 * 2. Set `featured: true` on up to 6 projects to feature them on the main home screen showcase!
 * 3. All projects (featured or not) will appear in the "ALL PROJECTS" catalog.
 * 4. Fields like `subheading`, `createdBy`, `features`, and `link` are optional:
 *    - If you leave them empty or omit them, they won't show on the card.
 * 5. Tip: Click the 🔒 lock icon in the footer 3 times to open the interactive Project Code Generator!
 *
 * TEMPLATE:
 * {
 *   id: 9,
 *   title: "My New Project",
 *   subheading: "Interactive Web Experience",     // (Optional)
 *   createdBy: "Infas.mk // WEB⚡BITS",          // (Optional)
 *   image: "https://images.unsplash.com/...",    // Cover image URL
 *   description: "A summary of what this project is and does.",
 *   features: [                                  // (Optional) Bullet feature highlights
 *     "High-performance 60FPS fluid physics",
 *     "Custom WebGL shader pipelines",
 *     "Full responsive design for mobile & desktop"
 *   ],
 *   link: "https://my-live-site.com",            // Direct live site URL
 *   featured: true                               // Set to true to show on main screen (first 6)
 * },
 * =======================================================================
 */

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aevo Data Matrix",
    subheading: "Web Platform & 3D Visualization",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    description: "A futuristic data visualization engine and trading matrix featuring real-time node telemetry and reactive WebGL topography.",
    features: [
      "Instanced buffer geometries reducing draw calls by 82%",
      "Sub-16ms frame times under high data loads",
      "Dynamic camera transitions calibrated across all screen sizes",
      "Real-time WebSockets integration for instantaneous price feeds"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 2,
    title: "Nebula Commerce",
    subheading: "Immersive 3D E-Commerce",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
    description: "High-end luxury fashion retail experience with interactive 3D product inspection, fabric physics, and zero-latency cart checkout.",
    features: [
      "On-demand Draco compressed glTF loader pipeline",
      "Screen-space reflections and physically-based material shaders",
      "140% boost in user session duration and 34% checkout conversion gain"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 3,
    title: "Nova Protocol",
    subheading: "Decentralized Finance & Spatial UI",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    description: "Automated yield optimization dashboard with holographic smart-contract topology and real-time biometric-inspired wallet authentication.",
    features: [
      "Interactive micro-charts and kinetic spring physics",
      "WebSockets decentralized state synchronization",
      "Locked $18M+ TVL within 48 hours of mainnet deployment"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 4,
    title: "Zenith Spatial UI",
    subheading: "Experimental Spatial Interface",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    description: "A spatial operating concept exploring depth perception, dynamic light refraction, and gyroscopic orientation on modern web viewports.",
    features: [
      "Custom WebGL refraction shaders mimicking optical glass",
      "Kinetic drag-and-snap window physics with zero CPU lag",
      "Honored with Site of the Day in international creative tech review"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 5,
    title: "Krypton Engine",
    subheading: "Cloud Infrastructure Console",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    description: "Real-time edge server telemetry console with distributed tracing visualizations and predictive anomaly detection alerts.",
    features: [
      "Virtual rendering grid supporting 50,000+ simultaneous log nodes",
      "Instantaneous filtering with sub-5ms search indexing",
      "Adopted by 40+ engineering teams worldwide"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 6,
    title: "Vortex Soundscape",
    subheading: "Audio-Reactive Spatial Experience",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    description: "An audiovisual web synth that transforms user cursor dynamics and microphone input into blooming kinetic 3D fractal sculptures.",
    features: [
      "Fast Fourier Transform (FFT) analysis via Web Audio API",
      "Audio-reactive vertex displacement across 200,000 vertices",
      "Featured across generative art galleries"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: true
  },
  {
    id: 7,
    title: "Apex Sentinel",
    subheading: "Cybersecurity Threat Matrix",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    description: "Enterprise threat mitigation dashboard mapping live distributed cyber attacks with geopolitical network nodes and defensive countermeasures.",
    features: [
      "Geospatial 3D globe with real-time DDoS attack vectors",
      "Automated countermeasure deployment pipelines",
      "Zero-trust RBAC access controls"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: false
  },
  {
    id: 8,
    title: "Prism Neural Studio",
    subheading: "AI Generative Graphics Studio",
    createdBy: "Infas.mk // WEB⚡BITS",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    description: "Browser-based generative AI design workspace enabling real-time neural diffusion guidance, procedural texture synthesis, and 3D asset exporting.",
    features: [
      "WebGPU accelerated neural inference inside the browser",
      "Procedural PBR material map generation",
      "Seamless export to glTF, USDZ, and Blender"
    ],
    link: "https://aevo-22.vercel.app/",
    featured: false
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
