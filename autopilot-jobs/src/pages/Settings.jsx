export default function Settings() {
  return (
    <div className="px-8 py-8 max-w-2xl">
      <h1 className="font-display font-semibold text-2xl mb-1">Settings</h1>
      <p className="text-sm text-paper-muted mb-8">Autopilot rules and integrations.</p>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-6 mb-6">
        <h2 className="font-display font-medium text-base mb-1">API key</h2>
        <p className="text-sm text-paper-muted mb-4">
          Used to power resume matching and application drafting.
        </p>
        <input
          type="password"
          className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm num placeholder:text-paper-faint focus:border-signal transition-colors"
          placeholder="sk-&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        />
      </div>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-6 mb-6">
        <h2 className="font-display font-medium text-base mb-1">Autopilot</h2>
        <p className="text-sm text-paper-muted mb-4">Pause or resume automatic applications.</p>
        <div className="flex items-center justify-between border border-ink-line rounded-md p-4">
          <span className="text-sm">Autopilot is currently on</span>
          <button className="text-sm text-rejected hover:underline">Pause</button>
        </div>
      </div>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-6">
        <h2 className="font-display font-medium text-base mb-1">Notifications</h2>
        <p className="text-sm text-paper-muted">
          Notification preferences will live here.
        </p>
      </div>
    </div>
  )
}
