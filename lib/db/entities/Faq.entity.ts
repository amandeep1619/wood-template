import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { Service } from "./Service.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("faqs")
export class Faq extends BaseEntity {
  /** Set for a service-specific FAQ; null for a general FAQ (grouped by `topic` instead). */
  @ManyToOne(() => Service, (service) => service.faqs, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service!: Service | null;

  /** Grouping label used only when `service` is null (e.g. "pricing", "process"). */
  @Column({ type: "varchar", length: 80, nullable: true })
  topic!: string | null;

  @Column({ type: "varchar", length: 300 })
  question!: string;

  @Column({ type: "text" })
  answer!: string;

  @Column({ type: "boolean", default: true })
  isPublished!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(Faq, "Faq");
