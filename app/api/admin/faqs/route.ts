import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";

const COL = "faqs";

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection(COL).find({}).sort({ category: 1, sortOrder: 1 }).toArray();
    return NextResponse.json({ data: docs });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();
    const now = new Date();
    const doc = { ...body, createdAt: now, updatedAt: now };
    const result = await db.collection(COL).insertOne(doc);
    return NextResponse.json({ data: { _id: result.insertedId, ...doc } }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
