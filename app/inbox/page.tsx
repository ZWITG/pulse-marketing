import { inboxItems, platformMeta } from "@/lib/mock-data";

export default function InboxPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Unified inbox</h1>
          <p className="mt-1 text-sm text-neutral-500">Comments, DMs and mentions across all channels.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50">Filter</button>
          <button className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">AI triage</button>
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100">
        {inboxItems.map((i) => {
          const meta = platformMeta[i.platform];
          return (
            <div key={i.id} className="flex gap-4 px-5 py-4">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white"
                style={{ backgroundColor: meta.color }}
              >
                {meta.initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{i.author}</span>
                  <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">{i.type}</span>
                  {i.priority === "high" && <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-600">urgent</span>}
                  <span className="ml-auto text-xs text-neutral-400">{i.receivedAt}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-700">{i.message}</p>
                {i.suggestedReply && (
                  <div className="mt-2 rounded-md bg-neutral-50 p-2 text-xs text-neutral-600">
                    <span className="font-medium text-neutral-700">AI draft:</span> {i.suggestedReply}
                  </div>
                )}
                <div className="mt-2 flex gap-2">
                  <button className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium hover:bg-neutral-50">Reply</button>
                  <button className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium hover:bg-neutral-50">Assign</button>
                  {!i.replied && <button className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium hover:bg-neutral-50">Mark done</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
