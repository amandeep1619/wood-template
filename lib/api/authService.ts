import bcrypt from "bcryptjs";
import { getRepo } from "@/lib/db/data-source";
import { AdminUser } from "@/lib/db/entities/AdminUser.entity";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/** Returns the user on success, updating lastLoginAt; null on any auth failure
 * (unknown email, wrong password, or a deactivated account). */
export async function authenticateAdmin(email: string, password: string) {
  const repo = await getRepo<AdminUser>("admin_users");
  const user = await repo.findOne({ where: { email } });
  if (!user || !user.isActive) return null;
  if (!(await bcrypt.compare(password, user.passwordHash))) return null;
  user.lastLoginAt = new Date();
  await repo.save(user);
  return user;
}

export async function getActiveAdminUserById(id: string) {
  const repo = await getRepo<AdminUser>("admin_users");
  const user = await repo.findOne({ where: { id } });
  return user && user.isActive ? user : null;
}
