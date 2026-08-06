import { createCategoryModel } from "./categoryBase";

export const ProjectCategory = createCategoryModel(
  "ProjectCategory",
  "project_categories",
  "uq_project_categories_slug"
);
