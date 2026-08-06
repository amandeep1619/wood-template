import { BlogCategory } from "@/lib/db/models/BlogCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers(BlogCategory);

export { list as GET, create as POST };
