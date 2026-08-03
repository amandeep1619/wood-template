import { getRepo } from "@/lib/db/data-source";
import { Testimonial } from "@/lib/db/entities/Testimonial.entity";
import { Project } from "@/lib/db/entities/Project.entity";
import { ApiError } from "@/lib/api/http";
import type { TestimonialInput } from "@/lib/api/schemas";

const RELATIONS = { project: true };

function serialize(testimonial: Testimonial) {
  return {
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    avatar: testimonial.avatar,
    rating: testimonial.rating,
    text: testimonial.text,
    projectId: testimonial.project?.id ?? null,
    featured: testimonial.featured,
    isPublished: testimonial.isPublished,
    sortOrder: testimonial.sortOrder,
    createdAt: testimonial.createdAt,
    updatedAt: testimonial.updatedAt,
  };
}

async function resolveProject(projectId: string | null | undefined) {
  if (!projectId) return null;
  const project = await (await getRepo<Project>("projects")).findOne({ where: { id: projectId } });
  if (!project) throw new ApiError(400, "projectId does not reference an existing project");
  return project;
}

export async function listTestimonials() {
  const repo = await getRepo<Testimonial>("testimonials");
  const items = await repo.find({ relations: RELATIONS, order: { sortOrder: "ASC" } });
  return items.map(serialize);
}

export async function getTestimonial(id: string) {
  const repo = await getRepo<Testimonial>("testimonials");
  const item = await repo.findOne({ where: { id }, relations: RELATIONS });
  return item ? serialize(item) : null;
}

export async function createTestimonial(input: TestimonialInput) {
  const { projectId, ...rest } = input;
  const project = await resolveProject(projectId);
  const repo = await getRepo<Testimonial>("testimonials");
  const saved = await repo.save(repo.create({ ...rest, project }));
  return getTestimonial(saved.id);
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>) {
  const repo = await getRepo<Testimonial>("testimonials");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return null;

  const { projectId, ...rest } = input;
  const project = "projectId" in input ? await resolveProject(projectId) : existing.project;
  Object.assign(existing, { ...rest, project });
  const saved = await repo.save(existing);
  return getTestimonial(saved.id);
}

export async function softDeleteTestimonial(id: string) {
  const repo = await getRepo<Testimonial>("testimonials");
  const existing = await repo.findOne({ where: { id } });
  if (!existing) return false;
  await repo.softDelete(id);
  return true;
}
