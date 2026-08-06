import bcrypt from "bcryptjs";
import { getMongoose } from "@/lib/db/mongoose";
import { AdminUser } from "@/lib/db/models/AdminUser.model";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/** Returns the user on success, updating lastLoginAt; null on any auth failure
 * (unknown email, wrong password, or a deactivated account). */
export async function authenticateAdmin(email: string, password: string) {
  await getMongoose();
  const user = await AdminUser.findOne({ email }).populate("role");
  if (!user || !user.isActive) return null;
  if (!(await bcrypt.compare(password, user.passwordHash))) return null;
  user.lastLoginAt = new Date();
  await user.save();
  return user;
}

export async function getActiveAdminUserById(id: string) {
  await getMongoose();
  const user = await AdminUser.findById(id).populate("role");
  return user && user.isActive ? user : null;
}
