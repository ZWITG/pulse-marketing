export default function SettingsPage() {
  const field = "mt-1 h-8 w-full rounded-md border border-[#d1d5db] bg-white px-2 text-sm";
  return (
    <div className="px-6 py-8 max-w-[860px]">
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight text-[#111827]">Settings</h1>
        <p className="mt-1 text-sm text-[#5f6672]">Workspace name, time zone and alerts.</p>
      </div>
      <div className="border border-[#e5e7eb] rounded-lg bg-white divide-y divide-[#f2f2f2]">
        <div className="grid grid-cols-[220px_1fr] gap-6 px-5 py-5">
          <div>
            <h2 className="text-sm font-semibold">Workspace</h2>
            <p className="text-xs text-[#5f6672] mt-1">Shown in the sidebar and in reports.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-xs text-[#5f6672]">Name<input className={field} defaultValue="Pulse" /></label>
            <label className="text-xs text-[#5f6672]">Time zone
              <select className={field}><option>Europe/London</option><option>America/New_York</option><option>UTC</option></select>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-[220px_1fr] gap-6 px-5 py-5">
          <div>
            <h2 className="text-sm font-semibold">Alerts</h2>
            <p className="text-xs text-[#5f6672] mt-1">Sent by email.</p>
          </div>
          <div className="space-y-3 text-sm">
            {["Weekly report on Monday", "Urgent inbox messages", "A post fails to publish"].map((l) => (
              <label key={l} className="flex items-center justify-between">
                <span>{l}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#b8336a]" />
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[220px_1fr] gap-6 px-5 py-5">
          <div>
            <h2 className="text-sm font-semibold">Delete workspace</h2>
            <p className="text-xs text-[#5f6672] mt-1">Removes all posts and connections.</p>
          </div>
          <div>
            <button className="h-8 px-3 rounded-md border border-[#e5e7eb] text-sm text-[#c4242a] hover:bg-[#ffedea]">Delete workspace</button>
          </div>
        </div>
      </div>
      <button className="mt-4 h-8 px-3 rounded-md bg-[#111827] text-white text-sm font-medium">Save changes</button>
    </div>
  );
}
