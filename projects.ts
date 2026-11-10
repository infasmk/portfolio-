import { Project } from './types';

/**
 * =======================================================================
 * ⚡ WEB⚡BITS — PROJECT CONFIGURATION
 * =======================================================================
 * Real production platforms engineered by WEB⚡BITS Studio.
 * All 6 projects feature custom 3D artwork, live production links,
 * verified categories, and technical highlights.
 * =======================================================================
 */

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "PDFBolt ⚡",
    subheading: "PDF Tools / Productivity",
    image: "/projects/pdfbolt.png",
    description: "100% free, private in-browser PDF suite to merge, split, edit, convert, and protect documents with zero file limits and zero cloud uploads.",
    features: [
      "Client-side processing with zero server uploads",
      "Instant merge, split, convert & protect suite",
      "No file size caps or daily conversion limits"
    ],
    link: "https://pdfbolt.webbits.space/",
    featured: true
  },
  {
    id: 2,
    title: "Zylo",
    subheading: "Music Streaming / Audio Platform",
    image: "/projects/zylo.png",
    description: "Premium dark-themed music streaming platform with 100M+ lossless tracks at 320 kbps, offline playback, and playlist synchronization with Spotify & YouTube.",
    features: [
      "320 kbps lossless audio streaming engine",
      "Spotify & YouTube playlist cloud synchronization",
      "Offline playback and local storage caching"
    ],
    link: "https://zylo.webbits.space/",
    featured: true
  },
  {
    id: 3,
    title: "Nexus",
    subheading: "Encrypted Communication / Cyber Console",
    image: "/projects/nexus.png",
    description: "Encrypted communication console featuring password-protected ephemeral chat rooms, terminal aesthetics, and real-time decentralized messaging.",
    features: [
      "Encrypted, password-locked ephemeral rooms",
      "Real-time cyber terminal console architecture",
      "Decentralized ephemeral state persistence"
    ],
    link: "https://nexus.webbits.space/",
    featured: true
  },
  {
    id: 4,
    title: "Aevo Designs",
    subheading: "Luxury Decor / E-Commerce",
    image: "/projects/aevo.png",
    description: "E-commerce destination for handcrafted luxury wooden wall clocks and architectural decor accessories designed for modern elegant interiors.",
    features: [
      "Minimalist geometric wooden timepiece design",
      "Organic walnut wood and brushed brass finishes",
      "Responsive luxury lifestyle e-commerce catalog"
    ],
    link: "https://aevodesigns.in/",
    featured: true
  },
  {
    id: 5,
    title: "AWT TempMail",
    subheading: "Temporary Email / Web App",
    image: "/projects/tempmail.png",
    description: "Disposable temporary email service providing instant auto-refreshing inboxes to protect your personal identity from spam, tracking, and unsolicited mail.",
    features: [
      "Instant auto-generating disposable addresses",
      "Anti-tracking privacy with auto-expiring inboxes",
      "Live WebSocket-powered incoming mail feed"
    ],
    link: "https://tempmail.webbits.space/",
    featured: true
  },
  {
    id: 6,
    title: "Web⚡Bits App",
    subheading: "Creative Technology Studio",
    image: "/projects/webbits_app.png",
    description: "Interactive creative engineering platform pushing the boundaries of real-time 3D spatial computing, custom WebGL shaders, and kinetic interface design.",
    features: [
      "Real-time Three.js & WebGL spatial graphics",
      "Kinetic spring physics & luxury design system",
      "Zero-compromise high-frame-rate web standards"
    ],
    link: "https://app.webbits.space/",
    featured: true
  }
];

// Helper export to get only featured projects
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured === true);

// Helper export to get all projects in order
export const ALL_PROJECTS = PROJECTS;
