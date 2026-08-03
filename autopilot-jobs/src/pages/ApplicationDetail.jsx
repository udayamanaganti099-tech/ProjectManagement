import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const timeline = [
  { label: 'Application queued', time: 'Jul 1, 9:02 AM' },
  { label: 'Application submitted', time: 'Jul 1, 9:03 AM' },
  { label: 'Viewed by recruiter', time: 'Jul 2, 11:20 AM' },
]

export default function ApplicationDetail() {
  const { appId } = useParams()

  return (
    <div className="px-8 py-8 max-w-2xl">
      <Link to="/applications" className="inline-flex items-center gap-1 text-sm text-paper-muted hover:text-paper mb-6">
        <ArrowLeft size={15} /> Back to applications
      </Link>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-8">
        <h1 className="font-display font-semibold text-xl mb-1">Senior Frontend Engineer</h1>
        <p className="text-sm text-paper-muted mb-6">
          Nordfield Labs &middot; application <span className="num">#{appId}</span>
        </p>

        <div className="space-y-4">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="h-2 w-2 rounded-full bg-signal mt-1.5" />
                {i < timeline.length - 1 && <span className="w-px flex-1 bg-ink-line mt-1" />}
              </div>
              <div className="pb-4">
                <div className="text-sm">{step.label}</div>
                <div className="num text-xs text-paper-faint">{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
