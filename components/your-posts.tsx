"use client";

import { useEffect, useState } from "react";
import { loadPosts, type StoredPost } from "@/lib/store";
import { platformMeta, type Platform } from "@/lib/mock-data";

export default function YourPosts() {
  const [posts, setPosts] = useState<StoredPost[]>([]);
  useEffect(() => setPosts(loadPosts()), []);

  if (posts.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-5 py-4">
        <h2 className="text-sm font-semibold">Your posts</h2>
      </div>
      <ul className="divide-y divide-neutral-100">
        {posts.map((p) => (
          <li key={p.id} className="flex items-center gap-4 px-5 py-3">
            <div className="flex -space-x-1">
              {p.platforms.map((pl) => {
                const meta = platformMeta[pl as Platform];
                return (
                  <span
                    key={pl}
                    className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold text-white ring-2 ring-white"
                    style={{ backgroundColor: meta?.color || "#888" }}
                  >
                    {meta?.initial || pl[0].toUpperCase()}
                  </span>
                );
              })}
            </div>
            <div className="min-w-0 flex-1 truncate text-sm">{p.content}</div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                p.status === "published" ? "bg-emerald-50 text-emerald-700" : p.status === "scheduled" ? "bg-blue-50 text-blue-700" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {p.status}
            </span>
            <span className="text-xs text-neutral-400">{new Date(p.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
