import { getMongoose } from "@/lib/db/mongoose";
import { Project } from "@/lib/db/models/Project.model";
import { ProjectCategory } from "@/lib/db/models/ProjectCategory.model";
import { Service } from "@/lib/db/models/Service.model";
import { ApiError } from "@/lib/api/http";
import type { ProjectInput } from "@/lib/api/schemas";

export type ProjectFilters = { status?: string; categoryId?: string; q?: string };

const RELATIONS = ["category", "service"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function serialize(project: any) {
  return {
    id: project.id,
    slug: project.slug,
    categoryId: project.category?.id ?? null,
    serviceId: project.service?.id ?? null,
    title: project.title,
    shortDescription: project.shortDescription,
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    client: project.client,
    location: project.location,
    duration: project.duration,
    year: project.year,
    coverImage: project.coverImage,
    gallery: [...(project.gallery ?? [])].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
    materials: project.materials,
    featured: project.featured,
    status: project.status,
    sortOrder: project.sortOrder,
    publishedAt: project.publishedAt,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export async function listProjects(filters: ProjectFilters) {
  await getMongoose();
  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.categoryId) where.category = filters.categoryId;
  if (filters.q) where.title = { $regex: filters.q, $options: "i" };
  const items = await Project.find(where).populate(RELATIONS).sort({ createdAt: -1 });
  return items.map(serialize);
}

export async function getProject(id: string) {
  await getMongoose();
  const item = await Project.findById(id).populate(RELATIONS);
  return item ? serialize(item) : null;
}

async function resolveRelations(input: ProjectInput) {
  const category = await ProjectCategory.findById(input.categoryId);
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  let service = null;
  if (input.serviceId) {
    service = await Service.findById(input.serviceId);
    if (!service) throw new ApiError(400, "serviceId does not reference an existing service");
  }
  return { category, service };
}

export async function createProject(input: ProjectInput) {
  await getMongoose();
  // categoryId/serviceId/gallery are pulled off so ...rest can be spread
  // without them (the document holds resolved refs and mapped subdocuments).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, serviceId, gallery, ...rest } = input;
  const { category, service } = await resolveRelations(input);
  const created = await Project.create({
    ...rest,
    category: category.id,
    service: service?.id ?? null,
    gallery: gallery.map((url, sortOrder) => ({ url, sortOrder })),
  });
  return getProject(created.id);
}

export async function updateProject(id: string, input: ProjectInput) {
  await getMongoose();
  const existing = await Project.findById(id);
  if (!existing) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, serviceId, gallery, ...rest } = input;
  const { category, service } = await resolveRelations(input);
  Object.assign(existing, {
    ...rest,
    category: category.id,
    service: service?.id ?? null,
    gallery: gallery.map((url, sortOrder) => ({ url, sortOrder })),
  });
  const saved = await existing.save();
  return getProject(saved.id);
}

export async function softDeleteProject(id: string) {
  await getMongoose();
  const existing = await Project.findById(id);
  if (!existing) return false;
  existing.set("deletedAt", new Date());
  await existing.save();
  return true;
}
