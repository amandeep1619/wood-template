import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { AdminUser } from "./AdminUser.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("admin_roles")
export class AdminRole extends BaseEntity {
  /** Stable machine key, e.g. "admin", "editor" — new roles are added as rows, not migrations. */
  @Column({ type: "varchar", length: 32, unique: true })
  key!: string;

  @Column({ type: "varchar", length: 80 })
  name!: string;

  @OneToMany(() => AdminUser, (user) => user.role)
  users!: AdminUser[];
}
preserveClassName(AdminRole, "AdminRole");
