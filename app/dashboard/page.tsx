import { accounts, posts, inboxItems, totals, platformMeta } from "@/lib/mock-data";
import YourPosts from "@/components/your-posts";

export default function DashboardPage() {
  const kpis = [
    { label: "Total followers", value: totals.followers.toLocaleString(), delta: `+${totals.followersDelta} this week`, good: totals.followersDelta >= 0 },
    { label: "Posts this week", value: String(totals.postsThisWeek), delta: `${totals.scheduled} scheduled` },
    { label: "Published", value: String(totals.published), delta: "this week" },
    { label: "Unread inbox", value: String(totals.unreadInbox), delta: "needs reply" },
  ];

  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#5f6672]">Overview of all your connected channels.</p>
        </div>
        <a href="/compose" className="h-8 px-3 rounded-md bg-[#b8336a] text-white text-sm font-medium inline-flex items-center hover:opacity-90">
          + New post
        </a>
      </div>

      {/* KPI strip — one container split by 1px dividers, no tiles, no icons */}
      <div className="grid grid-cols-4 divide-x divide-[#e5e7eb] border border-[#e5e7eb] rounded-lg bg-white mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="px-5 py-4">
            <div className="text-xs text-[#5f6672] mb-1">{k.label}</div>
            <div className="text-[24px] font-medium tabular-nums text-[#111827]">{k.value}</div>
            <div className={`text-xs mt-1 ${k.good === false ? "text-[#c4242a]" : "text-[#5f6672]"}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        {/* Main column */}
        <div className="space-y-6">
          {/* Accounts */}
          <div className="border border-[#e5e7eb] rounded-lg bg-white">
            <div className="px-5 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#111827]">Connected accounts</h2>
              <span className="text-xs text-[#5f6672]">{accounts.filter(a=>a.connected).length} connected</span>
            </div>
            <div className="divide-y divide-[#f2f2f2]">
              {accounts.map((a) => {
                const meta = platformMeta[a.platform];
                return (
                  <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold text-white" style={{ backgroundColor: meta.color }}>
                      {meta.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#111827] truncate">{a.handle}</div>
                      <div className="text-xs text-[#5f6672]">{meta.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tabular-nums text-[#111827]">{a.followers.toLocaleString()}</div>
                      <div className={`text-xs tabular-nums ${a.followersDelta >= 0 ? "text-[#247b50]" : "text-[#c4242a]"}`}>
                        {a.followersDelta >= 0 ? "+" : ""}{a.followersDelta}
                      </div>
                    </div>
                    <span className={`text-xs ${a.connected ? "text-[#247b50]" : "text-[#5f6672]"}`}>
                      {a.connected ? "●" : "○"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent posts table */}
          <div className="border border-[#e5e7eb] rounded-lg bg-white">
            <div className="px-5 py-3 border-b border-[#e5e7eb]">
              <h2 className="text-sm font-semibold text-[#111827]">Recent & upcoming posts</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-[#5f6672]">
                  <th className="px-5 py-2 text-left font-normal">Platform</th>
                  <th className="px-5 py-2 text-left font-normal">Content</th>
                  <th className="px-5 py-2 text-left font-normal">Status</th>
                  <th className="px-5 py-2 text-right font-normal tabular-nums">Impressions</th>
                  <th className="px-5 py-2 text-right font-normal tabular-nums">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {posts.map((p) => {
                  const meta = platformMeta[p.platform];
                  return (
                    <tr key={p.id} className="hover:bg-[#f9fafb]">
                      <td className="px-5 py-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold text-white" style={{ backgroundColor: meta.color }}>
                          {meta.initial}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#111827] max-w-xs truncate">{p.content}</td>
                      <td className="px-5 py-3 text-xs text-[#5f6672]">{p.status}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-[#111827]">{p.impressions.toLocaleString()}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-[#111827]">{p.engagement.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rail */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-medium text-[#5f6672] mb-2 px-1">Inbox</h2>
            <div className="border border-[#e5e7eb] rounded-lg bg-white divide-y divide-[#f2f2f2]">
              {inboxItems.slice(0, 5).map((i) => {
                const meta = platformMeta[i.platform];
                return (
                  <div key={i.id} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-semibold text-white" style={{ backgroundColor: meta.color }}>
                        {meta.initial}
                      </span>
                      <span className="text-xs font-medium text-[#111827] truncate">{i.author}</span>
                      {i.priority === "high" && <span className="ml-auto text-[10px] text-[#c4242a]">●</span>}
                    </div>
                    <p className="text-xs text-[#5f6672] line-clamp-2">{i.message}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <YourPosts />
    </div>
  );
}
