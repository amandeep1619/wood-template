import { BlogCategory } from "@/lib/db/entities/BlogCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers<BlogCategory>("blog_categories");

export { list as GET, create as POST };
