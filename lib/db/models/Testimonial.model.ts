import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable } from "@/lib/db/schemaHelpers";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 160 },
    role: { type: String, required: true, maxlength: 160 },
    company: { type: String, default: null, maxlength: 160 },
    avatar: { type: String, required: true, maxlength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", default: null },
    featured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  idSchemaOptions
);
softDeletable(TestimonialSchema);

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema, "testimonials");
