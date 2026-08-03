import { Check, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SoftDeletableEntity } from "./base/Base.entity";
import { ServiceCategory } from "./ServiceCategory.entity";
import { ServiceImage } from "./ServiceImage.entity";
import { ServiceBenefit } from "./ServiceBenefit.entity";
import { ServiceProcessStep } from "./ServiceProcessStep.entity";
import { Project } from "./Project.entity";
import { Faq } from "./Faq.entity";
import { preserveClassName } from "./base/preserveClassName";

export type ServiceStatus = "active" | "inactive";

@Entity("services")
@Index("uq_services_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
@Check(`"status" IN ('active', 'inactive')`)
export class Service extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 200 })
  slug!: string;

  @ManyToOne(() => ServiceCategory, (category) => category.services, { nullable: false })
  @JoinColumn({ name: "category_id" })
  category!: ServiceCategory;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "varchar", length: 500 })
  shortDescription!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 32 })
  icon!: string;

  @Column({ type: "varchar", length: 500 })
  image!: string;

  /** Display string only (e.g. "$5,000+"), not a real money column —
   * pricing here is a marketing anchor, not a transactional amount. */
  @Column({ type: "varchar", length: 64, nullable: true })
  startingPrice!: string | null;

  @Column({ type: "text", array: true, default: () => "'{}'" })
  features!: string[];

  @Column({ type: "boolean", default: false })
  featured!: boolean;

  @Column({ type: "varchar", length: 16, default: "active" })
  status!: ServiceStatus;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @OneToMany(() => ServiceImage, (image) => image.service, { cascade: true })
  gallery!: ServiceImage[];

  @OneToMany(() => ServiceBenefit, (benefit) => benefit.service, { cascade: true })
  benefits!: ServiceBenefit[];

  @OneToMany(() => ServiceProcessStep, (step) => step.service, { cascade: true })
  processSteps!: ServiceProcessStep[];

  @OneToMany(() => Project, (project) => project.service)
  projects!: Project[];

  @OneToMany(() => Faq, (faq) => faq.service)
  faqs!: Faq[];
}
preserveClassName(Service, "Service");
