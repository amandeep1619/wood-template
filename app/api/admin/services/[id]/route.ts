import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, now } from "@/lib/api/mockDb";

const COL = "services";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = readCollection<Record<string, unknown>>(COL);
  const item = items.find((s) => s.id === id && !s.isDeleted);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: item });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const items = readCollection<Record<string, unknown>>(COL);
  const idx = items.findIndex((s) => s.id === id && !s.isDeleted);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = { ...items[idx], ...body, id, updatedAt: now() };
  writeCollection(COL, items);
  return NextResponse.json({ data: items[idx] });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = readCollection<Record<string, unknown>>(COL);
  const idx = items.findIndex((s) => s.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = { ...items[idx], isDeleted: true, updatedAt: now() };
  writeCollection(COL, items);
  return NextResponse.json({ success: true });
}
