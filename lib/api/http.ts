import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** Throw from a service function to produce a specific status/message
 * (e.g. a referenced category doesn't exist) without leaking internals. */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function okList<T>(data: T[], total?: number) {
  return NextResponse.json({ data, total: total ?? data.length });
}

export function noContent() {
  return NextResponse.json({ success: true });
}

/** Logs the real error server-side; the client only ever sees `message`. */
export function fail(status: number, message: string, cause?: unknown) {
  if (cause) console.error(`[api] ${message}:`, cause);
  return NextResponse.json({ error: message }, { status });
}

export function notFound(resource = "Resource") {
  return fail(404, `${resource} not found`);
}

export function validationError(error: ZodError) {
  const message = error.issues.map((i) => `${i.path.join(".") || "value"}: ${i.message}`).join("; ");
  return fail(400, message);
}

/** Wraps a route handler so unexpected throws become a sanitized 500 instead of leaking internals. */
export function withErrorHandling<Args extends unknown[]>(
  handler: (...args: Args) => Promise<NextResponse>
) {
  return async (...args: Args): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      if (error instanceof ZodError) return validationError(error);
      if (error instanceof ApiError) return fail(error.status, error.message);
      return fail(500, "Internal server error", error);
    }
  };
}
