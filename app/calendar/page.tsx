import Link from "next/link";
import { posts, platformMeta } from "@/lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Seven days from Fri 13 Nov 2026; the mock posts fall on 13 to 17 Nov.
const start = new Date("2026-11-13T00:00:00");
const today = new Date("2026-11-14T00:00:00");

export default function CalendarPage() {
  const cols = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const scheduled = posts.filter((p) => p.status === "scheduled").length;
  const empty = cols.filter((d) => !posts.some((p) => new Date(p.scheduledAt).toDateString() === d.toDateString())).length;

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Calendar</h1>
          <p className="page-sub">13 to 19 Nov 2026. {scheduled} scheduled, {empty} days with nothing planned.</p>
        </div>
        <Link href="/compose/" className="btn btn-primary">New post</Link>
      </div>
      <section className="card" aria-label="Week">
        {cols.map((d) => {
          const isToday = d.toDateString() === today.toDateString();
          const name = days[(d.getDay() + 6) % 7];
          const items = posts
            .filter((p) => new Date(p.scheduledAt).toDateString() === d.toDateString())
            .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
          return (
            <div key={d.toISOString()} className="cal-row">
              <div className="cal-day">
                <span>
                  <span className="muted">{name} </span>
                  <span style={{ fontWeight: 600, color: isToday ? "var(--accent)" : undefined }}>{d.getDate()} Nov</span>
                </span>
                {isToday && <span className="pill pill-accent">Today</span>}
              </div>
              <div className="cal-posts">
                {items.length === 0 ? (
                  <p className="cal-empty">Nothing planned</p>
                ) : (
                  items.map((p) => {
                    const m = platformMeta[p.platform];
                    return (
                      <div key={p.id} className="cal-post">
                        <span className="num" style={{ textAlign: "left", color: "var(--muted)" }}>
                          {new Date(p.scheduledAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span style={{ display: "flex", gap: 10, alignItems: "baseline", minWidth: 0 }}>
                          <span className="mark" style={{ background: m.color, width: 18, height: 18, fontSize: 10, alignSelf: "center" }}>{m.initial}</span>
                          <span style={{ minWidth: 0 }}>{p.content}</span>
                        </span>
                        <span className="muted" style={{ fontSize: 13 }}>{p.status[0].toUpperCase() + p.status.slice(1)}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
