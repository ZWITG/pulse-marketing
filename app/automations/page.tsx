const rules = [
  { id: "r1", name: "Re-share top posts", trigger: "A post passes 1,000 impressions", action: "Re-queue it to all channels after 7 days", enabled: true },
  { id: "r2", name: "Draft replies to questions", trigger: "A comment contains a question", action: "Draft a reply for approval", enabled: true },
  { id: "r3", name: "Turn blog posts into social posts", trigger: "A new post appears in the blog feed", action: "Write 3 variants as drafts", enabled: false },
  { id: "r4", name: "Route sales leads", trigger: "A DM mentions pricing or a demo", action: "Flag as urgent and notify the team", enabled: true },
  { id: "r5", name: "Monday report", trigger: "Every Monday at 08:00", action: "Email last week's performance", enabled: true },
];

export default function AutomationsPage() {
  const on = rules.filter((r) => r.enabled).length;
  return (
    <div className="px-6 py-8 max-w-[1200px]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Automations</h1>
          <p className="mt-1 text-sm text-[#5f6672]">{on} of {rules.length} rules running.</p>
        </div>
        <button className="h-8 px-3 rounded-md bg-[#b8336a] text-white text-sm font-medium hover:opacity-90">New rule</button>
      </div>
      <div className="border border-[#e5e7eb] rounded-lg bg-white divide-y divide-[#f2f2f2] max-w-[860px]">
        {rules.map((r) => (
          <div key={r.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#111827]">{r.name}</div>
              <div className="mt-1 text-xs text-[#5f6672]">When {r.trigger.charAt(0).toLowerCase() + r.trigger.slice(1)}, then {r.action.charAt(0).toLowerCase() + r.action.slice(1)}.</div>
            </div>
            <span className={`text-xs ${r.enabled ? "text-[#247b50]" : "text-[#5f6672]"}`}>{r.enabled ? "On" : "Off"}</span>
            <span className={`relative h-5 w-9 rounded-full ${r.enabled ? "bg-[#b8336a]" : "bg-[#d1d5db]"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${r.enabled ? "left-[18px]" : "left-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
