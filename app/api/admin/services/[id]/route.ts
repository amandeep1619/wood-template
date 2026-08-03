import { NextRequest } from "next/server";
import { getService, softDeleteService, updateService } from "@/lib/api/servicesService";
import { serviceInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getService(id);
  if (!item) return notFound("Service");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = serviceInputSchema.parse(await req.json());
  const updated = await updateService(id, input);
  if (!updated) return notFound("Service");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await softDeleteService(id);
  if (!deleted) return notFound("Service");
  return noContent();
});
