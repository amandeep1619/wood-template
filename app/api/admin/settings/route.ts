import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";

const COL = "settings";

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection(COL).find({}).toArray();
    const settings: Record<string, unknown> = {};
    for (const doc of docs) settings[doc.key] = doc.value;
    return NextResponse.json({ data: settings });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();
    const now = new Date();
    for (const [key, value] of Object.entries(body)) {
      await db.collection(COL).updateOne(
        { key },
        { $set: { key, value, updatedAt: now } },
        { upsert: true }
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
