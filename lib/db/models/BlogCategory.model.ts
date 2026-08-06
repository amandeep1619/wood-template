import { createCategoryModel } from "./categoryBase";

export const BlogCategory = createCategoryModel("BlogCategory", "blog_categories", "uq_blog_categories_slug");
