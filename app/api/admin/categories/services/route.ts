import { ServiceCategory } from "@/lib/db/models/ServiceCategory.model";
import { createCategoryHandlers } from "@/lib/api/categoryHandlers";

const { list, create } = createCategoryHandlers(ServiceCategory);

export { list as GET, create as POST };
