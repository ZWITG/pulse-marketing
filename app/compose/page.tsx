"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { accounts, platformMeta, type Platform } from "@/lib/mock-data";
import { addPost } from "@/lib/store";

const connected = accounts.filter((a) => a.connected);

export default function ComposePage() {
  const [selected, setSelected] = useState<Platform[]>(connected.map((a) => a.platform));
  const [content, setContent] = useState("");
  const [when, setWhen] = useState("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const router = useRouter();

  const suggestions = [
    "Behind the scenes of our latest campaign — swipe to see the full story. 📸",
    "We shipped a feature our users have been asking for. Here's what changed and why. 🧵",
    "5 metrics that actually matter for your marketing (and 3 that don't). Save this. 📊",
    "POV: you finally automated your social media and got your weekends back. ⚡",
    "New tutorial: automating your first marketing workflow in under 10 minutes. 🎬",
  ];

  const submit = () => {
    if (!content.trim() || selected.length === 0) return;
    addPost({
      content,
      platforms: selected,
      status: when === "now" ? "published" : "scheduled",
      scheduledAt: when === "now" ? new Date().toISOString() : scheduledAt,
    });
    router.push("/dashboard");
  };

  const toggle = (p: Platform) =>
    setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Compose post</h1>
      <p className="mt-1 text-sm text-neutral-500">Write once, publish everywhere.</p>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 space-y-5">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Channels</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {connected.map((a) => {
              const meta = platformMeta[a.platform];
              const on = selected.includes(a.platform);
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.platform)}
                  className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition ${
                    on ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-semibold text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.initial}
                  </span>
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="What's on your mind?"
            className="mt-2 w-full rounded-md border border-neutral-200 p-3 text-sm focus:border-neutral-400 focus:outline-none"
          />
          <div className="mt-1 flex justify-between text-xs text-neutral-400">
            <span>{content.length} chars</span>
            <span className="cursor-pointer text-neutral-500 hover:text-neutral-900" onClick={() => setContent(suggestions[Math.floor(Math.random() * suggestions.length)])}>
              ✨ Suggest caption
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-neutral-500">Schedule</label>
          <div className="mt-2 flex gap-2">
            {["now", "schedule"].map((w) => (
              <button
                key={w}
                onClick={() => setWhen(w)}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  when === w ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {w === "now" ? "Post now" : "Schedule"}
              </button>
            ))}
          </div>
          {when === "schedule" && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-3 w-full rounded-md border border-neutral-200 p-2 text-sm"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => { addPost({ content, platforms: selected, status: "draft", scheduledAt: "" }); router.push("/dashboard"); }} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50">Save draft</button>
          <button onClick={submit} className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            {when === "now" ? "Publish" : "Schedule post"}
          </button>
        </div>
      </div>
    </div>
  );
}
