import { BlogCategory } from "@/lib/db/models/BlogCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers(BlogCategory);

export { getOne as GET, update as PUT, remove as DELETE };
