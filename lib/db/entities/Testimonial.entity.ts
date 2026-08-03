import { Check, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SoftDeletableEntity } from "./base/Base.entity";
import { Project } from "./Project.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("testimonials")
@Check(`"rating" BETWEEN 1 AND 5`)
export class Testimonial extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "varchar", length: 160 })
  role!: string;

  @Column({ type: "varchar", length: 160, nullable: true })
  company!: string | null;

  @Column({ type: "varchar", length: 500 })
  avatar!: string;

  @Column({ type: "smallint" })
  rating!: number;

  @Column({ type: "text" })
  text!: string;

  @ManyToOne(() => Project, (project) => project.testimonials, { nullable: true })
  @JoinColumn({ name: "project_id" })
  project!: Project | null;

  @Column({ type: "boolean", default: false })
  featured!: boolean;

  @Column({ type: "boolean", default: true })
  isPublished!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(Testimonial, "Testimonial");
