import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}

/** Adds a nullable deletedAt column. TypeORM's soft-delete find options
 * (`softDelete()` / `withDeleted`) filter these rows out by default. Any
 * unique constraint on a soft-deletable entity must be a partial index
 * scoped to `deleted_at IS NULL` so a re-used slug/email doesn't collide
 * with a deleted row. */
export abstract class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt!: Date | null;
}
