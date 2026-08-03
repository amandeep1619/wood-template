import { NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/api/auth";
import { getActiveAdminUserById } from "@/lib/api/authService";
import { fail, ok, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async (req: NextRequest) => {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return fail(401, "Not authenticated");

  const payload = verifyToken(token);
  if (!payload || typeof payload.sub !== "string") return fail(401, "Invalid session");

  const user = await getActiveAdminUserById(payload.sub);
  if (!user) return fail(401, "Invalid session");

  return ok({ email: user.email, name: user.name, role: user.role.key });
});
