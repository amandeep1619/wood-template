import { ProjectCategory } from "@/lib/db/entities/ProjectCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers<ProjectCategory>("project_categories");

export { getOne as GET, update as PUT, remove as DELETE };
