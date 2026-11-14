import { accounts, platformMeta } from "@/lib/mock-data";

export default function AccountsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Connected accounts</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage the social channels Pulse posts to.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((a) => {
          const meta = platformMeta[a.platform];
          return (
            <div key={a.id} className="rounded-lg border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold text-white"
                  style={{ backgroundColor: meta.color }}
                >
                  {meta.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{meta.label}</div>
                  <div className="truncate text-xs text-neutral-500">{a.handle}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    a.connected ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {a.connected ? "Connected" : "Not connected"}
                </span>
              </div>
              {a.connected ? (
                <div className="mt-4 space-y-1 text-xs text-neutral-600">
                  <div className="flex justify-between"><span>Followers</span><span className="font-medium text-neutral-900">{a.followers.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Posts this week</span><span className="font-medium text-neutral-900">{a.postsThisWeek}</span></div>
                  <div className="flex justify-between"><span>Last sync</span><span className="font-medium text-neutral-900">{a.lastSync}</span></div>
                </div>
              ) : (
                <button className="mt-4 w-full rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                  Connect {meta.label}
                </button>
              )}
              {a.connected && (
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50">Sync now</button>
                  <button className="flex-1 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Disconnect</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
