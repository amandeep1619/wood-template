import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { Service } from "./Service.entity";
import { preserveClassName } from "./base/preserveClassName";

@Entity("service_process_steps")
export class ServiceProcessStep extends BaseEntity {
  @ManyToOne(() => Service, (service) => service.processSteps, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @Column({ type: "int" })
  stepNumber!: number;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 32 })
  icon!: string;

  @Column({ type: "varchar", length: 64, nullable: true })
  duration!: string | null;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;
}
preserveClassName(ServiceProcessStep, "ServiceProcessStep");
