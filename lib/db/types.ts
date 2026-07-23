import { ObjectId } from "mongodb";

export type Locale = "en" | "hi" | "es" | "fr";

export interface LocalizedString {
  en: string;
  hi?: string;
  es?: string;
  fr?: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface ProjectDocument {
  _id?: ObjectId;
  slug: string;
  category: string;
  featured: boolean;
  coverImage: string;
  location: string;
  year: number;
  client: string;
  duration: string;
  area?: string;
  materials: string[];
  gallery: string[];
  published: boolean;
  sortOrder: number;
  title: LocalizedString;
  shortDescription: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceDocument {
  _id?: ObjectId;
  slug: string;
  icon: string;
  image: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  gallery: string[];
  title: LocalizedString;
  description: LocalizedString;
  shortDescription: LocalizedString;
  features: string[];
  benefits: Array<{ title: LocalizedString; description: LocalizedString }>;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogDocument {
  _id?: ObjectId;
  slug: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  featured: boolean;
  published: boolean;
  publishedAt: Date;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamDocument {
  _id?: ObjectId;
  slug: string;
  avatar: string;
  yearsExp: number;
  sortOrder: number;
  published: boolean;
  specialties: string[];
  social: { linkedin?: string; instagram?: string };
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface TestimonialDocument {
  _id?: ObjectId;
  rating: number;
  avatar: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  projectSlug?: string;
  name: LocalizedString;
  role: LocalizedString;
  company?: LocalizedString;
  text: LocalizedString;
  createdAt: Date;
  updatedAt: Date;
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export interface FaqDocument {
  _id?: ObjectId;
  category: string;
  published: boolean;
  sortOrder: number;
  question: LocalizedString;
  answer: LocalizedString;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface SettingsDocument {
  _id?: ObjectId;
  key: string;
  value: Record<string, unknown>;
  updatedAt: Date;
}

// ─── Translations ─────────────────────────────────────────────────────────────

export interface TranslationDocument {
  _id?: ObjectId;
  namespace: string;
  key: string;
  translations: Record<Locale, string>;
  updatedAt: Date;
}
