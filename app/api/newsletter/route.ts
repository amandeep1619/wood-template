import { NextRequest } from "next/server";
import { getMongoose } from "@/lib/db/mongoose";
import { NewsletterSubscriber } from "@/lib/db/models/NewsletterSubscriber.model";
import { newsletterSubscribeInputSchema } from "@/lib/api/schemas";
import { fail, ok, withErrorHandling } from "@/lib/api/http";
import { getClientIp, rateLimit } from "@/lib/api/rateLimit";

export const POST = withErrorHandling(async (req: NextRequest) => {
  const ip = getClientIp(req);
  if (!rateLimit(`newsletter:${ip}`, 5, 10 * 60 * 1000)) {
    return fail(429, "Too many requests — please try again later");
  }

  await getMongoose();
  const { email } = newsletterSubscribeInputSchema.parse(await req.json());

  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    existing.status = "subscribed";
    existing.subscribedAt = new Date();
    existing.unsubscribedAt = null;
    await existing.save();
  } else {
    await NewsletterSubscriber.create({ email, status: "subscribed", subscribedAt: new Date() });
  }

  return ok({ success: true }, 201);
});
