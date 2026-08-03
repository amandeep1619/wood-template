import { Entity, Index, OneToMany } from "typeorm";
import { CategoryBase } from "./base/Category.entity";
import { Service } from "./Service.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("service_categories")
@Index("uq_service_categories_slug", ["slug"], { unique: true, where: '"deleted_at" IS NULL' })
export class ServiceCategory extends CategoryBase {
  @OneToMany(() => Service, (service) => service.category)
  services!: Service[];
}
preserveClassName(ServiceCategory, "ServiceCategory");
