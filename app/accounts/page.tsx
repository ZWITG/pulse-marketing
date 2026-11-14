import { accounts, platformMeta } from "@/lib/mock-data";
import { num, signed } from "@/lib/format";
import PostingStatus from "@/components/posting-status";

export default function AccountsPage() {
  const connected = accounts.filter((a) => a.connected).length;
  return (
    <div className="page">
      <div className="title-row">
        <div>
          <h1 className="page-title">Accounts</h1>
          <p className="page-sub">{connected} of {accounts.length} channels connected.</p>
        </div>
        <button className="btn btn-primary">Connect account</button>
      </div>
      <PostingStatus />
      <section className="card" aria-label="Channels">
        <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Channel</th>
              <th className="num">Followers</th>
              <th className="num">This week</th>
              <th className="num">Posts</th>
              <th>Last sync</th>
              <th><span className="sr-only">Action</span></th>
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
                  <td className="num">
                    <button className="btn" style={{ height: 30 }}>{a.connected ? "Disconnect" : "Connect"}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </section>
      <p className="card-note" style={{ marginTop: 12 }}>Sample data. Connecting a channel needs the backend and OAuth, which are not built yet.</p>
    </div>
  );
}
