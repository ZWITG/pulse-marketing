import { accounts, posts, inboxItems, totals, platformMeta } from "@/lib/mock-data";

function StatCard({ label, value, delta, hint }: { label: string; value: string; delta?: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {delta && <div className="mt-1 text-xs text-emerald-600">{delta}</div>}
      {hint && <div className="mt-1 text-xs text-neutral-400">{hint}</div>}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Overview of all your connected channels.</p>
        </div>
        <button className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
          + New post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total followers" value={totals.followers.toLocaleString()} delta={`+${totals.followersDelta} this week`} />
        <StatCard label="Posts this week" value={String(totals.postsThisWeek)} hint={`${totals.scheduled} scheduled · ${totals.drafts} drafts`} />
        <StatCard label="Published" value={String(totals.published)} hint="this week" />
        <StatCard label="Unread inbox" value={String(totals.unreadInbox)} hint="needs reply" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Connected accounts */}
        <div className="lg:col-span-2 rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold">Connected accounts</h2>
          </div>
          <ul className="divide-y divide-neutral-100">
            {accounts.map((a) => {
              const meta = platformMeta[a.platform];
              return (
                <li key={a.id} className="flex items-center gap-4 px-5 py-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{a.handle}</div>
                    <div className="truncate text-xs text-neutral-500">{meta.label} · {a.lastSync}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{a.followers.toLocaleString()}</div>
                    <div className={`text-xs ${a.followersDelta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {a.followersDelta >= 0 ? "+" : ""}{a.followersDelta}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      a.connected ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {a.connected ? "Connected" : "Connect"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Inbox preview */}
        <div className="rounded-lg border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-sm font-semibold">Inbox</h2>
          </div>
          <ul className="divide-y divide-neutral-100">
            {inboxItems.slice(0, 5).map((i) => {
              const meta = platformMeta[i.platform];
              return (
                <li key={i.id} className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded text-xs font-semibold text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.initial}
                    </span>
                    <span className="truncate text-sm font-medium">{i.author}</span>
                    {i.priority === "high" && (
                      <span className="ml-auto rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-600">
                        urgent
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{i.message}</p>
                  <div className="mt-1 text-[10px] text-neutral-400">{i.receivedAt}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Recent posts */}
      <div className="mt-6 rounded-lg border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 py-4">
          <h2 className="text-sm font-semibold">Recent & upcoming posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-5 py-2 text-left font-medium">Platform</th>
                <th className="px-5 py-2 text-left font-medium">Content</th>
                <th className="px-5 py-2 text-left font-medium">Status</th>
                <th className="px-5 py-2 text-left font-medium">Scheduled</th>
                <th className="px-5 py-2 text-right font-medium">Impressions</th>
                <th className="px-5 py-2 text-right font-medium">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {posts.map((p) => {
                const meta = platformMeta[p.platform];
                return (
                  <tr key={p.id}>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded text-xs font-semibold text-white"
                        style={{ backgroundColor: meta.color }}
                      >
                        {meta.initial}
                      </span>
                    </td>
                    <td className="px-5 py-3 max-w-xs truncate">{p.content}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : p.status === "scheduled"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-neutral-500">{new Date(p.scheduledAt).toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">{p.impressions.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">{p.engagement.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
