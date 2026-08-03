import { FindOptionsWhere, ILike } from "typeorm";
import { getRepo } from "@/lib/db/data-source";
import { Project } from "@/lib/db/entities/Project.entity";
import { ProjectImage } from "@/lib/db/entities/ProjectImage.entity";
import { ProjectCategory } from "@/lib/db/entities/ProjectCategory.entity";
import { Service } from "@/lib/db/entities/Service.entity";
import { ApiError } from "@/lib/api/http";
import type { ProjectInput } from "@/lib/api/schemas";

export type ProjectFilters = { status?: string; categoryId?: string; q?: string };

const RELATIONS = { category: true, service: true, gallery: true };

function serialize(project: Project) {
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
  const repo = await getRepo<Project>("projects");
  const where: FindOptionsWhere<Project> = {};
  if (filters.status) where.status = filters.status as Project["status"];
  if (filters.categoryId) where.category = { id: filters.categoryId };
  if (filters.q) where.title = ILike(`%${filters.q}%`);
  const items = await repo.find({ where, relations: RELATIONS, order: { createdAt: "DESC" } });
  return items.map(serialize);
}

export async function getProject(id: string) {
  const repo = await getRepo<Project>("projects");
  const item = await repo.findOne({ where: { id }, relations: RELATIONS });
  return item ? serialize(item) : null;
}

async function resolveRelations(input: ProjectInput) {
  const category = await (await getRepo<ProjectCategory>("project_categories")).findOne({ where: { id: input.categoryId } });
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  let service: Service | null = null;
  if (input.serviceId) {
    service = await (await getRepo<Service>("services")).findOne({ where: { id: input.serviceId } });
    if (!service) throw new ApiError(400, "serviceId does not reference an existing service");
  }
  return { category, service };
}

export async function createProject(input: ProjectInput) {
  // categoryId/serviceId are pulled off so ...rest can be spread onto the
  // entity without them (the entity holds real relations, not id columns).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, serviceId, gallery, ...rest } = input;
  const { category, service } = await resolveRelations(input);
  const repo = await getRepo<Project>("projects");
  const project = repo.create({
    ...rest,
    category,
    service,
    gallery: gallery.map((url, sortOrder) => Object.assign(new ProjectImage(), { url, sortOrder })),
  });
  const saved = await repo.save(project);
  return getProject(saved.id);
}

export async function updateProject(id: string, input: ProjectInput) {
  const repo = await getRepo<Project>("projects");
  const existing = await repo.findOne({ where: { id }, relations: { gallery: true } });
  if (!existing) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId, serviceId, gallery, ...rest } = input;
  const { category, service } = await resolveRelations(input);
  if (existing.gallery?.length) {
    await (await getRepo<ProjectImage>("project_images")).remove(existing.gallery);
  }
  Object.assign(existing, {
    ...rest,
    category,
    service,
    gallery: gallery.map((url, sortOrder) => Object.assign(new ProjectImage(), { url, sortOrder })),
  });
  const saved = await repo.save(existing);
  return getProject(saved.id);
}

export async function softDeleteProject(id: string) {
  const repo = await getRepo<Project>("projects");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return false;
  await repo.softDelete(id);
  return true;
}
