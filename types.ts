export interface Project {
  id: number | string;
  title: string;
  subheading?: string; // Subtitle / category shown on the card
  category?: string; // Alternative alias for subheading
  image: string; // Cover image URL or path
  createdBy?: string; // Optional: creator/author name (e.g. "Infas.mk")
  description: string; // Project summary description
  features?: string[]; // Optional special feature points (bullet highlights)
  link?: string; // Optional live project URL (e.g. "https://example.com")
  github?: string; // Optional GitHub repo URL
  featured?: boolean; // Set to true to include in the first 6 featured projects on the home screen!
  tech?: string[]; // Optional tech stack badges
  year?: string; // Optional launch year
  role?: string; // Optional role or discipline
  challenge?: string; // Optional case study challenge
  solution?: string; // Optional case study solution
  result?: string; // Optional case study outcome
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
