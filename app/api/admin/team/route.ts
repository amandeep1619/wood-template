import { NextRequest } from "next/server";
import { createTeamMember, listTeamMembers } from "@/lib/api/teamService";
import { teamMemberInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async () => {
  return okList(await listTeamMembers());
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = teamMemberInputSchema.parse(await req.json());
  const created = await createTeamMember(input);
  return ok(created, 201);
});
