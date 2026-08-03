import { NextRequest } from "next/server";
import { createTestimonial, listTestimonials } from "@/lib/api/testimonialsService";
import { testimonialInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async () => {
  return okList(await listTestimonials());
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = testimonialInputSchema.parse(await req.json());
  const created = await createTestimonial(input);
  return ok(created, 201);
});
