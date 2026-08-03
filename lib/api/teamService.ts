import { getRepo } from "@/lib/db/data-source";
import { TeamMember } from "@/lib/db/entities/TeamMember.entity";
import type { TeamMemberInput } from "@/lib/api/schemas";

async function repo() {
  return getRepo<TeamMember>("team_members");
}

export async function listTeamMembers() {
  return (await repo()).find({ order: { sortOrder: "ASC" } });
}

export async function getTeamMember(id: string) {
  return (await repo()).findOne({ where: { id } });
}

export async function createTeamMember(input: TeamMemberInput) {
  const r = await repo();
  return r.save(r.create(input));
}

export async function updateTeamMember(id: string, input: Partial<TeamMemberInput>) {
  const r = await repo();
  const existing = await r.findOne({ where: { id } });
  if (!existing) return null;
  r.merge(existing, input);
  return r.save(existing);
}

export async function softDeleteTeamMember(id: string) {
  const r = await repo();
  const existing = await r.findOne({ where: { id } });
  if (!existing) return false;
  await r.softDelete(id);
  return true;
}
