"use client";

import { useState } from "react";

const initial = [
  { id: "r1", name: "Re-share top posts", trigger: "A post passes 1,000 impressions", action: "Re-queue it to all channels after 7 days", enabled: true },
  { id: "r2", name: "Draft replies to questions", trigger: "A comment contains a question", action: "Draft a reply for approval", enabled: true },
  { id: "r3", name: "Turn blog posts into social posts", trigger: "A new post appears in the blog feed", action: "Write 3 variants as drafts", enabled: false },
  { id: "r4", name: "Route sales leads", trigger: "A DM mentions pricing or a demo", action: "Flag as urgent and notify the team", enabled: true },
  { id: "r5", name: "Monday report", trigger: "Every Monday at 08:00", action: "Email last week's performance", enabled: true },
];

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export default function AutomationsPage() {
  const [rules, setRules] = useState(initial);
  const on = rules.filter((r) => r.enabled).length;
  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Automations</h1>
          <p className="page-sub">{on} of {rules.length} rules running.</p>
        </div>
        <button className="btn btn-primary">New rule</button>
      </div>
      <section className="card" style={{ maxWidth: 860 }} aria-label="Rules">
        <div className="rows">
          {rules.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", minHeight: 64 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div id={`${r.id}-name`} style={{ fontWeight: 500 }}>{r.name}</div>
                <div className="muted" style={{ marginTop: 2, fontSize: 13 }}>When {lower(r.trigger)}, then {lower(r.action)}.</div>
              </div>
              <span className={r.enabled ? "pill pill-ok" : "pill"}>{r.enabled ? "On" : "Off"}</span>
              <button
                role="switch"
                aria-checked={r.enabled}
                aria-labelledby={`${r.id}-name`}
                className="switch"
                onClick={() => setRules(rules.map((x) => (x.id === r.id ? { ...x, enabled: !x.enabled } : x)))}
              />
            </div>
          ))}
        </div>
      </section>
      <p className="card-note" style={{ marginTop: 12 }}>Rules do not run yet. Switches change this page only.</p>
    </div>
  );
}
