import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable, uniqueWhileNotDeleted } from "@/lib/db/schemaHelpers";

/** project_categories, blog_categories, and service_categories share an
 * identical shape — mirrors the old TypeORM `CategoryBase` abstract entity. */
export function createCategoryModel(name: string, collection: string, indexName: string) {
  const schema = new Schema(
    {
      slug: { type: String, required: true, maxlength: 160 },
      name: { type: String, required: true, maxlength: 160 },
      description: { type: String, default: null },
      isActive: { type: Boolean, default: true },
      sortOrder: { type: Number, default: 0 },
    },
    idSchemaOptions
  );
  softDeletable(schema);
  uniqueWhileNotDeleted(schema, "slug", indexName);
  return mongoose.models[name] || mongoose.model(name, schema, collection);
}
