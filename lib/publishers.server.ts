import crypto from "node:crypto";
import type { StoredPost } from "@/lib/store";

export interface Result { ok: boolean; detail: string }
type Publisher = (text: string) => Promise<Result>;

const env = (k: string) => process.env[k]?.trim() || "";
const enc = (s: string) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

const X_KEYS = ["X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_SECRET"];

// X: OAuth 1.0a user context. The JSON body is not part of the signature.
function xAuthHeader(method: string, url: string): string {
  const p: Record<string, string> = {
    oauth_consumer_key: env("X_API_KEY"),
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: env("X_ACCESS_TOKEN"),
    oauth_version: "1.0",
  };
  const paramStr = Object.keys(p).sort().map((k) => `${enc(k)}=${enc(p[k])}`).join("&");
  const base = [method, enc(url), enc(paramStr)].join("&");
  const key = `${enc(env("X_API_SECRET"))}&${enc(env("X_ACCESS_SECRET"))}`;
  p.oauth_signature = crypto.createHmac("sha1", key).update(base).digest("base64");
  return "OAuth " + Object.keys(p).sort().map((k) => `${enc(k)}="${enc(p[k])}"`).join(", ");
}

const x: Publisher = async (text) => {
  if (!X_KEYS.every(env)) return { ok: false, detail: "X keys missing in .env.local" };
  const url = "https://api.twitter.com/2/tweets";
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: xAuthHeader("POST", url), "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const j = (await r.json().catch(() => ({}))) as { data?: { id: string }; detail?: string; title?: string };
  return r.ok && j.data ? { ok: true, detail: `tweet ${j.data.id}` } : { ok: false, detail: j.detail || j.title || `X returned ${r.status}` };
};

const linkedin: Publisher = async (text) => {
  const token = env("LINKEDIN_ACCESS_TOKEN");
  const author = env("LINKEDIN_AUTHOR_URN"); // urn:li:person:xxxx
  if (!token || !author) return { ok: false, detail: "LinkedIn token or author URN missing in .env.local" };
  const r = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0" },
    body: JSON.stringify({
      author,
      lifecycleState: "PUBLISHED",
      specificContent: { "com.linkedin.ugc.ShareContent": { shareCommentary: { text }, shareMediaCategory: "NONE" } },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });
  const j = (await r.json().catch(() => ({}))) as { id?: string; message?: string };
  return r.ok ? { ok: true, detail: j.id || "posted" } : { ok: false, detail: j.message || `LinkedIn returned ${r.status}` };
};

export const publishers: Record<string, Publisher> = { x, linkedin };

export function configured(): Record<string, boolean> {
  return {
    x: X_KEYS.every(env),
    linkedin: !!env("LINKEDIN_ACCESS_TOKEN") && !!env("LINKEDIN_AUTHOR_URN"),
  };
}

// Tries every platform that has not succeeded yet. Never throws.
export async function publishPost(post: StoredPost): Promise<StoredPost> {
  const results = { ...(post.results ?? {}) };
  for (const platform of post.platforms) {
    if (results[platform]?.ok) continue;
    const pub = publishers[platform];
    if (!pub) { results[platform] = { ok: false, detail: "not supported yet" }; continue; }
    try { results[platform] = await pub(post.content); }
    catch (e) { results[platform] = { ok: false, detail: e instanceof Error ? e.message : "network error" }; }
  }
  const allOk = post.platforms.every((p) => results[p]?.ok);
  return { ...post, results, status: allOk ? "published" : "failed" };
}
