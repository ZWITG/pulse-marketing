import { accounts, platformMeta } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const data = accounts.filter((a) => a.connected);
  const max = Math.max(...data.map((a) => a.followers));
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-neutral-500">Performance across connected channels.</p>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold">Followers by channel</h2>
        <div className="mt-4 space-y-3">
          {data.map((a) => {
            const meta = platformMeta[a.platform];
            return (
              <div key={a.id} className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-neutral-600">{meta.label}</div>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(a.followers / max) * 100}%`, backgroundColor: meta.color }}
                    />
                  </div>
                </div>
                <div className="w-20 text-right text-xs font-medium">{a.followers.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">Avg engagement rate</div>
          <div className="mt-2 text-2xl font-semibold">4.2%</div>
          <div className="mt-1 text-xs text-emerald-600">+0.3% vs last week</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">Best posting time</div>
          <div className="mt-2 text-2xl font-semibold">Tue 10am</div>
          <div className="mt-1 text-xs text-neutral-400">based on last 30 days</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">Top platform</div>
          <div className="mt-2 text-2xl font-semibold">TikTok</div>
          <div className="mt-1 text-xs text-neutral-400">highest growth this week</div>
        </div>
      </div>
    </div>
  );
}
