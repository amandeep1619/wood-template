import { readCollection } from "@/lib/api/mockDb";
import type {
  Project,
  Service,
  BlogPost,
  ProjectCategory,
  ServiceCategory,
  BlogCategory,
  TeamMember,
} from "@/types";

type Raw = Record<string, unknown>;

const s = (v: unknown, d = "") => (typeof v === "string" ? v : d);
const n = (v: unknown, d = 0) => (typeof v === "number" ? v : Number(v) || d);
const b = (v: unknown) => Boolean(v);
const a = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const PROJ_CAT: Record<string, ProjectCategory> = {
  pcat_1: "kitchen",
  pcat_2: "residential",
  pcat_3: "commercial",
  pcat_4: "furniture",
  pcat_5: "renovation",
};

const BLOG_CAT: Record<string, BlogCategory> = {
  bcat_1: "maintenance",
  bcat_2: "design",
  bcat_3: "projects",
};

const SVC_CAT: Record<string, ServiceCategory> = {
  "custom-kitchen-cabinetry": "kitchen",
  "furniture-and-bedroom": "furniture",
  "commercial-woodwork": "office",
  "built-ins-and-shelving": "interior",
  "outdoor-structures": "renovation",
};

function mapProject(raw: Raw): Project {
  return {
    id: s(raw.id),
    slug: s(raw.slug),
    title: s(raw.title),
    shortDescription: s(raw.shortDescription),
    description: s(raw.description) || s(raw.shortDescription),
    challenge: s(raw.challenge),
    solution: s(raw.solution),
    client: s(raw.client),
    location: s(raw.location),
    duration: s(raw.duration),
    year: n(raw.year, new Date().getFullYear()),
    category: PROJ_CAT[s(raw.categoryId)] ?? "residential",
    coverImage: s(raw.coverImage),
    gallery: a<string>(raw.gallery),
    materials: a<string>(raw.materials),
    featured: b(raw.featured),
  };
}

function mapService(raw: Raw): Service {
  return {
    id: s(raw.id),
    slug: s(raw.slug),
    title: s(raw.title),
    shortDescription: s(raw.shortDescription),
    description: s(raw.description),
    icon: s(raw.icon, "Armchair"),
    image: s(raw.image),
    category: SVC_CAT[s(raw.slug)] ?? "furniture",
    features: [],
    benefits: [],
    gallery: [],
    faqs: [],
  };
}

function mapBlog(raw: Raw): BlogPost {
  const author: TeamMember = {
    id: s(raw.id),
    name: s(raw.authorName, "Tirath Singh"),
    role: s(raw.authorRole, "Master Craftsman"),
    bio: "",
    avatar: s(raw.authorAvatar),
    experience: 0,
    specialties: [],
  };
  return {
    id: s(raw.id),
    slug: s(raw.slug),
    title: s(raw.title),
    excerpt: s(raw.excerpt),
    content: s(raw.content),
    coverImage: s(raw.coverImage),
    author,
    publishedAt: s(raw.publishedAt),
    readTime: n(raw.readTime, 5),
    category: BLOG_CAT[s(raw.categoryId)] ?? "design",
    tags: a<string>(raw.tags),
    featured: b(raw.featured),
  };
}

export function getProjects(): Project[] {
  return readCollection<Raw>("projects")
    .filter((p) => !p.isDeleted && p.status === "published")
    .map(mapProject);
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return getProjects().filter((p) => p.featured);
}

export function getServices(): Service[] {
  return readCollection<Raw>("services")
    .filter((s) => !s.isDeleted && s.status === "active")
    .map(mapService);
}

export function getServiceBySlug(slug: string) {
  return getServices().find((s) => s.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return readCollection<Raw>("blogs")
    .filter((b) => !b.isDeleted && b.status === "published")
    .map(mapBlog);
}

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((b) => b.slug === slug);
}

export function getFeaturedBlogPosts() {
  return getBlogPosts().filter((b) => b.featured);
}
