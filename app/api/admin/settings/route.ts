import { NextRequest } from "next/server";
import { getRepo } from "@/lib/db/data-source";
import { Setting } from "@/lib/db/entities/Setting.entity";
import { settingsInputSchema } from "@/lib/api/schemas";
import { ok, withErrorHandling } from "@/lib/api/http";

export const GET = withErrorHandling(async () => {
  const repo = await getRepo<Setting>("settings");
  const rows = await repo.find();
  const settings: Record<string, unknown> = {};
  for (const row of rows) settings[row.key] = row.value;
  return ok(settings);
});

export const PUT = withErrorHandling(async (req: NextRequest) => {
  const body = settingsInputSchema.parse(await req.json());
  const repo = await getRepo<Setting>("settings");
  const rows: Pick<Setting, "key" | "value">[] = Object.entries(body).map(([key, value]) => ({ key, value }));
  if (rows.length > 0) await repo.upsert(rows, ["key"]);
  return ok({ success: true });
});
