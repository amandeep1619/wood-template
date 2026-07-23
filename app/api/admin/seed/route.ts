import { NextResponse } from "next/server";
import { readCollection } from "@/lib/api/mockDb";

export async function GET() {
  return NextResponse.json({
    message: "Mock data is loaded from JSON files in data/mock/",
    collections: {
      projects: readCollection("projects").length,
      services: readCollection("services").length,
      blogs: readCollection("blogs").length,
      "project-categories": readCollection("project-categories").length,
      "blog-categories": readCollection("blog-categories").length,
    },
  });
}
