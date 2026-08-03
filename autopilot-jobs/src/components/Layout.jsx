import { NavLink, Outlet } from 'react-router-dom'
import { LayoutGrid, Radar, PlaneTakeoff, UserRound, Settings as SettingsIcon } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/jobs', label: 'Jobs', icon: Radar },
  { to: '/applications', label: 'Applications', icon: PlaneTakeoff },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-ink-line flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-ink-line">
          <span className="font-display font-semibold text-lg tracking-tight">
            autopilot
          </span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-ink-raised text-paper'
                    : 'text-paper-muted hover:bg-ink-panel hover:text-paper'
                }`
              }
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-line">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-ink-panel">
            <span className="relative flex h-2 w-2">
              <span className="animate-blink absolute inline-flex h-full w-full rounded-full bg-signal" />
            </span>
            <span className="text-xs text-paper-muted num">autopilot: ON</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
