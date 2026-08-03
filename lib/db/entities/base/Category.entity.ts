import { Column } from "typeorm";
import { SoftDeletableEntity } from "./Base.entity";

/** Shared shape for project/blog/service categories. Each concrete
 * subclass adds its own partial-unique index on `slug` scoped to
 * `deletedAt IS NULL` (see e.g. ProjectCategory.entity.ts) so a slug can
 * be reused once the category that held it is soft-deleted. */
export abstract class CategoryBase extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 160 })
  slug!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
