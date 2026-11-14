import { accounts, platformMeta } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const data = accounts.filter((a) => a.connected).sort((a, b) => b.followers - a.followers);
  const max = Math.max(...data.map((a) => a.followers));
  const growth = [...data].sort((a, b) => b.followersDelta - a.followersDelta)[0];
  const total = data.reduce((s, a) => s + a.followers, 0);
  const delta = data.reduce((s, a) => s + a.followersDelta, 0);
  const kpis = [
    { label: "Followers, all channels", value: total.toLocaleString(), note: `${delta >= 0 ? "+" : ""}${delta} in the last 7 days` },
    { label: "Fastest growing", value: platformMeta[growth.platform].label, note: `+${growth.followersDelta} in the last 7 days` },
    { label: "Posts published", value: String(data.reduce((s, a) => s + a.postsThisWeek, 0)), note: "this week" },
  ];
  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Analytics</h1>
        <p className="mt-1 text-sm text-[#5f6672]">TikTok added {growth.followersDelta.toLocaleString()} followers this week, more than every other channel combined.</p>
      </div>
      <div className="grid grid-cols-3 divide-x divide-[#e5e7eb] border border-[#e5e7eb] rounded-lg bg-white mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="px-5 py-4">
            <div className="text-xs text-[#5f6672] mb-1">{k.label}</div>
            <div className="text-[24px] font-medium tabular-nums">{k.value}</div>
            <div className="text-xs text-[#5f6672] mt-1">{k.note}</div>
          </div>
        ))}
      </div>
      <div className="border border-[#e5e7eb] rounded-lg bg-white max-w-[760px]">
        <div className="px-5 py-3 border-b border-[#e5e7eb]">
          <h2 className="text-sm font-semibold">Followers by channel</h2>
        </div>
        <div className="px-5 py-4 space-y-3">
          {data.map((a, i) => (
            <div key={a.id} className="flex items-center gap-3">
              <div className="w-20 text-xs text-[#5f6672]">{platformMeta[a.platform].label}</div>
              <div className="flex-1 h-2 rounded-full bg-[#f3f4f6]">
                <div className="h-2 rounded-full" style={{ width: `${(a.followers / max) * 100}%`, backgroundColor: i === 0 ? "#b8336a" : "#9ca3af" }} />
              </div>
              <div className="w-16 text-right text-xs tabular-nums">{a.followers.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
