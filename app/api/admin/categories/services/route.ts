import { ServiceCategory } from "@/lib/db/entities/ServiceCategory.entity";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers<ServiceCategory>("service_categories");

export { list as GET, create as POST };
