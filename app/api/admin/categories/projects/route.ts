import { ProjectCategory } from "@/lib/db/models/ProjectCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers(ProjectCategory);

export { list as GET, create as POST };
