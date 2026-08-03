import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { preserveClassName } from "./base/preserveClassName";

/** Schemaless site config (e.g. contact info, social links). Keyed by
 * `key`, not a uuid — there's no "list of settings" use case, only
 * point lookups by known key. */
@Entity("settings")
export class Setting {
  @PrimaryColumn({ type: "varchar", length: 100 })
  key!: string;

  @Column({ type: "jsonb" })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jsonb column, deliberately shapeless
  value!: any;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
preserveClassName(Setting, "Setting");
