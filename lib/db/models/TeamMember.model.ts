import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable, uniqueWhileNotDeleted } from "@/lib/db/schemaHelpers";

const TeamMemberSchema = new Schema(
  {
    slug: { type: String, required: true, maxlength: 160 },
    name: { type: String, required: true, maxlength: 160 },
    role: { type: String, required: true, maxlength: 160 },
    bio: { type: String, required: true },
    avatar: { type: String, required: true, maxlength: 500 },
    yearsExperience: { type: Number, default: 0 },
    specialties: { type: [String], default: [] },
    linkedinUrl: { type: String, default: null, maxlength: 500 },
    instagramUrl: { type: String, default: null, maxlength: 500 },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  idSchemaOptions
);
softDeletable(TeamMemberSchema);
uniqueWhileNotDeleted(TeamMemberSchema, "slug", "uq_team_members_slug");

export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema, "team_members");
