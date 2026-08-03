import { NextRequest } from "next/server";
import { getRepo } from "@/lib/db/data-source";
import { ContactSubmission } from "@/lib/db/entities/ContactSubmission.entity";
import { contactSubmissionInputSchema } from "@/lib/api/schemas";
import { fail, ok, withErrorHandling } from "@/lib/api/http";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";
import { verifyCsrfToken } from "@/lib/api/csrf";

export const POST = withErrorHandling(async (req: NextRequest) => {
  if (!verifyCsrfToken(req)) {
    return fail(403, "Invalid or expired form session — please reload the page and try again");
  }

  const ip = getClientIp(req);
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return fail(429, "Too many requests — please try again later");
  }

  const { service, budget, ...input } = contactSubmissionInputSchema.parse(await req.json());
  const repo = await getRepo<ContactSubmission>("contact_submissions");
  const saved = await repo.save(
    repo.create({ ...input, serviceInterest: service ?? null, budgetRange: budget ?? null })
  );
  return ok({ id: saved.id }, 201);
});
