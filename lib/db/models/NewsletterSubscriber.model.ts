import mongoose, { Schema } from "mongoose";
import { idSchemaOptions } from "@/lib/db/schemaHelpers";

export type NewsletterSubscriberStatus = "subscribed" | "unsubscribed";

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, maxlength: 255 },
    status: { type: String, enum: ["subscribed", "unsubscribed"], default: "subscribed" },
    subscribedAt: { type: Date, required: true },
    unsubscribedAt: { type: Date, default: null },
  },
  idSchemaOptions
);

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema, "newsletter_subscribers");
