import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, newId, newUUID, now } from "@/lib/api/mockDb";

const COL = "projects";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");
  const q = searchParams.get("q")?.toLowerCase();

  let items = readCollection<Record<string, unknown>>(COL).filter((p) => !p.isDeleted);

  if (status) items = items.filter((p) => p.status === status);
  if (categoryId) items = items.filter((p) => p.categoryId === categoryId);
  if (q) items = items.filter((p) => String(p.title).toLowerCase().includes(q));

  return NextResponse.json({ data: items, total: items.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readCollection<Record<string, unknown>>(COL);
  const ts = now();
  const item = {
    ...body,
    id: newId("proj"),
    uuid: newUUID(),
    isDeleted: false,
    createdAt: ts,
    updatedAt: ts,
  };
  items.push(item);
  writeCollection(COL, items);
  return NextResponse.json({ data: item }, { status: 201 });
}
