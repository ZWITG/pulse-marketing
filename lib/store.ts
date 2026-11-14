"use client";

export interface StoredPost {
  id: string;
  content: string;
  platforms: string[];
  status: "draft" | "scheduled" | "published";
  scheduledAt: string;
  createdAt: string;
}

const KEY = "pulse.posts";

export function loadPosts(): StoredPost[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function savePosts(posts: StoredPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function addPost(p: Omit<StoredPost, "id" | "createdAt">): StoredPost {
  const post: StoredPost = { ...p, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  const all = loadPosts();
  all.unshift(post);
  savePosts(all);
  return post;
}
