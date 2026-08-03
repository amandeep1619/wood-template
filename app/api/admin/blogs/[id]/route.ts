import { NextRequest } from "next/server";
import { getBlogPost, softDeleteBlogPost, updateBlogPost } from "@/lib/api/blogPostsService";
import { blogPostInputSchema } from "@/lib/api/schemas";
import { noContent, notFound, ok, withErrorHandling } from "@/lib/api/http";

type RouteParams = { params: Promise<{ id: string }> };

export const GET = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const item = await getBlogPost(id);
  if (!item) return notFound("Blog post");
  return ok(item);
});

export const PUT = withErrorHandling(async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const input = blogPostInputSchema.parse(await req.json());
  const updated = await updateBlogPost(id, input);
  if (!updated) return notFound("Blog post");
  return ok(updated);
});

export const DELETE = withErrorHandling(async (_req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;
  const deleted = await softDeleteBlogPost(id);
  if (!deleted) return notFound("Blog post");
  return noContent();
});
