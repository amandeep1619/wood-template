import { z } from "zod";

export const categoryInputSchema = z.object({
  slug: z.string().min(1).max(160),
  name: z.string().min(1).max(160),
  description: z.string().max(2000).nullable().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});
export type CategoryInput = z.infer<typeof categoryInputSchema>;

const statusEnum = z.enum(["draft", "published", "archived"]);

export const projectInputSchema = z.object({
  slug: z.string().min(1).max(200),
  categoryId: z.string().uuid(),
  serviceId: z.string().uuid().nullable().optional(),
  title: z.string().min(1).max(200),
  shortDescription: z.string().max(500).default(""),
  description: z.string().default(""),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  client: z.string().max(200).default(""),
  location: z.string().max(200).default(""),
  duration: z.string().max(64).default(""),
  year: z.coerce.number().int().min(1900).max(2100),
  coverImage: z.string().max(500).default(""),
  gallery: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: statusEnum.default("draft"),
  sortOrder: z.number().int().optional(),
});
export type ProjectInput = z.infer<typeof projectInputSchema>;

const serviceStatusEnum = z.enum(["active", "inactive"]);

export const serviceInputSchema = z.object({
  slug: z.string().min(1).max(200),
  categoryId: z.string().uuid(),
  title: z.string().min(1).max(200),
  shortDescription: z.string().max(500).default(""),
  description: z.string().default(""),
  icon: z.string().max(32).default(""),
  image: z.string().max(500).default(""),
  startingPrice: z.string().max(64).nullable().optional(),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: serviceStatusEnum.default("active"),
  sortOrder: z.number().int().optional(),
});
export type ServiceInput = z.infer<typeof serviceInputSchema>;

export const blogPostInputSchema = z.object({
  slug: z.string().min(1).max(200),
  categoryId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  content: z.string().default(""),
  coverImage: z.string().max(500).default(""),
  readTime: z.coerce.number().int().min(1).max(120).default(5),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: statusEnum.default("draft"),
  publishedAt: z.coerce.date().nullable().optional(),
});
export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

export const teamMemberInputSchema = z.object({
  slug: z.string().min(1).max(160),
  name: z.string().min(1).max(160),
  role: z.string().min(1).max(160),
  bio: z.string().default(""),
  avatar: z.string().max(500).default(""),
  yearsExperience: z.coerce.number().int().min(0).max(80).default(0),
  specialties: z.array(z.string()).default([]),
  linkedinUrl: z.string().max(500).nullable().optional(),
  instagramUrl: z.string().max(500).nullable().optional(),
  sortOrder: z.number().int().optional(),
  isPublished: z.boolean().optional(),
});
export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;

export const testimonialInputSchema = z.object({
  name: z.string().min(1).max(160),
  role: z.string().max(160).default(""),
  company: z.string().max(160).nullable().optional(),
  avatar: z.string().max(500).default(""),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().min(1),
  projectId: z.string().uuid().nullable().optional(),
  featured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});
export type TestimonialInput = z.infer<typeof testimonialInputSchema>;

export const faqInputSchema = z.object({
  serviceId: z.string().uuid().nullable().optional(),
  topic: z.string().max(80).nullable().optional(),
  question: z.string().min(1).max(300),
  answer: z.string().min(1),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});
export type FaqInput = z.infer<typeof faqInputSchema>;

export const settingsInputSchema = z.record(z.string(), z.unknown());

export const contactSubmissionInputSchema = z.object({
  name: z.string().min(1).max(160),
  email: z.string().email().max(255),
  phone: z.string().max(32).nullable().optional(),
  service: z.string().max(160).nullable().optional(),
  budget: z.string().max(64).nullable().optional(),
  message: z.string().min(1),
});
export type ContactSubmissionInput = z.infer<typeof contactSubmissionInputSchema>;

export const newsletterSubscribeInputSchema = z.object({
  email: z.string().email().max(255),
});
