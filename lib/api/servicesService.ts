import { FindOptionsWhere, ILike } from "typeorm";
import { getRepo } from "@/lib/db/data-source";
import { Service } from "@/lib/db/entities/Service.entity";
import { ServiceCategory } from "@/lib/db/entities/ServiceCategory.entity";
import { ApiError } from "@/lib/api/http";
import type { ServiceInput } from "@/lib/api/schemas";

export type ServiceFilters = { status?: string; categoryId?: string; q?: string };

const RELATIONS = { category: true, gallery: true, benefits: true, processSteps: true };

function serialize(service: Service) {
  return {
    id: service.id,
    slug: service.slug,
    categoryId: service.category?.id ?? null,
    title: service.title,
    shortDescription: service.shortDescription,
    description: service.description,
    icon: service.icon,
    image: service.image,
    startingPrice: service.startingPrice,
    features: service.features,
    featured: service.featured,
    status: service.status,
    sortOrder: service.sortOrder,
    gallery: [...(service.gallery ?? [])].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url),
    benefits: [...(service.benefits ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((b) => ({ title: b.title, description: b.description })),
    processSteps: [...(service.processSteps ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ step: s.stepNumber, title: s.title, description: s.description, icon: s.icon, duration: s.duration })),
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  };
}

export async function listServices(filters: ServiceFilters) {
  const repo = await getRepo<Service>("services");
  const where: FindOptionsWhere<Service> = {};
  if (filters.status) where.status = filters.status as Service["status"];
  if (filters.categoryId) where.category = { id: filters.categoryId };
  if (filters.q) where.title = ILike(`%${filters.q}%`);
  const items = await repo.find({ where, relations: RELATIONS, order: { createdAt: "DESC" } });
  return items.map(serialize);
}

export async function getService(id: string) {
  const repo = await getRepo<Service>("services");
  const item = await repo.findOne({ where: { id }, relations: RELATIONS });
  return item ? serialize(item) : null;
}

async function resolveCategory(categoryId: string) {
  const category = await (await getRepo<ServiceCategory>("service_categories")).findOne({ where: { id: categoryId } });
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  return category;
}

export async function createService(input: ServiceInput) {
  const { categoryId, ...rest } = input;
  const category = await resolveCategory(categoryId);
  const repo = await getRepo<Service>("services");
  const saved = await repo.save(repo.create({ ...rest, category }));
  return getService(saved.id);
}

export async function updateService(id: string, input: ServiceInput) {
  const repo = await getRepo<Service>("services");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return null;

  const { categoryId, ...rest } = input;
  const category = await resolveCategory(categoryId);
  Object.assign(existing, { ...rest, category });
  const saved = await repo.save(existing);
  return getService(saved.id);
}

export async function softDeleteService(id: string) {
  const repo = await getRepo<Service>("services");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return false;
  await repo.softDelete(id);
  return true;
}
