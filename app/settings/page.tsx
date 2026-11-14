"use client";

import { useState } from "react";

const alertDefs = [
  { id: "weekly", label: "Weekly report on Monday", note: "Last week's followers, posts and impressions." },
  { id: "urgent", label: "Urgent inbox messages", note: "High priority messages from any channel." },
  { id: "fail", label: "A post fails to publish", note: "So you can fix it before the slot passes." },
];

export default function SettingsPage() {
  const [name, setName] = useState("Fieldnote Studio");
  const [tz, setTz] = useState("Europe/London");
  const [alerts, setAlerts] = useState<Record<string, boolean>>({ weekly: true, urgent: true, fail: true });
  const [saved, setSaved] = useState(false);
  const edit = <T,>(fn: (v: T) => void) => (v: T) => { fn(v); setSaved(false); };

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Workspace and alerts.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {saved && <span className="card-note" role="status">Saved</span>}
          <button className="btn btn-primary" onClick={() => setSaved(true)}>Save changes</button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 24, maxWidth: 860, gridTemplateColumns: "minmax(0, 1fr)" }}>
        <section className="card" aria-labelledby="ws">
          <div className="setting">
            <div>
              <h2 id="ws" className="card-title">Workspace</h2>
              <p className="card-note">Shown in the sidebar and in reports.</p>
            </div>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr)" }}>
              <div>
                <label className="label" htmlFor="ws-name">Name</label>
                <input id="ws-name" className="field" style={{ width: "100%" }} value={name} onChange={(e) => edit(setName)(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="ws-tz">Time zone</label>
                <select id="ws-tz" className="field" style={{ width: "100%" }} value={tz} onChange={(e) => edit(setTz)(e.target.value)}>
                  <option>Europe/London</option>
                  <option>America/New_York</option>
                  <option>UTC</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="al">
          <div className="setting" style={{ paddingBottom: 8 }}>
            <div>
              <h2 id="al" className="card-title">Alerts</h2>
              <p className="card-note">Sent by email.</p>
            </div>
            <div className="rows">
              {alertDefs.map((a) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", minHeight: 56 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div id={`a-${a.id}`} style={{ fontWeight: 500 }}>{a.label}</div>
                    <div className="muted" style={{ fontSize: 13 }}>{a.note}</div>
                  </div>
                  <button
                    role="switch"
                    aria-checked={alerts[a.id]}
                    aria-labelledby={`a-${a.id}`}
                    className="switch"
                    onClick={() => { setAlerts({ ...alerts, [a.id]: !alerts[a.id] }); setSaved(false); }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="dz">
          <div className="setting">
            <div>
              <h2 id="dz" className="card-title">Delete workspace</h2>
              <p className="card-note">Removes channels, posts and rules. This cannot be undone.</p>
            </div>
            <div>
              <button className="btn" style={{ color: "var(--negative)", borderColor: "var(--negative)" }}>Delete workspace</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
