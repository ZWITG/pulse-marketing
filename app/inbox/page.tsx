import { inboxItems, platformMeta } from "@/lib/mock-data";

export default function InboxPage() {
  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Inbox</h1>
          <p className="mt-1 text-sm text-[#5f6672]">Comments, DMs and mentions across all channels.</p>
        </div>
      </div>

      <div className="border border-[#e5e7eb] rounded-lg bg-white divide-y divide-[#f2f2f2]">
        {inboxItems.map((i) => {
          const meta = platformMeta[i.platform];
          return (
            <div key={i.id} className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold text-white" style={{ backgroundColor: meta.color }}>
                  {meta.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#111827]">{i.author}</span>
                    <span className="text-xs text-[#5f6672]">{i.type}</span>
                    {i.priority === "high" && <span className="text-[10px] text-[#c4242a]">● urgent</span>}
                  </div>
                  <span className="text-xs text-[#9ca3af]">{i.receivedAt}</span>
                </div>
              </div>
              <p className="text-sm text-[#111827] mb-2">{i.message}</p>
              {i.suggestedReply && (
                <div className="mb-2 rounded-md bg-[#f9fafb] border border-[#e5e7eb] p-3 text-xs text-[#5f6672]">
                  <span className="font-medium text-[#6b1d3e]">AI draft:</span> {i.suggestedReply}
                </div>
              )}
              <div className="flex gap-2">
                <button className="h-7 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#5f6672] hover:text-[#111827] hover:bg-[#f9fafb]">Reply</button>
                <button className="h-7 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#5f6672] hover:text-[#111827] hover:bg-[#f9fafb]">Assign</button>
                {!i.replied && <button className="h-7 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#5f6672] hover:text-[#111827] hover:bg-[#f9fafb]">Mark done</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
