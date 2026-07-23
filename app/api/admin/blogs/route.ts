import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, newId, newUUID, now } from "@/lib/api/mockDb";

const COL = "blogs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");
  const q = searchParams.get("q")?.toLowerCase();

  let items = readCollection<Record<string, unknown>>(COL).filter((b) => !b.isDeleted);
  if (status) items = items.filter((b) => b.status === status);
  if (categoryId) items = items.filter((b) => b.categoryId === categoryId);
  if (q) items = items.filter((b) => String(b.title).toLowerCase().includes(q));

  items = [...items].sort((a, b) =>
    new Date(String(b.publishedAt)).getTime() - new Date(String(a.publishedAt)).getTime()
  );

  return NextResponse.json({ data: items, total: items.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = readCollection<Record<string, unknown>>(COL);
  const ts = now();
  const item = {
    ...body,
    id: newId("blog"),
    uuid: newUUID(),
    isDeleted: false,
    publishedAt: body.publishedAt || ts,
    createdAt: ts,
    updatedAt: ts,
  };
  items.push(item);
  writeCollection(COL, items);
  return NextResponse.json({ data: item }, { status: 201 });
}
