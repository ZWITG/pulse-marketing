import { posts, platformMeta } from "@/lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content calendar</h1>
          <p className="mt-1 text-sm text-neutral-500">Week of Nov 14, 2026.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50">Week</button>
          <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-50">Month</button>
          <button className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">+ Schedule</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <div key={d} className="rounded-lg border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-500">{d} {14 + i}</div>
            <div className="min-h-[140px] space-y-2 p-2">
              {posts
                .filter((p) => new Date(p.scheduledAt).getDay() === ((i + 1) % 7))
                .map((p) => {
                  const meta = platformMeta[p.platform];
                  return (
                    <div key={p.id} className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="flex h-4 w-4 items-center justify-center rounded text-[9px] font-semibold text-white"
                          style={{ backgroundColor: meta.color }}
                        >
                          {meta.initial}
                        </span>
                        <span className="text-[10px] text-neutral-500">{new Date(p.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-700">{p.content}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
