"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { accounts, platformMeta, type Platform } from "@/lib/mock-data";
import { addPost } from "@/lib/store";

const connected = accounts.filter((a) => a.connected);

const suggestions = [
  "Behind the scenes of our latest campaign. Swipe to see the full story.",
  "We shipped a feature our users have been asking for. Here's what changed and why.",
  "5 metrics that actually matter for your marketing, and 3 that don't. Save this.",
  "You automated your social media and got your weekends back.",
  "New tutorial: automating your first marketing workflow in under 10 minutes.",
];

const seg = (on: boolean) =>
  `h-8 px-3 rounded-md border text-sm ${on ? "border-[#111827] bg-[#111827] text-white" : "border-[#e5e7eb] bg-white text-[#5f6672] hover:text-[#111827]"}`;

export default function ComposePage() {
  const [selected, setSelected] = useState<Platform[]>(connected.map((a) => a.platform));
  const [content, setContent] = useState("");
  const [when, setWhen] = useState("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const router = useRouter();

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

  const toggle = (p: Platform) => setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  return (
    <div className="px-6 py-8 max-w-[860px]">
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Compose</h1>
        <p className="mt-1 text-sm text-[#5f6672]">Write once and publish to {selected.length} of {connected.length} channels.</p>
      </div>

      <div className="border border-[#e5e7eb] rounded-lg bg-white divide-y divide-[#f2f2f2]">
        <div className="px-5 py-4">
          <div className="text-xs text-[#5f6672] mb-2">Channels</div>
          <div className="flex flex-wrap gap-2">
            {connected.map((a) => {
              const meta = platformMeta[a.platform];
              const on = selected.includes(a.platform);
              return (
                <button key={a.id} onClick={() => toggle(a.platform)} className={`${seg(on)} flex items-center gap-2`}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: on ? "#fff" : meta.color }} />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs text-[#5f6672]">Post</span>
            <button
              className="text-xs text-[#6b1d3e] hover:underline"
              onClick={() => setContent(suggestions[Math.floor(Math.random() * suggestions.length)])}
            >
              Suggest a caption
            </button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="What do you want to say?"
            className="w-full rounded-md border border-[#d1d5db] p-3 text-sm focus:border-[#b8336a] focus:outline-none"
          />
          <div className="mt-1 text-xs tabular-nums text-[#5f6672] text-right">{content.length} characters</div>
        </div>

        <div className="px-5 py-4">
          <div className="text-xs text-[#5f6672] mb-2">When</div>
          <div className="flex gap-2">
            <button onClick={() => setWhen("now")} className={seg(when === "now")}>Now</button>
            <button onClick={() => setWhen("schedule")} className={seg(when === "schedule")}>Schedule</button>
          </div>
          {when === "schedule" && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-3 h-8 rounded-md border border-[#d1d5db] px-2 text-sm"
            />
          )}
        </div>

        <div className="flex justify-end gap-2 px-5 py-4">
          <button
            onClick={() => { addPost({ content, platforms: selected, status: "draft", scheduledAt: "" }); router.push("/dashboard"); }}
            className="h-8 px-3 rounded-md border border-[#e5e7eb] text-sm text-[#5f6672] hover:text-[#111827]"
          >
            Save draft
          </button>
          <button onClick={submit} className="h-8 px-3 rounded-md bg-[#b8336a] text-white text-sm font-medium hover:opacity-90">
            {when === "now" ? "Publish" : "Schedule post"}
          </button>
        </div>
      </div>
    </div>
  );
}
