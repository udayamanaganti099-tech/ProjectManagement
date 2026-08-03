import { Link } from 'react-router-dom'
import { ArrowRight, Radar, FileText, PlaneTakeoff } from 'lucide-react'
import StatusBoard from '../components/StatusBoard.jsx'

const liveRows = [
  { company: 'Nordfield Labs', role: 'Senior Frontend Engineer', status: 'APPLIED', time: '0:02' },
  { company: 'Circuit & Sons', role: 'Product Designer', status: 'INTERVIEW', time: '0:14' },
  { company: 'Meridian Health', role: 'Backend Engineer, Go', status: 'QUEUED', time: '0:20' },
  { company: 'Kettle Data', role: 'Data Analyst', status: 'OFFER', time: '1:02' },
  { company: 'Lowlight Studio', role: 'Motion Designer', status: 'REJECTED', time: '1:40' },
]

const steps = [
  {
    icon: FileText,
    title: 'Load your resume',
    body: 'Upload once. Autopilot reads it, not just as text but as a set of qualifications it can match against roles.',
  },
  {
    icon: Radar,
    title: 'Set your flight rules',
    body: 'Tell it the roles, salary floor, and locations you\u2019ll actually take. It only applies inside those lines.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Watch applications go out',
    body: 'Every submission lands on your board in real time \u2014 queued, applied, interviewing, or done.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body">
      {/* Nav */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <span className="font-display font-semibold text-lg tracking-tight">autopilot</span>
        <nav className="flex items-center gap-6">
          <Link to="/login" className="text-sm text-paper-muted hover:text-paper transition-colors">
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-signal text-ink font-medium px-4 py-2 rounded-md hover:bg-signal/90 transition-colors"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs num text-paper-faint border border-ink-line rounded-full px-3 py-1 mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-blink absolute inline-flex h-full w-full rounded-full bg-signal" />
            </span>
            NOW BOARDING &mdash; 5 APPLICATIONS IN FLIGHT
          </div>
          <h1 className="font-display font-semibold text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
            Your job search,<br />on autopilot.
          </h1>
          <p className="text-paper-muted text-lg max-w-md mb-8 leading-relaxed">
            Autopilot reads your resume, finds roles that match, and files the
            applications itself. You set the flight rules. It does the paperwork.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-signal text-ink font-medium px-5 py-3 rounded-md hover:bg-signal/90 transition-colors"
            >
              Start flying free <ArrowRight size={16} />
            </Link>
            <span className="text-sm text-paper-faint">No card required</span>
          </div>
        </div>

        {/* Signature element: live status board */}
        <div>
          <StatusBoard rows={liveRows} />
          <p className="text-xs text-paper-faint mt-3 num">
            * illustrative &mdash; your board will show your own applications
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-ink-line">
        <h2 className="font-display font-semibold text-2xl mb-10">How it flies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="border border-ink-line rounded-lg p-6 bg-ink-panel">
              <div className="flex items-center justify-between mb-5">
                <Icon size={22} className="text-signal" strokeWidth={1.75} />
                <span className="num text-xs text-paper-faint">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display font-medium text-base mb-2">{title}</h3>
              <p className="text-sm text-paper-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-ink-line text-center">
        <h2 className="font-display font-semibold text-3xl mb-4">Ready for takeoff?</h2>
        <p className="text-paper-muted mb-8">Set your rules once. Let it fly the rest.</p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-signal text-ink font-medium px-6 py-3 rounded-md hover:bg-signal/90 transition-colors"
        >
          Create your account <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-ink-line text-xs text-paper-faint">
        &copy; {new Date().getFullYear()} Autopilot
      </footer>
    </div>
  )
}
