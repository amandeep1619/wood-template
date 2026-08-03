import { NextResponse } from "next/server";
import { generateCsrfToken, setCsrfCookie } from "@/lib/api/csrf";

export async function GET() {
  const token = generateCsrfToken();
  const res = NextResponse.json({ token });
  setCsrfCookie(res, token);
  return res;
}
