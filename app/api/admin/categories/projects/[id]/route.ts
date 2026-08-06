import { ProjectCategory } from "@/lib/db/models/ProjectCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers(ProjectCategory);

export { getOne as GET, update as PUT, remove as DELETE };
