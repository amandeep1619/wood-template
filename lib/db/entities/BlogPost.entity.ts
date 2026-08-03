import { Check, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { SoftDeletableEntity } from "./base/Base.entity";
import { BlogCategory } from "./BlogCategory.entity";
import { TeamMember } from "./TeamMember.entity";
import { Tag } from "./Tag.entity";
import { preserveClassName } from "./base/preserveClassName";

export type BlogPostStatus = "draft" | "published" | "archived";

@Entity("blog_posts")
@Index("uq_blog_posts_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
@Check(`"status" IN ('draft', 'published', 'archived')`)
export class BlogPost extends SoftDeletableEntity {
  @Column({ type: "varchar", length: 200 })
  slug!: string;

  @ManyToOne(() => BlogCategory, (category) => category.posts, { nullable: false })
  @JoinColumn({ name: "category_id" })
  category!: BlogCategory;

  @ManyToOne(() => TeamMember, (member) => member.posts, { nullable: false })
  @JoinColumn({ name: "author_id" })
  author!: TeamMember;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "varchar", length: 500 })
  excerpt!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "varchar", length: 500 })
  coverImage!: string;

  @Column({ type: "smallint", default: 5 })
  readTime!: number;

  @Column({ type: "boolean", default: false })
  featured!: boolean;

  @Column({ type: "varchar", length: 16, default: "draft" })
  status!: BlogPostStatus;

  @Column({ type: "timestamptz", nullable: true })
  publishedAt!: Date | null;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: "blog_post_tags",
    joinColumn: { name: "blog_post_id" },
    inverseJoinColumn: { name: "tag_id" },
  })
  tags!: Tag[];
}
preserveClassName(BlogPost, "BlogPost");
