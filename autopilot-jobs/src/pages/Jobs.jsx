import { Link } from 'react-router-dom'

const jobs = [
  { id: '1', company: 'Nordfield Labs', role: 'Senior Frontend Engineer', match: 94, location: 'Remote', salary: '$140k\u2013$170k' },
  { id: '2', company: 'Circuit & Sons', role: 'Product Designer', match: 89, location: 'New York, NY', salary: '$120k\u2013$150k' },
  { id: '3', company: 'Meridian Health', role: 'Backend Engineer, Go', match: 82, location: 'Austin, TX', salary: '$130k\u2013$160k' },
  { id: '4', company: 'Kettle Data', role: 'Data Analyst', match: 77, location: 'Remote', salary: '$95k\u2013$115k' },
]

export default function Jobs() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <h1 className="font-display font-semibold text-2xl mb-1">Matched jobs</h1>
      <p className="text-sm text-paper-muted mb-8">Ranked by fit against your flight rules.</p>

      <div className="space-y-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="flex items-center justify-between border border-ink-line bg-ink-panel rounded-lg p-5 hover:border-signal/60 transition-colors"
          >
            <div>
              <h3 className="font-display font-medium text-base mb-1">{job.role}</h3>
              <p className="text-sm text-paper-muted">
                {job.company} &middot; {job.location} &middot; {job.salary}
              </p>
            </div>
            <div className="text-right">
              <div className="num text-lg font-medium text-signal">{job.match}%</div>
              <div className="text-xs text-paper-faint">match</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
