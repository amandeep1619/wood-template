import { NextRequest } from "next/server";
import { createFaq, listFaqs } from "@/lib/api/faqsService";
import { faqInputSchema } from "@/lib/api/schemas";
import { ok, okList, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async () => {
  return okList(await listFaqs());
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const input = faqInputSchema.parse(await req.json());
  const created = await createFaq(input);
  return ok(created, 201);
});
