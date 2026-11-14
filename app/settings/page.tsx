export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-neutral-500">Workspace preferences.</p>

      <section className="mt-8 space-y-6">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Profile</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-neutral-500">Workspace name</label>
              <input className="mt-1 w-full rounded-md border border-neutral-200 p-2 text-sm" defaultValue="Pulse Marketing" />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500">Timezone</label>
              <select className="mt-1 w-full rounded-md border border-neutral-200 p-2 text-sm">
                <option>UTC</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Notifications</h2>
          <div className="mt-4 space-y-3 text-sm">
            {["Email me a weekly report", "Notify on urgent inbox items", "Notify when a post fails to publish"].map((l) => (
              <label key={l} className="flex items-center justify-between">
                <span>{l}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-red-600">Danger zone</h2>
          <p className="mt-1 text-xs text-neutral-500">Delete this workspace and all its data.</p>
          <button className="mt-3 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
            Delete workspace
          </button>
        </div>
      </section>
    </div>
  );
}
