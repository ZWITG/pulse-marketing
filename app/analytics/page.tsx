import LineChart from "@/components/line-chart";
import { accounts, days14, followersGained, platformMeta, posts, type Platform } from "@/lib/mock-data";
import { fmtDay, num, signed } from "@/lib/format";

const connected = accounts.filter((a) => a.connected);
const plotted: { platform: Platform; color: string }[] = [
  { platform: "tiktok", color: "var(--accent)" },
  { platform: "instagram", color: "var(--text)" },
  { platform: "linkedin", color: "var(--muted)" },
];
const sum = (xs: number[]) => xs.reduce((s, v) => s + v, 0);

export default function AnalyticsPage() {
  const rows = connected
    .map((a) => {
      const v = followersGained[a.platform] ?? [];
      return { a, last7: sum(v.slice(7)), prev7: sum(v.slice(0, 7)), total: sum(v) };
    })
    .sort((x, y) => y.last7 - x.last7);
  const all7 = sum(rows.map((r) => r.last7));
  const allPrev = sum(rows.map((r) => r.prev7));
  const top = rows[0];
  const others = all7 - top.last7;
  const pct = allPrev > 0 ? Math.round(((all7 - allPrev) / allPrev) * 100) : 0;
  const published = posts.filter((p) => p.status === "published");
  const labels = days14.map(fmtDay);

  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-sub">
            {platformMeta[top.a.platform].label} gained {num(top.last7)} followers in the last 7 days
            {others > 0 && top.last7 > others ? ", more than every other channel combined" : ""}.
          </p>
        </div>
      </div>

      <section className="card" aria-labelledby="growth-title" style={{ marginBottom: 24 }}>
        <div className="card-head">
          <div>
            <h2 id="growth-title" className="card-title">Follower growth</h2>
            <div className="card-note">{fmtDay(days14[0])} – {fmtDay(days14[13])}, followers gained per day</div>
          </div>
        </div>
        <div className="analytics-report">
          <div className="analytics-side">
            <div className="kpi-label">Gained, last 7 days</div>
            <div className="kpi-value">{signed(all7)}</div>
            <div style={{ marginTop: 8 }}>
              <span className={pct >= 0 ? "pill pill-ok" : "pill pill-bad"}>{signed(pct)}% vs previous 7 days</span>
            </div>
            <table className="tbl" style={{ marginTop: 20 }}>
              <tbody>
                {plotted.map((p) => {
                  const r = rows.find((x) => x.a.platform === p.platform)!;
                  return (
                    <tr key={p.platform}>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span aria-hidden style={{ width: 10, height: 10, borderRadius: 999, background: p.color, flex: "none" }} />
                          {platformMeta[p.platform].label}
                        </span>
                      </td>
                      <td className="num">{signed(r.last7)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="card-note" style={{ marginTop: 10 }}>YouTube and X are in the table below, not plotted: both are under 15 a day.</p>
          </div>
          <div style={{ minWidth: 0, padding: "4px 12px 12px 8px" }}>
            <LineChart
              labels={labels}
              height={300}
              series={plotted.map((p) => ({ name: platformMeta[p.platform].label, color: p.color, values: followersGained[p.platform] }))}
            />
          </div>
        </div>
      </section>

      <section className="card" aria-labelledby="detail-title">
        <div className="card-head" style={{ paddingBottom: 8 }}>
          <h2 id="detail-title" className="card-title">By channel</h2>
          <span className="card-note">Connected channels, 1–14 Nov 2026</span>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Channel</th>
              <th className="num">Followers</th>
              <th className="num">Last 7 days</th>
              <th className="num">Previous 7</th>
              <th className="num">Posts this week</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ a, last7, prev7 }) => {
              const m = platformMeta[a.platform];
              return (
                <tr key={a.id}>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="mark" style={{ background: m.color }}>{m.initial}</span>
                      {m.label}
                    </span>
                  </td>
                  <td className="num">{num(a.followers)}</td>
                  <td className="num" style={{ color: last7 < 0 ? "var(--negative)" : "var(--positive)" }}>{signed(last7)}</td>
                  <td className="num">{signed(prev7)}</td>
                  <td className="num">{a.postsThisWeek}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="card-note" style={{ padding: "10px 20px", borderTop: "1px solid var(--rule)" }}>
          {published.length} published posts reached {num(published.reduce((s, p) => s + p.impressions, 0))} impressions. Facebook is not connected and is left out.
        </div>
      </section>

      <style>{`
        .analytics-report { display: grid; grid-template-columns: 390px minmax(0, 1fr); }
        .analytics-side { padding: 8px 20px 20px; border-right: 1px solid var(--rule); }
        @media (max-width: 1100px) {
          .analytics-report { grid-template-columns: 1fr; }
          .analytics-side { border-right: 0; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </div>
  );
}
