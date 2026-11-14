import { accounts, platformMeta } from "@/lib/mock-data";

export default function AccountsPage() {
  const connected = accounts.filter((a) => a.connected).length;
  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Accounts</h1>
          <p className="mt-1 text-sm text-[#5f6672]">{connected} of {accounts.length} channels connected.</p>
        </div>
        <button className="h-8 px-3 rounded-md bg-[#b8336a] text-white text-sm font-medium hover:opacity-90">Connect account</button>
      </div>
      <div className="border border-[#e5e7eb] rounded-lg bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-[#5f6672] border-b border-[#e5e7eb]">
              <th className="px-5 py-2 text-left font-normal">Channel</th>
              <th className="px-5 py-2 text-right font-normal">Followers</th>
              <th className="px-5 py-2 text-right font-normal">This week</th>
              <th className="px-5 py-2 text-right font-normal">Posts</th>
              <th className="px-5 py-2 text-left font-normal">Last sync</th>
              <th className="px-5 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2f2f2]">
            {accounts.map((a) => {
              const meta = platformMeta[a.platform];
              return (
                <tr key={a.id} className="h-12">
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-semibold text-white" style={{ backgroundColor: meta.color }}>{meta.initial}</span>
                      <div>
                        <div className="text-[#111827]">{meta.label}</div>
                        <div className="text-xs text-[#5f6672]">{a.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 text-right tabular-nums">{a.connected ? a.followers.toLocaleString() : "–"}</td>
                  <td className={`px-5 text-right tabular-nums ${a.followersDelta < 0 ? "text-[#c4242a]" : "text-[#5f6672]"}`}>
                    {a.connected ? `${a.followersDelta >= 0 ? "+" : ""}${a.followersDelta}` : "–"}
                  </td>
                  <td className="px-5 text-right tabular-nums">{a.connected ? a.postsThisWeek : "–"}</td>
                  <td className="px-5 text-xs text-[#5f6672]">{a.connected ? a.lastSync : "Not connected"}</td>
                  <td className="px-5 text-right">
                    <button className="h-7 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#5f6672] hover:text-[#111827] hover:bg-[#f9fafb]">
                      {a.connected ? "Disconnect" : "Connect"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
