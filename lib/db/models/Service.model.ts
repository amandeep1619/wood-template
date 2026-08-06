import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable, uniqueWhileNotDeleted, galleryImageSchema } from "@/lib/db/schemaHelpers";

export type ServiceStatus = "active" | "inactive";

/** Owned, cascade-deleted child rows in the old schema — embedded here
 * rather than separate collections. */
const serviceBenefitSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const serviceProcessStepSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true },
    icon: { type: String, required: true, maxlength: 32 },
    duration: { type: String, default: null, maxlength: 64 },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, maxlength: 200 },
    category: { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true },
    title: { type: String, required: true, maxlength: 200 },
    shortDescription: { type: String, required: true, maxlength: 500 },
    description: { type: String, required: true },
    icon: { type: String, required: true, maxlength: 32 },
    image: { type: String, required: true, maxlength: 500 },
    /** Display string only (e.g. "$5,000+"), not a real money amount. */
    startingPrice: { type: String, default: null, maxlength: 64 },
    features: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    sortOrder: { type: Number, default: 0 },
    gallery: { type: [galleryImageSchema], default: [] },
    benefits: { type: [serviceBenefitSchema], default: [] },
    processSteps: { type: [serviceProcessStepSchema], default: [] },
  },
  idSchemaOptions
);
softDeletable(ServiceSchema);
uniqueWhileNotDeleted(ServiceSchema, "slug", "uq_services_slug");

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema, "services");
