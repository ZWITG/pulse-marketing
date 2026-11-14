const rules = [
  { id: "r1", name: "Auto-reshare top posts", trigger: "Post reaches 1k impressions", action: "Re-queue to all channels in 7 days", enabled: true },
  { id: "r2", name: "AI reply to comments", trigger: "New comment contains a question", action: "Draft reply for approval", enabled: true },
  { id: "r3", name: "Cross-post blog", trigger: "New blog post published (RSS)", action: "Create 3 social variants", enabled: false },
  { id: "r4", name: "Lead routing", trigger: "DM contains 'pricing' or 'demo'", action: "Create task in CRM + notify team", enabled: true },
  { id: "r5", name: "Weekly report", trigger: "Every Monday 8am", action: "Email performance summary", enabled: true },
];

export default function AutomationsPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
          <p className="mt-1 text-sm text-neutral-500">If-this-then-that rules that run your marketing on autopilot.</p>
        </div>
        <button className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800">+ New rule</button>
      </div>
      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r.id} className="rounded-lg border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="mt-1 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-700">When:</span> {r.trigger}
                </div>
                <div className="mt-0.5 text-xs text-neutral-500">
                  <span className="font-medium text-neutral-700">Then:</span> {r.action}
                </div>
              </div>
              <button
                className={`relative h-6 w-11 rounded-full transition ${r.enabled ? "bg-neutral-900" : "bg-neutral-200"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${r.enabled ? "left-5" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
