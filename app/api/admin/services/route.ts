import { NextRequest } from "next/server";
import { createService, listServices } from "@/lib/api/servicesService";
import { serviceInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const items = await listServices({
    status: searchParams.get("status") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return okList(items);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = serviceInputSchema.parse(await req.json());
  const created = await createService(input);
  return ok(created, 201);
});
