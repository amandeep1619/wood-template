import { getRepo } from "@/lib/db/data-source";
import { Faq } from "@/lib/db/entities/Faq.entity";
import { Service } from "@/lib/db/entities/Service.entity";
import { ApiError } from "@/lib/api/http";
import type { FaqInput } from "@/lib/api/schemas";

const RELATIONS = { service: true };

function serialize(faq: Faq) {
  return {
    id: faq.id,
    serviceId: faq.service?.id ?? null,
    topic: faq.topic,
    question: faq.question,
    answer: faq.answer,
    isPublished: faq.isPublished,
    sortOrder: faq.sortOrder,
    createdAt: faq.createdAt,
    updatedAt: faq.updatedAt,
  };
}

async function resolveService(serviceId: string | null | undefined) {
  if (!serviceId) return null;
  const service = await (await getRepo<Service>("services")).findOne({ where: { id: serviceId } });
  if (!service) throw new ApiError(400, "serviceId does not reference an existing service");
  return service;
}

export async function listFaqs() {
  const repo = await getRepo<Faq>("faqs");
  const items = await repo.find({ relations: RELATIONS, order: { sortOrder: "ASC" } });
  return items.map(serialize);
}

export async function getFaq(id: string) {
  const repo = await getRepo<Faq>("faqs");
  const item = await repo.findOne({ where: { id }, relations: RELATIONS });
  return item ? serialize(item) : null;
}

export async function createFaq(input: FaqInput) {
  const { serviceId, ...rest } = input;
  const service = await resolveService(serviceId);
  const repo = await getRepo<Faq>("faqs");
  const saved = await repo.save(repo.create({ ...rest, service }));
  return getFaq(saved.id);
}

export async function updateFaq(id: string, input: Partial<FaqInput>) {
  const repo = await getRepo<Faq>("faqs");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return null;

  const { serviceId, ...rest } = input;
  const service = "serviceId" in input ? await resolveService(serviceId) : existing.service;
  Object.assign(existing, { ...rest, service });
  const saved = await repo.save(existing);
  return getFaq(saved.id);
}

export async function deleteFaq(id: string) {
  const repo = await getRepo<Faq>("faqs");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return false;
  await repo.remove(existing);
  return true;
}
