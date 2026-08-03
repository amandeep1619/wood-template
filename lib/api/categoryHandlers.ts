import { NextRequest } from "next/server";
import { DeepPartial, FindOptionsOrder, FindOptionsWhere } from "typeorm";
import { getRepo } from "@/lib/db/data-source";
import { categoryInputSchema } from "@/lib/api/schemas";
import { ok, okList, notFound, withErrorHandling } from "@/lib/api/http";
import { CategoryBase } from "@/lib/db/entities/base/Category.entity";

type RouteParams = { params: Promise<{ id: string }> };

/** project_categories, blog_categories, and service_categories share an
 * identical shape and CRUD behavior — this factory avoids writing the same
 * five handlers three times. Soft-deleted rows are excluded automatically
 * by TypeORM for entities with a @DeleteDateColumn, so reads need no
 * explicit `deletedAt` filter.
 *
 * Takes a table name string, not the entity class — call as
 * `createCategoryHandlers<ProjectCategory>("project_categories")` since T
 * can't be inferred without a class argument. */
export function createCategoryHandlers<T extends CategoryBase>(tableName: string) {
  async function repo() {
    return getRepo<T>(tableName);
  }

  const list = withErrorHandling(async () => {
    const order = { sortOrder: "ASC" } as FindOptionsOrder<T>;
    const items = await (await repo()).find({ order });
    return okList(items);
  });

  const create = withErrorHandling(async (req: NextRequest) => {
    const body = categoryInputSchema.parse(await req.json()) as DeepPartial<T>;
    const r = await repo();
    const saved = await r.save(r.create(body));
    return ok(saved, 201);
  });

  const getOne = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
    const { id } = await params;
    const item = await (await repo()).findOne({ where: { id } as FindOptionsWhere<T> });
    if (!item) return notFound("Category");
    return ok(item);
  });

  const update = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
    const { id } = await params;
    const body = categoryInputSchema.partial().parse(await req.json()) as DeepPartial<T>;
    const r = await repo();
    const item = await r.findOne({ where: { id } as FindOptionsWhere<T> });
    if (!item) return notFound("Category");
    r.merge(item, body);
    return ok(await r.save(item));
  });

  const remove = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
    const { id } = await params;
    const r = await repo();
    const item = await r.findOne({ where: { id } as FindOptionsWhere<T> });
    if (!item) return notFound("Category");
    await r.softDelete(id);
    return ok({ success: true });
  });

  return { list, create, getOne, update, remove };
}
