import { NextRequest, NextResponse } from "next/server";
import { signToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/api/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@tirath-wood-works.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ email, role: "admin", iat: Math.floor(Date.now() / 1000) });

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: SESSION_MAX_AGE,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
