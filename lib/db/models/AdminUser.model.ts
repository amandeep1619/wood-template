import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, maxlength: 255 },
    passwordHash: { type: String, required: true, maxlength: 255 },
    name: { type: String, required: true, maxlength: 160 },
    role: { type: Schema.Types.ObjectId, ref: "AdminRole", required: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  idSchemaOptions
);

export const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema, "admin_users");
