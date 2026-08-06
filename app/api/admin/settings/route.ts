import { NextRequest } from "next/server";
import { getMongoose } from "@/lib/db/mongoose";
import { Setting } from "@/lib/db/models/Setting.model";
import { settingsInputSchema } from "@/lib/api/schemas";
import { ok, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async () => {
  await getMongoose();
  const rows = await Setting.find();
  const settings: Record<string, unknown> = {};
  for (const row of rows) settings[row.key] = row.value;
  return ok(settings);
});

export const PUT = withErrorHandling(async (req: NextRequest) => {
  await getMongoose();
  const body = settingsInputSchema.parse(await req.json());
  await Promise.all(
    Object.entries(body).map(([key, value]) => Setting.findOneAndUpdate({ key }, { key, value }, { upsert: true }))
  );
  return ok({ success: true });
});
