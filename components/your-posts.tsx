"use client";

import { useEffect, useState } from "react";
import { loadPosts, type StoredPost } from "@/lib/store";
import { platformMeta, type Platform } from "@/lib/mock-data";

const pill: Record<string, string> = { published: "pill pill-ok", scheduled: "pill pill-accent", draft: "pill" };

export default function YourPosts() {
  const [posts, setPosts] = useState<StoredPost[]>([]);
  useEffect(() => setPosts(loadPosts()), []);

  if (posts.length === 0) return null;

  return (
    <section className="card" aria-labelledby="yp-title">
      <div className="card-head" style={{ paddingBottom: 8 }}>
        <h2 id="yp-title" className="card-title">Your posts</h2>
        <span className="card-note">{posts.length} saved in this browser</span>
      </div>
      <div className="rows">
        {posts.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", minHeight: 45 }}>
            <span style={{ display: "flex", gap: 4 }}>
              {p.platforms.map((pl) => {
                const meta = platformMeta[pl as Platform];
                return (
                  <span key={pl} className="mark" style={{ background: meta?.color ?? "var(--muted)" }} title={meta?.label}>
                    {meta?.initial ?? pl[0].toUpperCase()}
                  </span>
                );
              })}
            </span>
            <span style={{ minWidth: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.content}</span>
            <span className={pill[p.status] ?? "pill"}>{p.status[0].toUpperCase() + p.status.slice(1)}</span>
            <span className="muted" style={{ fontSize: 13 }}>{new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
