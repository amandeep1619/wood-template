import { NextRequest } from "next/server";
import { deleteFaq, getFaq, updateFaq } from "@/lib/api/faqsService";
import { faqInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getFaq(id);
  if (!item) return notFound("FAQ");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = faqInputSchema.partial().parse(await req.json());
  const updated = await updateFaq(id, input);
  if (!updated) return notFound("FAQ");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await deleteFaq(id);
  if (!deleted) return notFound("FAQ");
  return noContent();
});
