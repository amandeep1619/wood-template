import { NextRequest } from "next/server";
import { getProject, softDeleteProject, updateProject } from "@/lib/api/projectsService";
import { projectInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getProject(id);
  if (!item) return notFound("Project");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = projectInputSchema.parse(await req.json());
  const updated = await updateProject(id, input);
  if (!updated) return notFound("Project");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await softDeleteProject(id);
  if (!deleted) return notFound("Project");
  return noContent();
});
