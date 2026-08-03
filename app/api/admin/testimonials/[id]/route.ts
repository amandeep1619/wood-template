import { NextRequest } from "next/server";
import { getTestimonial, softDeleteTestimonial, updateTestimonial } from "@/lib/api/testimonialsService";
import { testimonialInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getTestimonial(id);
  if (!item) return notFound("Testimonial");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = testimonialInputSchema.partial().parse(await req.json());
  const updated = await updateTestimonial(id, input);
  if (!updated) return notFound("Testimonial");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await softDeleteTestimonial(id);
  if (!deleted) return notFound("Testimonial");
  return noContent();
});
