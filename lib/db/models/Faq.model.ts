import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

const FaqSchema = new Schema(
  {
    /** Set for a service-specific FAQ; null for a general FAQ (grouped by `topic` instead). */
    service: { type: Schema.Types.ObjectId, ref: "Service", default: null },
    /** Grouping label used only when `service` is null (e.g. "pricing", "process"). */
    topic: { type: String, default: null, maxlength: 80 },
    question: { type: String, required: true, maxlength: 300 },
    answer: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  idSchemaOptions
);

export const Faq = mongoose.models.Faq || mongoose.model("Faq", FaqSchema, "faqs");
