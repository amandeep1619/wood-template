import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, newId, newUUID, now } from "@/lib/api/mockDb";

const COL = "services";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.toLowerCase();

  let items = readCollection<Record<string, unknown>>(COL).filter((s) => !s.isDeleted);
  if (status) items = items.filter((s) => s.status === status);
  if (q) items = items.filter((s) => String(s.title).toLowerCase().includes(q));

  return NextResponse.json({ data: items, total: items.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readCollection<Record<string, unknown>>(COL);
  const ts = now();
  const item = {
    ...body,
    id: newId("svc"),
    uuid: newUUID(),
    isDeleted: false,
    createdAt: ts,
    updatedAt: ts,
  };
  items.push(item);
  writeCollection(COL, items);
  return NextResponse.json({ data: item }, { status: 201 });
}
