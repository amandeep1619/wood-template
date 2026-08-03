import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/api/auth";
import { authenticateAdmin } from "@/lib/api/authService";
import { fail, withErrorHandling } from "@/lib/api/http";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export const POST = withErrorHandling(async (req: NextRequest) => {
  const { email, password } = loginSchema.parse(await req.json());

  const user = await authenticateAdmin(email, password);
  if (!user) return fail(401, "Invalid credentials");

  const token = signToken({
    sub: user.id,
    email: user.email,
    role: user.role.key,
    iat: Math.floor(Date.now() / 1000),
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
});
