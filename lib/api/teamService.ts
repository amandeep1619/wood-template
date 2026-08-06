import { getMongoose } from "@/lib/db/mongoose";
import { TeamMember } from "@/lib/db/models/TeamMember.model";
import type { TeamMemberInput } from "@/lib/api/schemas";

export async function listTeamMembers() {
  await getMongoose();
  return TeamMember.find().sort({ sortOrder: 1 });
}

export async function getTeamMember(id: string) {
  await getMongoose();
  return TeamMember.findById(id);
}

export async function createTeamMember(input: TeamMemberInput) {
  await getMongoose();
  return TeamMember.create(input);
}

export async function updateTeamMember(id: string, input: Partial<TeamMemberInput>) {
  await getMongoose();
  const existing = await TeamMember.findById(id);
  if (!existing) return null;
  Object.assign(existing, input);
  return existing.save();
}

export async function softDeleteTeamMember(id: string) {
  await getMongoose();
  const existing = await TeamMember.findById(id);
  if (!existing) return false;
  existing.set("deletedAt", new Date());
  await existing.save();
  return true;
}
