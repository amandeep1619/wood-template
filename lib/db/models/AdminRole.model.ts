import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

const AdminRoleSchema = new Schema(
  {
    /** Stable machine key, e.g. "admin", "editor" — new roles are added as documents, not migrations. */
    key: { type: String, required: true, unique: true, maxlength: 32 },
    name: { type: String, required: true, maxlength: 80 },
  },
  idSchemaOptions
);

export const AdminRole = mongoose.models.AdminRole || mongoose.model("AdminRole", AdminRoleSchema, "admin_roles");
