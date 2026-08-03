import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { BlogPost } from "./BlogPost.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("tags")
export class Tag extends BaseEntity {
  @Column({ type: "varchar", length: 80, unique: true })
  slug!: string;

  @Column({ type: "varchar", length: 80, unique: true })
  name!: string;

  @ManyToMany(() => BlogPost, (post) => post.tags)
  posts!: BlogPost[];
}
preserveClassName(Tag, "Tag");
