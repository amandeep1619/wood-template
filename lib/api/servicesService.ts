import { getMongoose } from "@/lib/db/mongoose";
import { Service } from "@/lib/db/models/Service.model";
import { ServiceCategory } from "@/lib/db/models/ServiceCategory.model";
import { ApiError } from "@/lib/api/http";
import type { ServiceInput } from "@/lib/api/schemas";

export type ServiceFilters = { status?: string; categoryId?: string; q?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function serialize(service: any) {
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
  await getMongoose();
  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.categoryId) where.category = filters.categoryId;
  if (filters.q) where.title = { $regex: filters.q, $options: "i" };
  const items = await Service.find(where).populate("category").sort({ createdAt: -1 });
  return items.map(serialize);
}

export async function getService(id: string) {
  await getMongoose();
  const item = await Service.findById(id).populate("category");
  return item ? serialize(item) : null;
}

async function resolveCategory(categoryId: string) {
  const category = await ServiceCategory.findById(categoryId);
  if (!category) throw new ApiError(400, "categoryId does not reference an existing category");
  return category;
}

export async function createService(input: ServiceInput) {
  await getMongoose();
  const { categoryId, ...rest } = input;
  const category = await resolveCategory(categoryId);
  const created = await Service.create({ ...rest, category: category.id });
  return getService(created.id);
}

export async function updateService(id: string, input: ServiceInput) {
  await getMongoose();
  const existing = await Service.findById(id);
  if (!existing) return null;

  const { categoryId, ...rest } = input;
  const category = await resolveCategory(categoryId);
  Object.assign(existing, { ...rest, category: category.id });
  const saved = await existing.save();
  return getService(saved.id);
}

export async function softDeleteService(id: string) {
  await getMongoose();
  const existing = await Service.findById(id);
  if (!existing) return false;
  existing.set("deletedAt", new Date());
  await existing.save();
  return true;
}
