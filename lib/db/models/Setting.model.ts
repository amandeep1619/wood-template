import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

/** Schemaless site config (e.g. contact info, social links). Looked up by
 * `key`, not `id` — there's no "list of settings" use case, only point
 * lookups by known key. */
const SettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, maxlength: 100 },
    value: { type: Schema.Types.Mixed, required: true },
  },
  idSchemaOptions
);

export const Setting = mongoose.models.Setting || mongoose.model("Setting", SettingSchema, "settings");
