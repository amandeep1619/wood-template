export * from "./base/Base.entity";
export * from "./base/Category.entity";

export * from "./AdminRole.entity";
export * from "./AdminUser.entity";

export * from "./ProjectCategory.entity";
export * from "./BlogCategory.entity";
export * from "./ServiceCategory.entity";

export * from "./Service.entity";
export * from "./ServiceImage.entity";
export * from "./ServiceBenefit.entity";
export * from "./ServiceProcessStep.entity";

export * from "./Project.entity";
export * from "./ProjectImage.entity";

export * from "./BlogPost.entity";
export * from "./Tag.entity";

export * from "./TeamMember.entity";
export * from "./Testimonial.entity";
export * from "./Faq.entity";

export * from "./ContactSubmission.entity";
export * from "./NewsletterSubscriber.entity";
export * from "./Setting.entity";

import { AdminRole } from "./AdminRole.entity";
import { AdminUser } from "./AdminUser.entity";
import { ProjectCategory } from "./ProjectCategory.entity";
import { BlogCategory } from "./BlogCategory.entity";
import { ServiceCategory } from "./ServiceCategory.entity";
import { Service } from "./Service.entity";
import { ServiceImage } from "./ServiceImage.entity";
import { ServiceBenefit } from "./ServiceBenefit.entity";
import { ServiceProcessStep } from "./ServiceProcessStep.entity";
import { Project } from "./Project.entity";
import { ProjectImage } from "./ProjectImage.entity";
import { BlogPost } from "./BlogPost.entity";
import { Tag } from "./Tag.entity";
import { TeamMember } from "./TeamMember.entity";
import { Testimonial } from "./Testimonial.entity";
import { Faq } from "./Faq.entity";
import { ContactSubmission } from "./ContactSubmission.entity";
import { NewsletterSubscriber } from "./NewsletterSubscriber.entity";
import { Setting } from "./Setting.entity";

/** Full entity list for the TypeORM DataSource — see ../data-source.ts */
export const entities = [
  AdminRole,
  AdminUser,
  ProjectCategory,
  BlogCategory,
  ServiceCategory,
  Service,
  ServiceImage,
  ServiceBenefit,
  ServiceProcessStep,
  Project,
  ProjectImage,
  BlogPost,
  Tag,
  TeamMember,
  Testimonial,
  Faq,
  ContactSubmission,
  NewsletterSubscriber,
  Setting,
];
