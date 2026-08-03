import { ProjectCategory } from "@/lib/db/entities/ProjectCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers<ProjectCategory>("project_categories");

export { list as GET, create as POST };
