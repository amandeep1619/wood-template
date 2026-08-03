import { Check, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { AdminUser } from "./AdminUser.entity";
import { preserveClassName } from "./base/preserveClassName";

export type ContactSubmissionStatus = "new" | "contacted" | "quoted" | "won" | "lost";

@Entity("contact_submissions")
@Check(`"status" IN ('new', 'contacted', 'quoted', 'won', 'lost')`)
export class ContactSubmission extends BaseEntity {
  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  phone!: string | null;

  /** Free text — the contact form's dropdown options don't map 1:1 to service slugs. */
  @Column({ type: "varchar", length: 160, nullable: true })
  serviceInterest!: string | null;

  @Column({ type: "varchar", length: 64, nullable: true })
  budgetRange!: string | null;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "varchar", length: 16, default: "new" })
  status!: ContactSubmissionStatus;

  @ManyToOne(() => AdminUser, { nullable: true })
  @JoinColumn({ name: "handled_by" })
  handledBy!: AdminUser | null;
}
preserveClassName(ContactSubmission, "ContactSubmission");
