import { getMongoose } from "@/lib/db/mongoose";
import { Faq } from "@/lib/db/models/Faq.model";
import { Service } from "@/lib/db/models/Service.model";
import { ApiError } from "@/lib/api/http";
import type { FaqInput } from "@/lib/api/schemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function serialize(faq: any) {
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
  const service = await Service.findById(serviceId);
  if (!service) throw new ApiError(400, "serviceId does not reference an existing service");
  return service;
}

export async function listFaqs() {
  await getMongoose();
  const items = await Faq.find().populate("service").sort({ sortOrder: 1 });
  return items.map(serialize);
}

export async function getFaq(id: string) {
  await getMongoose();
  const item = await Faq.findById(id).populate("service");
  return item ? serialize(item) : null;
}

export async function createFaq(input: FaqInput) {
  await getMongoose();
  const { serviceId, ...rest } = input;
  const service = await resolveService(serviceId);
  const created = await Faq.create({ ...rest, service: service?.id ?? null });
  return getFaq(created.id);
}

export async function updateFaq(id: string, input: Partial<FaqInput>) {
  await getMongoose();
  const existing = await Faq.findById(id);
  if (!existing) return null;

  const { serviceId, ...rest } = input;
  Object.assign(existing, rest);
  if ("serviceId" in input) {
    const service = await resolveService(serviceId);
    existing.set("service", service?.id ?? null);
  }
  const saved = await existing.save();
  return getFaq(saved.id);
}

export async function deleteFaq(id: string) {
  await getMongoose();
  const result = await Faq.findByIdAndDelete(id);
  return !!result;
}
