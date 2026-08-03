import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { AdminRole } from "./AdminRole.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("admin_users")
export class AdminUser extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @ManyToOne(() => AdminRole, (role) => role.users, { nullable: false, eager: true })
  @JoinColumn({ name: "role_id" })
  role!: AdminRole;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "timestamptz", nullable: true })
  lastLoginAt!: Date | null;
}
preserveClassName(AdminUser, "AdminUser");
