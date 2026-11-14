"use client";

import { useState } from "react";
import { inboxItems, platformMeta, type Platform } from "@/lib/mock-data";

type Tab = "open" | "done" | "all";
const prioPill: Record<string, string> = { high: "pill pill-bad", normal: "pill", low: "pill" };

export default function InboxPage() {
  const [done, setDone] = useState<Record<string, boolean>>(() => Object.fromEntries(inboxItems.map((i) => [i.id, i.replied])));
  const [tab, setTab] = useState<Tab>("open");
  const [platform, setPlatform] = useState<"all" | Platform>("all");
  const [openId, setOpenId] = useState<string | null>(inboxItems.find((i) => !i.replied)?.id ?? null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<Record<string, string>>({});

  const platforms = Array.from(new Set(inboxItems.map((i) => i.platform)));
  const counts = { open: inboxItems.filter((i) => !done[i.id]).length, done: inboxItems.filter((i) => done[i.id]).length, all: inboxItems.length };
  const list = inboxItems.filter(
    (i) => (tab === "all" || (tab === "open" ? !done[i.id] : done[i.id])) && (platform === "all" || i.platform === platform),
  );

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Inbox</h1>
          <p className="page-sub">{counts.open} waiting for a reply, {counts.done} done.</p>
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label="Status" style={{ marginBottom: 12 }}>
        {(["open", "done", "all"] as Tab[]).map((t) => (
          <button key={t} className="tab" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)} <span className="muted">{counts[t]}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <button className="btn" aria-pressed={platform === "all"} onClick={() => setPlatform("all")} style={platform === "all" ? { background: "var(--active)" } : undefined}>All channels</button>
        {platforms.map((p) => (
          <button key={p} className="btn" aria-pressed={platform === p} onClick={() => setPlatform(p)} style={platform === p ? { background: "var(--active)" } : undefined}>
            {platformMeta[p].label}
          </button>
        ))}
      </div>

      <section className="card" aria-label="Messages">
        {list.length === 0 && <p className="muted" style={{ padding: 20 }}>Nothing here. {tab === "open" ? "Every message has a reply." : "No messages match this filter."}</p>}
        <div className="rows">
          {list.map((i) => {
            const m = platformMeta[i.platform];
            const isOpen = openId === i.id;
            const text = drafts[i.id] ?? "";
            return (
              <div key={i.id} style={{ padding: "12px 20px" }}>
                <button
                  onClick={() => setOpenId(isOpen ? null : i.id)}
                  aria-expanded={isOpen}
                  style={{ display: "flex", gap: 10, width: "100%", textAlign: "left", background: "none", border: 0, padding: 0, color: "inherit", font: "inherit", cursor: "pointer", minHeight: 44 }}
                >
                  <span className="mark" style={{ background: m.color, marginTop: 2 }}>{m.initial}</span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontWeight: 500 }}>{i.author} <span className="muted" style={{ fontWeight: 400 }}>· {i.type}</span></span>
                      <span className="muted" style={{ fontSize: 13 }}>{i.receivedAt}</span>
                    </span>
                    <span style={{ display: "block", marginTop: 2 }}>{i.message}</span>
                  </span>
                  {done[i.id] ? <span className="pill pill-ok">Done</span> : <span className={prioPill[i.priority]}>{i.priority[0].toUpperCase() + i.priority.slice(1)}</span>}
                </button>

                {isOpen && (
                  <div style={{ marginLeft: 30, marginTop: 10, display: "grid", gap: 10 }}>
                    {sent[i.id] ? (
                      <div>
                        <div className="label">Your reply</div>
                        <p style={{ margin: 0 }}>{sent[i.id]}</p>
                      </div>
                    ) : (
                      <>
                        {i.suggestedReply && (
                          <div>
                            <div className="label">Suggested reply</div>
                            <p className="muted" style={{ margin: "0 0 8px" }}>{i.suggestedReply}</p>
                            <button className="btn" onClick={() => setDrafts({ ...drafts, [i.id]: i.suggestedReply! })}>Use suggestion</button>
                          </div>
                        )}
                        <label>
                          <span className="label">Reply on {m.label}</span>
                          <textarea className="field" rows={3} value={text} onChange={(e) => setDrafts({ ...drafts, [i.id]: e.target.value })} style={{ height: "auto", padding: 10, width: "100%" }} />
                        </label>
                      </>
                    )}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {!sent[i.id] && (
                        <button
                          className="btn btn-primary"
                          disabled={!text.trim()}
                          onClick={() => { setSent({ ...sent, [i.id]: text.trim() }); setDone({ ...done, [i.id]: true }); }}
                        >
                          Send reply
                        </button>
                      )}
                      <button className="btn" onClick={() => setDone({ ...done, [i.id]: !done[i.id] })}>{done[i.id] ? "Reopen" : "Mark done"}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <p className="card-note" style={{ marginTop: 12 }}>Sample messages. Replies are kept on this page only until a backend is connected.</p>
    </div>
  );
}
