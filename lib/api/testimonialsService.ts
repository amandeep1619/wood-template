import { getMongoose } from "@/lib/db/mongoose";
import { Testimonial } from "@/lib/db/models/Testimonial.model";
import { Project } from "@/lib/db/models/Project.model";
import { ApiError } from "@/lib/api/http";
import type { TestimonialInput } from "@/lib/api/schemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- populated Mongoose document
function serialize(testimonial: any) {
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
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(400, "projectId does not reference an existing project");
  return project;
}

export async function listTestimonials() {
  await getMongoose();
  const items = await Testimonial.find().populate("project").sort({ sortOrder: 1 });
  return items.map(serialize);
}

export async function getTestimonial(id: string) {
  await getMongoose();
  const item = await Testimonial.findById(id).populate("project");
  return item ? serialize(item) : null;
}

export async function createTestimonial(input: TestimonialInput) {
  await getMongoose();
  const { projectId, ...rest } = input;
  const project = await resolveProject(projectId);
  const created = await Testimonial.create({ ...rest, project: project?.id ?? null });
  return getTestimonial(created.id);
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>) {
  await getMongoose();
  const existing = await Testimonial.findById(id);
  if (!existing) return null;

  const { projectId, ...rest } = input;
  Object.assign(existing, rest);
  if ("projectId" in input) {
    const project = await resolveProject(projectId);
    existing.set("project", project?.id ?? null);
  }
  const saved = await existing.save();
  return getTestimonial(saved.id);
}

export async function softDeleteTestimonial(id: string) {
  await getMongoose();
  const existing = await Testimonial.findById(id);
  if (!existing) return false;
  existing.set("deletedAt", new Date());
  await existing.save();
  return true;
}
