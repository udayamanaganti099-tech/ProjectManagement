import { Link } from 'react-router-dom'

const columns = [
  {
    key: 'QUEUED',
    label: 'Queued',
    items: [{ id: '1', company: 'Meridian Health', role: 'Backend Engineer, Go' }],
  },
  {
    key: 'APPLIED',
    label: 'Applied',
    items: [{ id: '2', company: 'Nordfield Labs', role: 'Senior Frontend Engineer' }],
  },
  {
    key: 'INTERVIEW',
    label: 'Interview',
    items: [{ id: '3', company: 'Circuit & Sons', role: 'Product Designer' }],
  },
  {
    key: 'OFFER',
    label: 'Offer',
    items: [{ id: '4', company: 'Kettle Data', role: 'Data Analyst' }],
  },
  {
    key: 'REJECTED',
    label: 'Rejected',
    items: [{ id: '5', company: 'Lowlight Studio', role: 'Motion Designer' }],
  },
]

const COLUMN_ACCENT = {
  QUEUED: 'text-paper-muted',
  APPLIED: 'text-signal',
  INTERVIEW: 'text-signal',
  OFFER: 'text-offer',
  REJECTED: 'text-rejected',
}

export default function Applications() {
  return (
    <div className="px-8 py-8">
      <h1 className="font-display font-semibold text-2xl mb-1">Applications</h1>
      <p className="text-sm text-paper-muted mb-8">Everything autopilot has filed, gate by gate.</p>

      <div className="grid grid-cols-5 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="min-w-0">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs uppercase tracking-widest ${COLUMN_ACCENT[col.key]}`}>
                {col.label}
              </span>
              <span className="num text-xs text-paper-faint">{col.items.length}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/applications/${item.id}`}
                  className="block border border-ink-line bg-ink-panel rounded-md p-3 hover:border-signal/60 transition-colors"
                >
                  <div className="text-sm font-medium truncate">{item.company}</div>
                  <div className="text-xs text-paper-muted truncate">{item.role}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
