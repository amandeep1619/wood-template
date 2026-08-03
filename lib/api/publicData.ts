import { IsNull } from "typeorm";
import { getRepo } from "@/lib/db/data-source";
import { Project as ProjectEntity } from "@/lib/db/entities/Project.entity";
import { Service as ServiceEntity } from "@/lib/db/entities/Service.entity";
import { BlogPost as BlogPostEntity } from "@/lib/db/entities/BlogPost.entity";
import { Faq as FaqEntity } from "@/lib/db/entities/Faq.entity";
import type {
  Project,
  Service,
  BlogPost,
  ProjectCategory,
  ServiceCategory,
  BlogCategory,
  TeamMember,
  FAQ,
} from "@/types";

const PROJECT_CATEGORY_BY_SLUG: Record<string, ProjectCategory> = {
  "kitchen-cabinetry": "kitchen",
  "bedroom-living": "residential",
  commercial: "commercial",
  "built-ins-millwork": "furniture",
  "outdoor-structures": "renovation",
};

const BLOG_CATEGORY_BY_SLUG: Record<string, BlogCategory> = {
  "wood-care-maintenance": "maintenance",
  "design-inspiration": "design",
  "craft-and-process": "projects",
};

const SERVICE_CATEGORY_BY_SLUG: Record<string, ServiceCategory> = {
  "custom-kitchen-cabinetry": "kitchen",
  "furniture-and-bedroom": "furniture",
  "commercial-woodwork": "office",
  "built-ins-and-shelving": "interior",
  "outdoor-structures": "renovation",
};

const PROJECT_RELATIONS = { category: true, service: true, gallery: true };
const SERVICE_RELATIONS = { gallery: true, benefits: true, processSteps: true, faqs: true };
const BLOG_POST_RELATIONS = { category: true, author: true, tags: true };

function mapProject(entity: ProjectEntity): Project {
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    shortDescription: entity.shortDescription,
    description: entity.description || entity.shortDescription,
    challenge: entity.challenge,
    solution: entity.solution,
    client: entity.client,
    location: entity.location,
    duration: entity.duration,
    year: entity.year,
    category: PROJECT_CATEGORY_BY_SLUG[entity.category?.slug ?? ""] ?? "residential",
    coverImage: entity.coverImage,
    gallery: [...(entity.gallery ?? [])].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
    materials: entity.materials,
    featured: entity.featured,
    serviceSlug: entity.service?.slug,
  };
}

function mapService(entity: ServiceEntity): Service {
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    shortDescription: entity.shortDescription,
    description: entity.description,
    icon: entity.icon || "Armchair",
    image: entity.image,
    category: SERVICE_CATEGORY_BY_SLUG[entity.slug] ?? "furniture",
    startingPrice: entity.startingPrice ?? undefined,
    features: entity.features,
    benefits: [...(entity.benefits ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((b) => ({ title: b.title, description: b.description })),
    gallery: [...(entity.gallery ?? [])].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
    faqs: [...(entity.faqs ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => ({ question: f.question, answer: f.answer })),
    process: [...(entity.processSteps ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ step: s.stepNumber, title: s.title, description: s.description, icon: s.icon, duration: s.duration ?? undefined })),
  };
}

function mapBlogPost(entity: BlogPostEntity): BlogPost {
  const author: TeamMember = {
    id: entity.author?.id ?? "",
    name: entity.author?.name ?? "Tirath Singh",
    role: entity.author?.role ?? "Master Craftsman",
    bio: entity.author?.bio ?? "",
    avatar: entity.author?.avatar ?? "",
    experience: entity.author?.yearsExperience ?? 0,
    specialties: entity.author?.specialties ?? [],
  };
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    excerpt: entity.excerpt,
    content: entity.content,
    coverImage: entity.coverImage,
    author,
    publishedAt: (entity.publishedAt ?? entity.createdAt).toISOString(),
    readTime: entity.readTime,
    category: BLOG_CATEGORY_BY_SLUG[entity.category?.slug ?? ""] ?? "design",
    tags: (entity.tags ?? []).map((t) => t.name),
    featured: entity.featured,
  };
}

export async function getProjects(): Promise<Project[]> {
  const repo = await getRepo<ProjectEntity>("projects");
  const items = await repo.find({
    where: { status: "published" },
    relations: PROJECT_RELATIONS,
    order: { publishedAt: "DESC", createdAt: "DESC" },
  });
  return items.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const repo = await getRepo<ProjectEntity>("projects");
  const item = await repo.findOne({ where: { slug, status: "published" }, relations: PROJECT_RELATIONS });
  return item ? mapProject(item) : undefined;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getServices(): Promise<Service[]> {
  const repo = await getRepo<ServiceEntity>("services");
  const items = await repo.find({
    where: { status: "active" },
    relations: SERVICE_RELATIONS,
    order: { sortOrder: "ASC", createdAt: "ASC" },
  });
  return items.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const repo = await getRepo<ServiceEntity>("services");
  const item = await repo.findOne({ where: { slug, status: "active" }, relations: SERVICE_RELATIONS });
  return item ? mapService(item) : undefined;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const repo = await getRepo<BlogPostEntity>("blog_posts");
  const items = await repo.find({
    where: { status: "published" },
    relations: BLOG_POST_RELATIONS,
    order: { publishedAt: "DESC", createdAt: "DESC" },
  });
  return items.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const repo = await getRepo<BlogPostEntity>("blog_posts");
  const item = await repo.findOne({ where: { slug, status: "published" }, relations: BLOG_POST_RELATIONS });
  return item ? mapBlogPost(item) : undefined;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return (await getBlogPosts()).filter((p) => p.featured);
}

/** General (site-wide) FAQs — service_id is null; a service's own FAQs are
 * exposed via getServiceBySlug()'s `faqs` field instead. */
export async function getFaqs(): Promise<FAQ[]> {
  const repo = await getRepo<FaqEntity>("faqs");
  const items = await repo.find({
    where: { isPublished: true, service: IsNull() },
    order: { sortOrder: "ASC" },
  });
  return items.map((f) => ({ question: f.question, answer: f.answer }));
}
