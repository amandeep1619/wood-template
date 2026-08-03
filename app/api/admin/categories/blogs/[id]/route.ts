import { BlogCategory } from "@/lib/db/entities/BlogCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers<BlogCategory>("blog_categories");

export { getOne as GET, update as PUT, remove as DELETE };
