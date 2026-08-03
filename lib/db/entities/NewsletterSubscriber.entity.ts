import { Check, Column, Entity } from "typeorm";
import { BaseEntity } from "./base/Base.entity";
import { preserveClassName } from "./base/preserveClassName";

export type NewsletterSubscriberStatus = "subscribed" | "unsubscribed";

@Entity("newsletter_subscribers")
@Check(`"status" IN ('subscribed', 'unsubscribed')`)
export class NewsletterSubscriber extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 16, default: "subscribed" })
  status!: NewsletterSubscriberStatus;

  @Column({ type: "timestamptz" })
  subscribedAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  unsubscribedAt!: Date | null;
}
preserveClassName(NewsletterSubscriber, "NewsletterSubscriber");
