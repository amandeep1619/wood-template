import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { Service } from "./Service.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("service_images")
export class ServiceImage extends BaseEntity {
  @ManyToOne(() => Service, (service) => service.gallery, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @Column({ type: "varchar", length: 500 })
  url!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  altText!: string | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(ServiceImage, "ServiceImage");
