import { ServiceCategory } from "@/lib/db/entities/ServiceCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { getOne, update, remove } = createCategoryHandlers<ServiceCategory>("service_categories");

export { getOne as GET, update as PUT, remove as DELETE };
