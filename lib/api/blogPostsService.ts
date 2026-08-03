import { FindOptionsWhere, ILike, In } from "typeorm";
import { getRepo } from "@/lib/db/data-source";
import { BlogPost } from "@/lib/db/entities/BlogPost.entity";
import { BlogCategory } from "@/lib/db/entities/BlogCategory.entity";
import { TeamMember } from "@/lib/db/entities/TeamMember.entity";
import { Tag } from "@/lib/db/entities/Tag.entity";
import { ApiError } from "@/lib/api/http";
import type { BlogPostInput } from "@/lib/api/schemas";

export type BlogPostFilters = { status?: string; categoryId?: string; q?: string };

const RELATIONS = { category: true, author: true, tags: true };

function slugifyTag(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function serialize(post: BlogPost) {
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
    tags: (post.tags ?? []).map((t) => t.name),
    featured: post.featured,
    status: post.status,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export async function listBlogPosts(filters: BlogPostFilters) {
  const repo = await getRepo<BlogPost>("blog_posts");
  const where: FindOptionsWhere<BlogPost> = {};
  if (filters.status) where.status = filters.status as BlogPost["status"];
  if (filters.categoryId) where.category = { id: filters.categoryId };
  if (filters.q) where.title = ILike(`%${filters.q}%`);
  const items = await repo.find({ where, relations: RELATIONS, order: { createdAt: "DESC" } });
  return items.map(serialize);
}

export async function getBlogPost(id: string) {
  const repo = await getRepo<BlogPost>("blog_posts");
  const item = await repo.findOne({ where: { id }, relations: RELATIONS });
  return item ? serialize(item) : null;
}

/** Finds tags by (case-insensitive) name, creating any that don't exist yet. */
async function resolveTags(names: string[]) {
  const cleaned = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  if (cleaned.length === 0) return [];

  const tagRepo = await getRepo<Tag>("tags");
  const existing = await tagRepo.find({ where: { name: In(cleaned) } });
  const existingNames = new Set(existing.map((t) => t.name.toLowerCase()));
  const missing = cleaned.filter((n) => !existingNames.has(n.toLowerCase()));

  const created = await tagRepo.save(missing.map((name) => tagRepo.create({ name, slug: slugifyTag(name) })));
  return [...existing, ...created];
}

async function resolveRelations(input: BlogPostInput) {
  const category = await (await getRepo<BlogCategory>("blog_categories")).findOne({ where: { id: input.categoryId } });
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  const author = await (await getRepo<TeamMember>("team_members")).findOne({ where: { id: input.authorId } });
  if (!author) throw new ApiError(400, "authorId does not reference an existing team member");
  const tags = await resolveTags(input.tags);
  return { category, author, tags };
}

export async function createBlogPost(input: BlogPostInput) {
  // categoryId/authorId/tags are pulled off so ...rest can be spread onto
  // the entity without them (the entity holds real relations, not raw ids/names).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, authorId, tags: tagNames, ...rest } = input;
  const { category, author, tags } = await resolveRelations(input);
  const repo = await getRepo<BlogPost>("blog_posts");
  const saved = await repo.save(repo.create({ ...rest, category, author, tags }));
  return getBlogPost(saved.id);
}

export async function updateBlogPost(id: string, input: BlogPostInput) {
  const repo = await getRepo<BlogPost>("blog_posts");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, authorId, tags: tagNames, ...rest } = input;
  const { category, author, tags } = await resolveRelations(input);
  Object.assign(existing, { ...rest, category, author, tags });
  const saved = await repo.save(existing);
  return getBlogPost(saved.id);
}

export async function softDeleteBlogPost(id: string) {
  const repo = await getRepo<BlogPost>("blog_posts");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return false;
  await repo.softDelete(id);
  return true;
}
