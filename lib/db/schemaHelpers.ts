import { Schema, Query } from "mongoose";

/** Merged into every schema's options so API responses expose a string
 * `id` (matching the old TypeORM uuid `id` contract) instead of Mongo's
 * `_id`/`__v`. `timestamps` replaces TypeORM's @CreateDateColumn/@UpdateDateColumn. */
export const idSchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: unknown, ret: Record<string, unknown>) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_doc: unknown, ret: Record<string, unknown>) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
} as const;

/** Adds a nullable `deletedAt` and excludes soft-deleted documents from every
 * find query by default (mirrors TypeORM's @DeleteDateColumn behavior, which
 * filters deleted rows out unless `withDeleted` is explicitly requested — no
 * call site in this codebase needs that, so it's not exposed here). */
export function softDeletable(schema: Schema) {
  schema.add({ deletedAt: { type: Date, default: null } });
  schema.pre(/^find/, function (this: Query<unknown, unknown>) {
    const filter = this.getFilter();
    if (filter.deletedAt === undefined) this.where({ deletedAt: null });
  });
}

/** Partial-unique index on `field`, scoped to `deletedAt: null` — a slug can
 * be reused once the row holding it is soft-deleted. Requires softDeletable(). */
export function uniqueWhileNotDeleted(schema: Schema, field: string, indexName: string) {
  schema.index({ [field]: 1 }, { unique: true, partialFilterExpression: { deletedAt: null }, name: indexName });
}

/** Shared shape for embedded gallery images (Project.gallery, Service.gallery) —
 * these are owned, cascade-deleted child rows in the old schema, so they're
 * embedded subdocuments here rather than a separate collection. */
export const galleryImageSchema = new Schema(
  {
    url: { type: String, required: true, maxlength: 500 },
    altText: { type: String, default: null, maxlength: 255 },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);
