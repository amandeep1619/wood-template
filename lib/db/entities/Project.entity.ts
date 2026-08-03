import { Check, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SoftDeletableEntity } from "./base/Base.entity";
import { ProjectCategory } from "./ProjectCategory.entity";
import { ProjectImage } from "./ProjectImage.entity";
import { Service } from "./Service.entity";
import { Testimonial } from "./Testimonial.entity";
import { preserveClassName } from "./base/preserveClassName";

export type ProjectStatus = "draft" | "published" | "archived";

@Entity("projects")
@Index("uq_projects_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
@Check(`"status" IN ('draft', 'published', 'archived')`)
export class Project extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 200 })
  slug!: string;

  @ManyToOne(() => ProjectCategory, (category) => category.projects, { nullable: false })
  @JoinColumn({ name: "category_id" })
  category!: ProjectCategory;

  @ManyToOne(() => Service, (service) => service.projects, { nullable: true })
  @JoinColumn({ name: "service_id" })
  service!: Service | null;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "varchar", length: 500 })
  shortDescription!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  challenge!: string;

  @Column({ type: "text" })
  solution!: string;

  @Column({ type: "varchar", length: 200 })
  client!: string;

  @Column({ type: "varchar", length: 200 })
  location!: string;

  @Column({ type: "varchar", length: 64 })
  duration!: string;

  @Column({ type: "smallint" })
  year!: number;

  @Column({ type: "varchar", length: 500 })
  coverImage!: string;

  @Column({ type: "text", array: true, default: () => "'{}'" })
  materials!: string[];

  @Column({ type: "boolean", default: false })
  featured!: boolean;

  @Column({ type: "varchar", length: 16, default: "draft" })
  status!: ProjectStatus;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @Column({ type: "timestamptz", nullable: true })
  publishedAt!: Date | null;

  @OneToMany(() => ProjectImage, (image) => image.project, { cascade: true })
  gallery!: ProjectImage[];

  @OneToMany(() => Testimonial, (testimonial) => testimonial.project)
  testimonials!: Testimonial[];
}
preserveClassName(Project, "Project");
