export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  category: ServiceCategory;
  startingPrice?: string;
  features: string[];
  benefits: ServiceBenefit[];
  gallery: string[];
  faqs: FAQ[];
  process?: ProcessStep[];
}

export type ServiceCategory =
  | "furniture"
  | "kitchen"
  | "interior"
  | "office"
  | "renovation"
  | "restoration";

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  client: string;
  location: string;
  duration: string;
  year: number;
  category: ProjectCategory;
  coverImage: string;
  gallery: string[];
  materials: string[];
  testimonial?: Testimonial;
  featured: boolean;
  serviceSlug?: string;
}

export type ProjectCategory =
  | "residential"
  | "commercial"
  | "kitchen"
  | "furniture"
  | "restoration"
  | "renovation"
  | "office";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  text: string;
  projectSlug?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  experience: number;
  specialties: string[];
  social?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: TeamMember;
  publishedAt: string;
  readTime: number;
  category: BlogCategory;
  tags: string[];
  featured?: boolean;
}

export type BlogCategory =
  | "tips"
  | "projects"
  | "materials"
  | "design"
  | "maintenance"
  | "industry";

export interface FAQ {
  question: string;
  answer: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}
