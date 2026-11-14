import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/db.server";
import { publishPost } from "@/lib/publishers.server";
import type { StoredPost } from "@/lib/store";

const FILE = "posts.json";
let running = false;

// Publishes every scheduled post whose time has passed. Called once a minute by scripts/scheduler.mjs.
export async function POST(req: Request) {
  const secret = process.env.PULSE_CRON_SECRET;
  if (secret && req.headers.get("x-cron-secret") !== secret) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (running) return NextResponse.json({ published: 0, busy: true });
  running = true;
  try {
    const all = await readJson<StoredPost[]>(FILE, []);
    const now = Date.now();
    let done = 0;
    for (let i = 0; i < all.length; i++) {
      const p = all[i];
      if (p.status === "scheduled" && Date.parse(p.scheduledAt) <= now) {
        all[i] = await publishPost(p);
        done++;
      }
    }
    if (done) await writeJson(FILE, all);
    return NextResponse.json({ published: done });
  } finally {
    running = false;
  }
}
