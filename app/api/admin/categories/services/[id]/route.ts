import { ServiceCategory } from "@/lib/db/models/ServiceCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers(ServiceCategory);

export { getOne as GET, update as PUT, remove as DELETE };
