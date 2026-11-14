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

const limits: Partial<Record<Platform, number>> = { x: 280, linkedin: 3000, instagram: 2200, tiktok: 2200, facebook: 63206 };

export default function ComposePage() {
  const [selected, setSelected] = useState<Platform[]>(connected.map((a) => a.platform));
  const [content, setContent] = useState("");
  const [when, setWhen] = useState<"now" | "schedule">("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const [next, setNext] = useState(0);
  const router = useRouter();

  const over = selected.filter((p) => limits[p] && content.length > (limits[p] as number));
  const missingTime = when === "schedule" && !scheduledAt;
  const canSend = content.trim().length > 0 && selected.length > 0 && over.length === 0 && !missingTime;

  const submit = () => {
    if (!canSend) return;
    addPost({
      content,
      platforms: selected,
      status: when === "now" ? "published" : "scheduled",
      scheduledAt: when === "now" ? new Date().toISOString() : scheduledAt,
    });
    router.push("/dashboard/");
  };
  const saveDraft = () => {
    if (!content.trim()) return;
    addPost({ content, platforms: selected, status: "draft", scheduledAt: "" });
    router.push("/dashboard/");
  };
  const toggle = (p: Platform) => setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  const suggest = () => {
    setContent(suggestions[next % suggestions.length]);
    setNext(next + 1);
  };

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Compose</h1>
          <p className="page-sub">Write once and publish to {selected.length} of {connected.length} channels.</p>
        </div>
      </div>

      <div className="grid-main">
        <section className="card" style={{ minWidth: 0 }} aria-label="Post">
          <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
            <div className="label">Channels</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {connected.map((a) => {
                const m = platformMeta[a.platform];
                return (
                  <button key={a.id} className="chip" aria-pressed={selected.includes(a.platform)} onClick={() => toggle(a.platform)}>
                    <span className="mark" style={{ background: m.color, width: 18, height: 18, fontSize: 10 }}>{m.initial}</span>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label className="label" htmlFor="body" style={{ margin: 0 }}>Post</label>
              <button className="btn btn-quiet" style={{ height: 28 }} onClick={suggest}>Suggest a caption</button>
            </div>
            <textarea id="body" className="field" rows={7} style={{ width: "100%", height: "auto", padding: 12, resize: "vertical" }} value={content} onChange={(e) => setContent(e.target.value)} placeholder="What do you want to say?" />
            <div className="card-note" style={{ marginTop: 6, color: over.length ? "var(--negative)" : undefined }}>
              {content.length} characters
              {over.length > 0 && ` · too long for ${over.map((p) => platformMeta[p].label).join(", ")} (${limits[over[0]]} max)`}
            </div>
          </div>

          <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
            <div className="label">When</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <button className="chip" aria-pressed={when === "now"} onClick={() => setWhen("now")}>Publish now</button>
              <button className="chip" aria-pressed={when === "schedule"} onClick={() => setWhen("schedule")}>Schedule</button>
              {when === "schedule" && (
                <input type="datetime-local" className="field" aria-label="Publish at" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
              )}
            </div>
          </div>

          <div style={{ padding: 16, display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button className="btn" onClick={saveDraft} disabled={!content.trim()}>Save draft</button>
            <button className="btn btn-primary" onClick={submit} disabled={!canSend}>
              {when === "now" ? "Publish" : "Schedule post"}
            </button>
          </div>
        </section>

        <aside style={{ display: "grid", gap: 24, minWidth: 0, gridTemplateColumns: "minmax(0, 1fr)", alignContent: "start" }}>
          <section className="card" aria-labelledby="pv-title">
            <div className="card-head" style={{ paddingBottom: 8 }}>
              <h2 id="pv-title" className="card-title">Preview</h2>
              <span className="card-note">Fieldnote Studio</span>
            </div>
            <div style={{ padding: "4px 20px 20px" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                {selected.length === 0 && <span className="muted">No channel selected</span>}
                {selected.map((p) => (
                  <span key={p} className="mark" style={{ background: platformMeta[p].color }} title={platformMeta[p].label}>{platformMeta[p].initial}</span>
                ))}
              </div>
              <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: content ? undefined : "var(--muted)" }}>{content || "Your post appears here."}</p>
              <div className="card-note" style={{ marginTop: 12 }}>
                {when === "now" ? "Goes out when you press Publish." : scheduledAt ? `Scheduled for ${new Date(scheduledAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}.` : "Pick a time to schedule."}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
