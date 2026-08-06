import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

const TagSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, maxlength: 80 },
    name: { type: String, required: true, unique: true, maxlength: 80 },
  },
  idSchemaOptions
);

export const Tag = mongoose.models.Tag || mongoose.model("Tag", TagSchema, "tags");
