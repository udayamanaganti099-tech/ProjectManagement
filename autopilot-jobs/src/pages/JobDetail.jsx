import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function JobDetail() {
  const { jobId } = useParams()

  return (
    <div className="px-8 py-8 max-w-3xl">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-paper-muted hover:text-paper mb-6">
        <ArrowLeft size={15} /> Back to matches
      </Link>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-semibold text-2xl mb-1">Senior Frontend Engineer</h1>
            <p className="text-sm text-paper-muted">Nordfield Labs &middot; Remote &middot; $140k&ndash;$170k</p>
          </div>
          <div className="num text-2xl font-medium text-signal">94%</div>
        </div>

        <p className="text-sm text-paper-muted leading-relaxed mb-6">
          Job ID: <span className="num">{jobId}</span>. This is placeholder copy for the
          job description &mdash; wire this up to your job data source when the
          functionality is ready.
        </p>

        <button className="bg-signal text-ink font-medium px-5 py-2.5 rounded-md hover:bg-signal/90 transition-colors">
          Apply with autopilot
        </button>
      </div>
    </div>
  )
}
