import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable, uniqueWhileNotDeleted, galleryImageSchema } from "@/lib/db/schemaHelpers";

export type ProjectStatus = "draft" | "published" | "archived";

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, maxlength: 200 },
    category: { type: Schema.Types.ObjectId, ref: "ProjectCategory", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", default: null },
    title: { type: String, required: true, maxlength: 200 },
    shortDescription: { type: String, required: true, maxlength: 500 },
    description: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    client: { type: String, required: true, maxlength: 200 },
    location: { type: String, required: true, maxlength: 200 },
    duration: { type: String, required: true, maxlength: 64 },
    year: { type: Number, required: true },
    coverImage: { type: String, required: true, maxlength: 500 },
    materials: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    sortOrder: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },
    gallery: { type: [galleryImageSchema], default: [] },
  },
  idSchemaOptions
);
softDeletable(ProjectSchema);
uniqueWhileNotDeleted(ProjectSchema, "slug", "uq_projects_slug");

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema, "projects");
