import { getMongoose } from "@/lib/db/mongoose";
import { Project } from "@/lib/db/models/Project.model";
import { Service } from "@/lib/db/models/Service.model";
import { BlogPost } from "@/lib/db/models/BlogPost.model";
import { Faq } from "@/lib/db/models/Faq.model";
import type {
  Project as ProjectType,
  Service as ServiceType,
  BlogPost as BlogPostType,
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

const PROJECT_RELATIONS = ["category", "service"];
const BLOG_POST_RELATIONS = ["category", "author", "tags"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function mapProject(entity: any): ProjectType {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Mongoose document
function mapService(entity: any, faqs: { question: string; answer: string }[]): ServiceType {
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
    faqs,
    process: [...(entity.processSteps ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ step: s.stepNumber, title: s.title, description: s.description, icon: s.icon, duration: s.duration ?? undefined })),
  };
}

/** Service.faqs isn't a stored relation in the Mongo schema (Faq references
 * Service, not the other way around) — looked up per-service instead of via
 * a populated reverse relation. */
async function faqsForService(serviceId: string) {
  const items = await Faq.find({ service: serviceId, isPublished: true }).sort({ sortOrder: 1 });
  return items.map((f) => ({ question: f.question, answer: f.answer }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function mapBlogPost(entity: any): BlogPostType {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Tag document
    tags: (entity.tags ?? []).map((t: any) => t.name),
    featured: entity.featured,
  };
}

export async function getProjects(): Promise<ProjectType[]> {
  await getMongoose();
  const items = await Project.find({ status: "published" })
    .populate(PROJECT_RELATIONS)
    .sort({ publishedAt: -1, createdAt: -1 });
  return items.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | undefined> {
  await getMongoose();
  const item = await Project.findOne({ slug, status: "published" }).populate(PROJECT_RELATIONS);
  return item ? mapProject(item) : undefined;
}

export async function getFeaturedProjects(): Promise<ProjectType[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getServices(): Promise<ServiceType[]> {
  await getMongoose();
  const items = await Service.find({ status: "active" }).sort({ sortOrder: 1, createdAt: 1 });
  return Promise.all(items.map(async (item) => mapService(item, await faqsForService(item.id))));
}

export async function getServiceBySlug(slug: string): Promise<ServiceType | undefined> {
  await getMongoose();
  const item = await Service.findOne({ slug, status: "active" });
  return item ? mapService(item, await faqsForService(item.id)) : undefined;
}

export async function getBlogPosts(): Promise<BlogPostType[]> {
  await getMongoose();
  const items = await BlogPost.find({ status: "published" })
    .populate(BLOG_POST_RELATIONS)
    .sort({ publishedAt: -1, createdAt: -1 });
  return items.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostType | undefined> {
  await getMongoose();
  const item = await BlogPost.findOne({ slug, status: "published" }).populate(BLOG_POST_RELATIONS);
  return item ? mapBlogPost(item) : undefined;
}

export async function getFeaturedBlogPosts(): Promise<BlogPostType[]> {
  return (await getBlogPosts()).filter((p) => p.featured);
}

/** General (site-wide) FAQs — service is null; a service's own FAQs are
 * exposed via getServiceBySlug()'s `faqs` field instead. */
export async function getFaqs(): Promise<FAQ[]> {
  await getMongoose();
  const items = await Faq.find({ isPublished: true, service: null }).sort({ sortOrder: 1 });
  return items.map((f) => ({ question: f.question, answer: f.answer }));
}
