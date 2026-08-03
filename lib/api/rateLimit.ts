import { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

/** Fixed-window limiter, in-memory. Fine for a single instance; if this app
 * ever runs multiple instances behind a load balancer, back this with Redis
 * instead so limits are shared across instances. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
