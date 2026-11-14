"use client";

import { useEffect, useState } from "react";
import { platformMeta, type Platform } from "@/lib/mock-data";

const order: Platform[] = ["x", "linkedin", "instagram", "tiktok", "youtube", "facebook"];
const built: Platform[] = ["x", "linkedin"];

// Shows which channels can really publish. Needs the server build; static builds have no API.
export default function PostingStatus() {
  const [keys, setKeys] = useState<Record<string, boolean> | null | "off">(null);

  useEffect(() => {
    fetch("/api/channels/")
      .then((r) => (r.ok ? r.json() : "off"))
      .then(setKeys)
      .catch(() => setKeys("off"));
  }, []);

  return (
    <section className="card" aria-labelledby="ps-title" style={{ marginBottom: 24 }}>
      <div className="card-head" style={{ paddingBottom: 8 }}>
        <h2 id="ps-title" className="card-title">Real posting</h2>
        <span className="card-note">
          {keys === "off" ? "Server build only. Posts stay in this browser here." : "Keys are read from .env.local"}
        </span>
      </div>
      <div className="rows">
        {order.map((p) => {
          const m = platformMeta[p];
          const isBuilt = built.includes(p);
          const ready = keys && keys !== "off" && keys[p];
          return (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", minHeight: 45 }}>
              <span className="mark" style={{ background: m.color }}>{m.initial}</span>
              <span style={{ flex: 1 }}>{m.label}</span>
              {!isBuilt ? (
                <span className="pill">Not built yet</span>
              ) : keys === null ? (
                <span className="pill">Checking</span>
              ) : keys === "off" ? (
                <span className="pill">Unavailable</span>
              ) : ready ? (
                <span className="pill pill-ok">Ready</span>
              ) : (
                <span className="pill pill-warn">Add keys</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
