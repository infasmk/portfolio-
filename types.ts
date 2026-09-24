export interface Project {
  id: number | string;
  title: string;
  subheading?: string; // (Optional) Subtitle / category shown on the card
  createdBy?: string; // (Optional) Creator or studio name (e.g. "Infas.mk // WEB⚡BITS")
  image: string; // Cover image URL or path
  description: string; // Clean project description
  features?: string[]; // (Optional) Special feature points (bullet highlights). If omitted, won't show!
  link?: string; // Direct live website URL
  featured?: boolean; // Set to true to include in the first 6 featured projects on the home screen!
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  category?: 'frontend' | 'backend' | 'tools';
  description?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}
