import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

export type ContactSubmissionStatus = "new" | "contacted" | "quoted" | "won" | "lost";

const ContactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 160 },
    email: { type: String, required: true, maxlength: 255 },
    phone: { type: String, default: null, maxlength: 32 },
    /** Free text — the contact form's dropdown options don't map 1:1 to service slugs. */
    serviceInterest: { type: String, default: null, maxlength: 160 },
    budgetRange: { type: String, default: null, maxlength: 64 },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "quoted", "won", "lost"], default: "new" },
    handledBy: { type: Schema.Types.ObjectId, ref: "AdminUser", default: null },
  },
  idSchemaOptions
);

export const ContactSubmission =
  mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", ContactSubmissionSchema, "contact_submissions");
