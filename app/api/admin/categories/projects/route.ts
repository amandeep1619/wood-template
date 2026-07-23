import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, newId, newUUID, now } from "@/lib/api/mockDb";

const COL = "project-categories";

export async function GET() {
  const items = readCollection<Record<string, unknown>>(COL).filter((c) => !c.isDeleted);
  return NextResponse.json({ data: items, total: items.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readCollection<Record<string, unknown>>(COL);
  const ts = now();
  const item = { ...body, id: newId("pcat"), uuid: newUUID(), isDeleted: false, createdAt: ts, updatedAt: ts };
  items.push(item);
  writeCollection(COL, items);
  return NextResponse.json({ data: item }, { status: 201 });
}
