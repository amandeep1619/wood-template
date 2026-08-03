import { Column, Entity, Index, OneToMany } from "typeorm";
import { SoftDeletableEntity } from "./base/Base.entity";
import { BlogPost } from "./BlogPost.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("team_members")
@Index("uq_team_members_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
export class TeamMember extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 160 })
  slug!: string;

  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "varchar", length: 160 })
  role!: string;

  @Column({ type: "text" })
  bio!: string;

  @Column({ type: "varchar", length: 500 })
  avatar!: string;

  @Column({ type: "smallint", default: 0 })
  yearsExperience!: number;

  @Column({ type: "text", array: true, default: () => "'{}'" })
  specialties!: string[];

  @Column({ type: "varchar", length: 500, nullable: true })
  linkedinUrl!: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  instagramUrl!: string | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @Column({ type: "boolean", default: true })
  isPublished!: boolean;

  @OneToMany(() => BlogPost, (post) => post.author)
  posts!: BlogPost[];
}
preserveClassName(TeamMember, "TeamMember");
