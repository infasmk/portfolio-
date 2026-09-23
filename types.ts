export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  description: string;
  link?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  github?: string;
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
