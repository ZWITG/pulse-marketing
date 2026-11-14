import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db.server";
import { publishPost } from "@/lib/publishers.server";
import type { StoredPost } from "@/lib/store";

const FILE = "posts.json";
const statuses = ["draft", "scheduled", "published"];

export async function GET() {
  return NextResponse.json(await readJson<StoredPost[]>(FILE, []));
}

// status "published" means "publish now": it is sent to each platform before replying.
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.content !== "string" || !b.content.trim() || !Array.isArray(b.platforms) || !statuses.includes(b.status)) {
    return NextResponse.json({ error: "content, platforms and status are required" }, { status: 400 });
  }
  if (b.status === "scheduled" && Number.isNaN(Date.parse(b.scheduledAt))) {
    return NextResponse.json({ error: "scheduledAt must be a valid date for scheduled posts" }, { status: 400 });
  }
  let post: StoredPost = {
    id: crypto.randomUUID(),
    content: b.content,
    platforms: b.platforms.map(String),
    status: b.status,
    scheduledAt: typeof b.scheduledAt === "string" ? b.scheduledAt : "",
    createdAt: new Date().toISOString(),
  };
  if (b.status === "published") post = await publishPost(post);
  const all = await readJson<StoredPost[]>(FILE, []);
  all.unshift(post);
  await writeJson(FILE, all);
  return NextResponse.json(post, { status: 201 });
}
