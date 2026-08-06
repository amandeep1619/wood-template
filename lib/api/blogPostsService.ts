import { getMongoose } from "@/lib/db/mongoose";
import { BlogPost } from "@/lib/db/models/BlogPost.model";
import { BlogCategory } from "@/lib/db/models/BlogCategory.model";
import { TeamMember } from "@/lib/db/models/TeamMember.model";
import { Tag } from "@/lib/db/models/Tag.model";
import { ApiError } from "@/lib/api/http";
import type { BlogPostInput } from "@/lib/api/schemas";

export type BlogPostFilters = { status?: string; categoryId?: string; q?: string };

const RELATIONS = ["category", "author", "tags"];

function slugifyTag(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function serialize(post: any) {
  return {
    id: post.id,
    slug: post.slug,
    categoryId: post.category?.id ?? null,
    authorId: post.author?.id ?? null,
    authorName: post.author?.name ?? null,
    authorRole: post.author?.role ?? null,
    authorAvatar: post.author?.avatar ?? null,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    readTime: post.readTime,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Tag document
    tags: (post.tags ?? []).map((t: any) => t.name),
    featured: post.featured,
    status: post.status,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export async function listBlogPosts(filters: BlogPostFilters) {
  await getMongoose();
  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.categoryId) where.category = filters.categoryId;
  if (filters.q) where.title = { $regex: filters.q, $options: "i" };
  const items = await BlogPost.find(where).populate(RELATIONS).sort({ createdAt: -1 });
  return items.map(serialize);
}

export async function getBlogPost(id: string) {
  await getMongoose();
  const item = await BlogPost.findById(id).populate(RELATIONS);
  return item ? serialize(item) : null;
}

/** Finds tags by (case-insensitive) name, creating any that don't exist yet. */
async function resolveTags(names: string[]) {
  const cleaned = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  if (cleaned.length === 0) return [];

  const existing = await Tag.find({ name: { $in: cleaned } });
  const existingNames = new Set(existing.map((t) => t.name.toLowerCase()));
  const missing = cleaned.filter((n) => !existingNames.has(n.toLowerCase()));

  const created = missing.length
    ? await Tag.create(missing.map((name) => ({ name, slug: slugifyTag(name) })))
    : [];
  return [...existing, ...created];
}

async function resolveRelations(input: BlogPostInput) {
  const category = await BlogCategory.findById(input.categoryId);
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  const author = await TeamMember.findById(input.authorId);
  if (!author) throw new ApiError(400, "authorId does not reference an existing team member");
  const tags = await resolveTags(input.tags);
  return { category, author, tags };
}

export async function createBlogPost(input: BlogPostInput) {
  await getMongoose();
  // categoryId/authorId/tags are pulled off so ...rest can be spread without
  // them (the document holds resolved refs, not raw ids/names).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, authorId, tags: tagNames, ...rest } = input;
  const { category, author, tags } = await resolveRelations(input);
  const created = await BlogPost.create({
    ...rest,
    category: category.id,
    author: author.id,
    tags: tags.map((t) => t.id),
  });
  return getBlogPost(created.id);
}

export async function updateBlogPost(id: string, input: BlogPostInput) {
  await getMongoose();
  const existing = await BlogPost.findById(id);
  if (!existing) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, authorId, tags: tagNames, ...rest } = input;
  const { category, author, tags } = await resolveRelations(input);
  Object.assign(existing, {
    ...rest,
    category: category.id,
    author: author.id,
    tags: tags.map((t) => t.id),
  });
  const saved = await existing.save();
  return getBlogPost(saved.id);
}

export async function softDeleteBlogPost(id: string) {
  await getMongoose();
  const existing = await BlogPost.findById(id);
  if (!existing) return false;
  existing.set("deletedAt", new Date());
  await existing.save();
  return true;
}
