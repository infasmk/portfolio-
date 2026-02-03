
import React from 'react';
import { Project, Skill, TeamMember } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aetherial Dashboard",
    category: "Web Platform",
    image: "https://picsum.photos/seed/aether/1200/800",
    tech: ["React", "Three.js", "Node.js"],
    description: "A futuristic data visualization dashboard with real-time analytics.",
    link:"https://aevo-22.vercel.app/"
  },
  {
    id: 2,
    title: "Nebula Commerce",
    category: "E-Commerce",
    image: "https://picsum.photos/seed/nebula/1200/800",
    tech: ["Next.js", "Stripe", "Tailwind"],
    description: "High-end fashion retail experience with immersive 3D product viewing."
  },
  {
    id: 3,
    title: "Nova Protocol",
    category: "Blockchain",
    image: "https://picsum.photos/seed/nova/1200/800",
    tech: ["Solidity", "React", "Ether.js"],
    description: "Decentralized finance platform for automated yield optimization."
  },
  {
    id: 4,
    title: "Zenith Mobile",
    category: "Application",
    image: "https://picsum.photos/seed/zenith/1200/800",
    tech: ["React Native", "Firebase", "Framer"],
    description: "Wellness and meditation app focused on micro-interactions."
  }
];

export const SKILLS = {
  frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Three.js", level: 85 },
    { name: "Tailwind CSS", level: 98 },
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 82 },
    { name: "PostgreSQL", level: 85 },
    { name: "GraphQL", level: 80 },
  ],
  tools: [
    { name: "Git / CI/CD", level: 92 },
    { name: "Docker", level: 75 },
    { name: "Figma", level: 95 },
    { name: "Blender", level: 70 },
  ]
};

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Alex Sterling",
    role: "Lead Designer",
    bio: "Obsessed with pixel-perfect layouts and smooth motion design.",
    image: "https://picsum.photos/seed/alex/400/500",
    socials: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    id: 2,
    name: "Elena Thorne",
    role: "Creative Developer",
    bio: "Turning abstract concepts into performant interactive web experiences.",
    image: "https://picsum.photos/seed/elena/400/500",
    socials: { linkedin: "#", github: "#" }
  },
  {
    id: 3,
    name: "Marcus Vane",
    role: "3D Artist",
    bio: "Sculpting the future of the web, one polygon at a time.",
    image: "https://picsum.photos/seed/marcus/400/500",
    socials: { twitter: "#", github: "#" }
  }
];
