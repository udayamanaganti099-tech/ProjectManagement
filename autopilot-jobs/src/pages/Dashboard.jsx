import { Link } from 'react-router-dom'
import StatusBoard from '../components/StatusBoard.jsx'

const stats = [
  { label: 'Applied this week', value: '23' },
  { label: 'In flight', value: '5' },
  { label: 'Interviews', value: '3' },
  { label: 'Offers', value: '1' },
]

const recentRows = [
  { company: 'Nordfield Labs', role: 'Senior Frontend Engineer', status: 'APPLIED', time: '2h ago' },
  { company: 'Circuit & Sons', role: 'Product Designer', status: 'INTERVIEW', time: '5h ago' },
  { company: 'Meridian Health', role: 'Backend Engineer, Go', status: 'QUEUED', time: '1d ago' },
  { company: 'Kettle Data', role: 'Data Analyst', status: 'OFFER', time: '2d ago' },
]

export default function Dashboard() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-semibold text-2xl">Dashboard</h1>
          <p className="text-sm text-paper-muted mt-1">Here's what autopilot did while you were away.</p>
        </div>
        <Link
          to="/jobs"
          className="text-sm bg-signal text-ink font-medium px-4 py-2 rounded-md hover:bg-signal/90 transition-colors"
        >
          Browse matches
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="border border-ink-line bg-ink-panel rounded-lg p-5">
            <div className="num text-3xl font-medium mb-1">{s.value}</div>
            <div className="text-xs text-paper-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity board */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-medium text-base">Recent activity</h2>
        <Link to="/applications" className="text-sm text-signal hover:underline">
          View all applications
        </Link>
      </div>
      <StatusBoard rows={recentRows} />
    </div>
  )
}
