import { NextRequest } from "next/server";
import { createBlogPost, listBlogPosts } from "@/lib/api/blogPostsService";
import { blogPostInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const items = await listBlogPosts({
    status: searchParams.get("status") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return okList(items);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = blogPostInputSchema.parse(await req.json());
  const created = await createBlogPost(input);
  return ok(created, 201);
});
