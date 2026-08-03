import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { Service } from "./Service.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("service_benefits")
export class ServiceBenefit extends BaseEntity {
  @ManyToOne(() => Service, (service) => service.benefits, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(ServiceBenefit, "ServiceBenefit");
