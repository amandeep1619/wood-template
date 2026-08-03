import { NextRequest } from "next/server";
import { getTeamMember, softDeleteTeamMember, updateTeamMember } from "@/lib/api/teamService";
import { teamMemberInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getTeamMember(id);
  if (!item) return notFound("Team member");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = teamMemberInputSchema.partial().parse(await req.json());
  const updated = await updateTeamMember(id, input);
  if (!updated) return notFound("Team member");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await softDeleteTeamMember(id);
  if (!deleted) return notFound("Team member");
  return noContent();
});
