"use client";

import Link from "next/link";
import { useState } from "react";
import LineChart from "@/components/line-chart";
import YourPosts from "@/components/your-posts";
import { accounts, posts, inboxItems, totals, platformMeta, days14, followersGained, type Platform } from "@/lib/mock-data";
import { fmtDay, fmtWhen, num, signed } from "@/lib/format";

const connected = accounts.filter((a) => a.connected);
const statusPill: Record<string, string> = { scheduled: "pill pill-accent", published: "pill pill-ok", draft: "pill" };

export default function DashboardPage() {
  const [scope, setScope] = useState<"all" | Platform>("all");

  const values = days14.map((_, i) =>
    scope === "all" ? connected.reduce((s, a) => s + (followersGained[a.platform]?.[i] ?? 0), 0) : followersGained[scope]?.[i] ?? 0,
  );
  const total14 = values.reduce((s, v) => s + v, 0);
  const last7 = values.slice(7).reduce((s, v) => s + v, 0);
  const prev7 = values.slice(0, 7).reduce((s, v) => s + v, 0);
  const labels = days14.map(fmtDay);
  const scopeName = scope === "all" ? "all channels" : platformMeta[scope].label;

  const share = connected
    .map((a) => ({ platform: a.platform, v: (followersGained[a.platform] ?? []).slice(7).reduce((s, v) => s + v, 0) }))
    .sort((a, b) => b.v - a.v);
  const shareTotal = share.reduce((s, r) => s + r.v, 0);

  const upcoming = [...posts].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  const needReply = inboxItems.filter((i) => !i.replied);

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Fieldnote Studio across {connected.length} connected channels.</p>
        </div>
        <Link href="/compose/" className="btn btn-primary">New post</Link>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="kpis">
          <div className="kpi">
            <div className="kpi-label">Followers</div>
            <div className="kpi-value">{num(totals.followers)}</div>
            <div className="kpi-note">{signed(totals.followersDelta)} in 7 days</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Posts this week</div>
            <div className="kpi-value">{totals.postsThisWeek}</div>
            <div className="kpi-note">{totals.scheduled} scheduled next</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Impressions, published</div>
            <div className="kpi-value">{num(posts.reduce((s, p) => s + p.impressions, 0))}</div>
            <div className="kpi-note">{totals.published} posts</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Waiting for a reply</div>
            <div className="kpi-value">{totals.unreadInbox}</div>
            <div className="kpi-note">{needReply.filter((i) => i.priority === "high").length} high priority</div>
          </div>
        </div>
        <div className="card-note" style={{ padding: "10px 20px", borderTop: "1px solid var(--rule)" }}>
          Figures for 1–14 Nov 2026, connected channels only. Facebook is not connected.
        </div>
      </div>

      <div className="grid-main">
        <div style={{ display: "grid", gap: 24, minWidth: 0, gridTemplateColumns: "minmax(0, 1fr)" }}>
          <section className="card" aria-labelledby="gain-title">
            <div className="card-head">
              <div>
                <h2 id="gain-title" className="card-title">Followers gained per day</h2>
                <div className="card-note">{fmtDay(days14[0])} – {fmtDay(days14[13])}, {scopeName}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="kpi-value" style={{ marginTop: 0 }}>{signed(total14)}</div>
                <div className="card-note">last 7 days {signed(last7)} vs {signed(prev7)} before</div>
              </div>
            </div>
            <div style={{ padding: "12px 20px 0" }} role="tablist" aria-label="Channel">
              <div className="tabs" style={{ overflowX: "auto" }}>
                <button className="tab" role="tab" aria-selected={scope === "all"} onClick={() => setScope("all")}>All</button>
                {connected.map((a) => (
                  <button key={a.id} className="tab" role="tab" aria-selected={scope === a.platform} onClick={() => setScope(a.platform)}>
                    {platformMeta[a.platform].label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 12px 12px 8px" }}>
              <LineChart labels={labels} area series={[{ name: `Followers gained, ${scopeName}`, color: "var(--accent)", values }]} height={280} />
            </div>
            <div style={{ borderTop: "1px solid var(--rule)", padding: "14px 20px 16px" }}>
              <div className="card-note" style={{ marginBottom: 10 }}>Share of the last 7 days, all channels (+{num(shareTotal)})</div>
              <div style={{ display: "grid", gap: 8 }}>
                {share.map((s) => (
                  <div key={s.platform} style={{ display: "grid", gridTemplateColumns: "88px minmax(0,1fr) 64px", alignItems: "center", gap: 12, fontSize: 14 }}>
                    <span>{platformMeta[s.platform].label}</span>
                    <span aria-hidden style={{ height: 6, borderRadius: 3, background: "var(--accent-track)", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "100%", width: `${Math.max(0, (s.v / shareTotal) * 100)}%`, background: "var(--accent)" }} />
                    </span>
                    <span className="num" style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: s.v < 0 ? "var(--negative)" : undefined }}>{signed(s.v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card" aria-labelledby="acc-title">
            <div className="card-head" style={{ paddingBottom: 8 }}>
              <h2 id="acc-title" className="card-title">Channels</h2>
              <Link href="/accounts/" className="btn btn-quiet" style={{ height: 28 }}>Manage</Link>
            </div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th className="num">Followers</th>
                  <th className="num">7 days</th>
                  <th className="num">Posts this week</th>
                  <th>Synced</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => {
                  const m = platformMeta[a.platform];
                  return (
                    <tr key={a.id}>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="mark" style={{ background: m.color }}>{m.initial}</span>
                          <span>
                            <span style={{ display: "block", fontWeight: 500 }}>{m.label}</span>
                            <span className="muted" style={{ fontSize: 13 }}>{a.handle}</span>
                          </span>
                        </span>
                      </td>
                      <td className="num">{a.connected ? num(a.followers) : "—"}</td>
                      <td className="num" style={{ color: !a.connected ? "var(--muted)" : a.followersDelta < 0 ? "var(--negative)" : "var(--positive)" }}>
                        {a.connected ? signed(a.followersDelta) : "—"}
                      </td>
                      <td className="num">{a.connected ? a.postsThisWeek : "—"}</td>
                      <td>{a.connected ? <span className="muted">{a.lastSync}</span> : <span className="pill pill-warn">Not connected</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <YourPosts />
        </div>

        <aside style={{ display: "grid", gap: 24, minWidth: 0, gridTemplateColumns: "minmax(0, 1fr)" }}>
          <section className="card" aria-labelledby="posts-title">
            <div className="card-head" style={{ paddingBottom: 8 }}>
              <h2 id="posts-title" className="card-title">Posts</h2>
              <span className="card-note">{totals.scheduled} scheduled · {totals.drafts} draft</span>
            </div>
            <div className="rows">
              {upcoming.map((p) => {
                const m = platformMeta[p.platform];
                return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", minHeight: 45 }}>
                    <span className="mark" style={{ background: m.color }} title={m.label}>{m.initial}</span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.content}</span>
                      <span className="muted" style={{ fontSize: 13 }}>{fmtWhen(p.scheduledAt)}</span>
                    </span>
                    <span className={statusPill[p.status]}>{p.status[0].toUpperCase() + p.status.slice(1)}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: 12, borderTop: "1px solid var(--rule)" }}>
              <Link href="/calendar/" className="btn" style={{ width: "100%" }}>View calendar</Link>
            </div>
          </section>

          <section className="card" aria-labelledby="inbox-title">
            <div className="card-head" style={{ paddingBottom: 8 }}>
              <h2 id="inbox-title" className="card-title">Needs a reply</h2>
              <span className="card-note">{needReply.length} open</span>
            </div>
            <div className="rows">
              {needReply.map((i) => {
                const m = platformMeta[i.platform];
                return (
                  <div key={i.id} style={{ display: "flex", gap: 10, padding: "10px 20px" }}>
                    <span className="mark" style={{ background: m.color, marginTop: 2 }}>{m.initial}</span>
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontWeight: 500 }}>{i.author}</span>
                        <span className="muted" style={{ fontSize: 13 }}>{i.receivedAt}</span>
                      </span>
                      <span className="muted" style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.message}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: 12, borderTop: "1px solid var(--rule)" }}>
              <Link href="/inbox/" className="btn" style={{ width: "100%" }}>Open inbox</Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
