import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { Project } from "./Project.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("project_images")
export class ProjectImage extends BaseEntity {
  @ManyToOne(() => Project, (project) => project.gallery, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @Column({ type: "varchar", length: 500 })
  url!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  altText!: string | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(ProjectImage, "ProjectImage");
