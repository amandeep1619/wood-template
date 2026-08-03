import { Entity, Index, OneToMany } from "typeorm";
import { CategoryBase } from "./base/Category.entity";
import { BlogPost } from "./BlogPost.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("blog_categories")
@Index("uq_blog_categories_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
export class BlogCategory extends CategoryBase {
  @OneToMany(() => BlogPost, (post) => post.category)
  posts!: BlogPost[];
}
preserveClassName(BlogCategory, "BlogCategory");
