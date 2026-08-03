import { Entity, Index, OneToMany } from "typeorm";
import { CategoryBase } from "./base/Category.entity";
import { Project } from "./Project.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("project_categories")
@Index("uq_project_categories_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
export class ProjectCategory extends CategoryBase {
  @OneToMany(() => Project, (project) => project.category)
  projects!: Project[];
}
preserveClassName(ProjectCategory, "ProjectCategory");
