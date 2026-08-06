import mongoose, { Schema } from "mongoose";
import { idSchemaOptions, softDeletable, uniqueWhileNotDeleted } from "@/lib/db/schemaHelpers";

export type BlogPostStatus = "draft" | "published" | "archived";

const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, maxlength: 200 },
    category: { type: Schema.Types.ObjectId, ref: "BlogCategory", required: true },
    author: { type: Schema.Types.ObjectId, ref: "TeamMember", required: true },
    title: { type: String, required: true, maxlength: 200 },
    excerpt: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true },
    coverImage: { type: String, required: true, maxlength: 500 },
    readTime: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    publishedAt: { type: Date, default: null },
    tags: { type: [{ type: Schema.Types.ObjectId, ref: "Tag" }], default: [] },
  },
  idSchemaOptions
);
softDeletable(BlogPostSchema);
uniqueWhileNotDeleted(BlogPostSchema, "slug", "uq_blog_posts_slug");

export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema, "blog_posts");
