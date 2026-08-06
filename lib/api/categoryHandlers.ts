import { NextRequest } from "next/server";
import { Model } from "mongoose";
import { getMongoose } from "@/lib/db/mongoose";
import { categoryInputSchema } from "@/lib/api/schemas";
import { ok, okList, notFound, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

/** project_categories, blog_categories, and service_categories share an
 * identical shape and CRUD behavior — this factory avoids writing the same
 * five handlers three times. Soft-deleted documents are excluded automatically
 * by the model's softDeletable() query middleware, so reads need no explicit
 * `deletedAt` filter. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic CRUD factory, callers pass a concrete category Model
export function createCategoryHandlers(CategoryModel: Model<any>) {
  const list = withErrorHandling(async () => {
    await getMongoose();
    const items = await CategoryModel.find().sort({ sortOrder: 1 });
    return okList(items);
  });

  const create = withErrorHandling(async (req: NextRequest) => {
    await getMongoose();
    const body = categoryInputSchema.parse(await req.json());
    const saved = await CategoryModel.create(body);
    return ok(saved, 201);
  });

  const getOne = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
    await getMongoose();
    const { id } = await params;
    const item = await CategoryModel.findById(id);
    if (!item) return notFound("Category");
    return ok(item);
  });

  const update = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
    await getMongoose();
    const { id } = await params;
    const body = categoryInputSchema.partial().parse(await req.json());
    const item = await CategoryModel.findById(id);
    if (!item) return notFound("Category");
    Object.assign(item, body);
    await item.save();
    return ok(item);
  });

  const remove = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
    await getMongoose();
    const { id } = await params;
    const item = await CategoryModel.findById(id);
    if (!item) return notFound("Category");
    item.set("deletedAt", new Date());
    await item.save();
    return ok({ success: true });
  });

  return { list, create, getOne, update, remove };
}
