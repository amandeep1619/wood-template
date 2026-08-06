import { createCategoryModel } from "./categoryBase";

export const ServiceCategory = createCategoryModel(
  "ServiceCategory",
  "service_categories",
  "uq_service_categories_slug"
);
