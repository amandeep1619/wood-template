import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Deliberately not the same secret/scheme as admin sessions (lib/api/auth.ts):
// middleware.ts's session check only verifies the HMAC signature, not the
// payload shape, so a token signed with a shared secret could double as a
// forged admin session if it ever ended up in the session cookie.
const SECRET = process.env.CSRF_SECRET || "tirath-csrf-dev-secret-change-in-prod";
const MAX_AGE_SECONDS = 60 * 60; // 1 hour

export const CSRF_COOKIE = "csrf_token";
export const CSRF_HEADER = "x-csrf-token";

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

/** Random nonce + issued-at, HMAC-signed. Verification only needs the
 * signature and the timestamp — no server-side storage. */
export function generateCsrfToken(): string {
  const nonce = crypto.randomBytes(24).toString("base64url");
  const payload = `${nonce}.${Math.floor(Date.now() / 1000)}`;
  return `${payload}.${sign(payload)}`;
}

function isValidSignature(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const expected = sign(payload);
  const sigBuf = Buffer.from(sig, "base64url");
  const expBuf = Buffer.from(expected, "base64url");
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

function issuedAt(token: string): number | null {
  const parts = token.split(".");
  const iat = Number(parts[1]);
  return Number.isFinite(iat) ? iat : null;
}

/** Double-submit cookie check: the cookie is httpOnly (an attacker's script
 * can never read it, same-origin or not) and the header value is only ever
 * handed to legitimate same-origin JS via GET /api/csrf's response body —
 * a cross-site page can trigger the cookie to be sent, but can't read a
 * matching token to put in the header, so a forged request fails here. */
export function verifyCsrfToken(req: NextRequest): boolean {
  const cookieToken = req.cookies.get(CSRF_COOKIE)?.value;
  const headerToken = req.headers.get(CSRF_HEADER);
  if (!cookieToken || !headerToken) return false;
  if (cookieToken !== headerToken) return false;
  if (!isValidSignature(cookieToken)) return false;

  const iat = issuedAt(cookieToken);
  if (iat === null) return false;
  const ageSeconds = Math.floor(Date.now() / 1000) - iat;
  return ageSeconds >= 0 && ageSeconds <= MAX_AGE_SECONDS;
}

export function setCsrfCookie(res: NextResponse, token: string): void {
  res.cookies.set(CSRF_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}
