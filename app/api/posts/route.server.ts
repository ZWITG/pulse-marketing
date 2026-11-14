import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db.server";
import type { StoredPost } from "@/lib/store";

const FILE = "posts.json";
const statuses = ["draft", "scheduled", "published"];

export async function GET() {
  return NextResponse.json(await readJson<StoredPost[]>(FILE, []));
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.content !== "string" || !b.content.trim() || !Array.isArray(b.platforms) || !statuses.includes(b.status)) {
    return NextResponse.json({ error: "content, platforms and status are required" }, { status: 400 });
  }
  const post: StoredPost = {
    id: crypto.randomUUID(),
    content: b.content,
    platforms: b.platforms.map(String),
    status: b.status,
    scheduledAt: typeof b.scheduledAt === "string" ? b.scheduledAt : "",
    createdAt: new Date().toISOString(),
  };
  const all = await readJson<StoredPost[]>(FILE, []);
  all.unshift(post);
  await writeJson(FILE, all);
  return NextResponse.json(post, { status: 201 });
}
