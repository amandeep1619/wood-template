import { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/api/projectsService";
import { projectInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const items = await listProjects({
    status: searchParams.get("status") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return okList(items);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = projectInputSchema.parse(await req.json());
  const created = await createProject(input);
  return ok(created, 201);
});
