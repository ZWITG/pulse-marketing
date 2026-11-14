import { posts, platformMeta } from "@/lib/mock-data";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Seven days from Fri 13 Nov 2026; the mock posts fall on 13 to 17 Nov.
const start = new Date("2026-11-13T00:00:00");

export default function CalendarPage() {
  const cols = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const scheduled = posts.filter((p) => p.status === "scheduled").length;
  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Calendar</h1>
          <p className="mt-1 text-sm text-[#5f6672]">13 to 19 Nov 2026. {scheduled} posts scheduled.</p>
        </div>
        <a href="/compose" className="h-8 px-3 rounded-md bg-[#b8336a] text-white text-sm font-medium inline-flex items-center hover:opacity-90">New post</a>
      </div>
      <div className="grid grid-cols-7 border border-[#e5e7eb] rounded-lg bg-white overflow-hidden divide-x divide-[#f2f2f2]">
        {cols.map((d) => {
          const isToday = d.toDateString() === new Date("2026-11-14").toDateString();
          const items = posts.filter((p) => new Date(p.scheduledAt).toDateString() === d.toDateString());
          return (
            <div key={d.toISOString()} className="min-h-[220px]">
              <div className="px-3 py-2 border-b border-[#e5e7eb] flex items-center gap-1 text-xs">
                <span className="text-[#5f6672]">{days[(d.getDay() + 6) % 7]}</span>
                <span className={`tabular-nums ${isToday ? "font-semibold text-[#b8336a]" : "text-[#111827]"}`}>{d.getDate()}</span>
              </div>
              <div className="p-2 space-y-2">
                {items.map((p) => {
                  const meta = platformMeta[p.platform];
                  return (
                    <div key={p.id} className="rounded-md border border-[#e5e7eb] p-2" style={{ borderLeft: `3px solid ${meta.color}` }}>
                      <div className="text-[11px] tabular-nums text-[#5f6672]">
                        {new Date(p.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {meta.label}
                      </div>
                      <p className="mt-1 text-xs text-[#111827] line-clamp-3">{p.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
