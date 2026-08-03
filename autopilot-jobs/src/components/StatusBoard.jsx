import { useEffect, useState } from 'react'

const STATUS_STYLES = {
  QUEUED: 'text-paper-muted',
  APPLIED: 'text-signal',
  INTERVIEW: 'text-signal',
  OFFER: 'text-offer',
  REJECTED: 'text-rejected',
}

/**
 * A single split-flap row: company / role / status, styled like an
 * airport departures board. Flips a subtle animation on mount/update.
 */
function BoardRow({ company, role, status, time }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(true)
    const t = setTimeout(() => setFlipped(false), 500)
    return () => clearTimeout(t)
  }, [status])

  return (
    <div
      className={`grid grid-cols-[1fr_1.4fr_auto_auto] items-center gap-4 px-4 py-3 border-b border-ink-line last:border-b-0 ${
        flipped ? 'animate-flip' : ''
      }`}
      style={{ transformOrigin: 'center' }}
    >
      <span className="num text-sm text-paper truncate">{company}</span>
      <span className="text-sm text-paper-muted truncate">{role}</span>
      <span className="num text-xs text-paper-faint">{time}</span>
      <span
        className={`num text-xs font-medium tracking-wide ${
          STATUS_STYLES[status] || 'text-paper-muted'
        }`}
      >
        {status}
      </span>
    </div>
  )
}

export default function StatusBoard({ rows }) {
  return (
    <div className="rounded-lg border border-ink-line bg-ink-panel shadow-panel overflow-hidden">
      <div className="grid grid-cols-[1fr_1.4fr_auto_auto] gap-4 px-4 py-2.5 border-b border-ink-line bg-ink-raised/40">
        <span className="text-xs uppercase tracking-widest text-paper-faint">Company</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">Role</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">Time</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">Status</span>
      </div>
      {rows.map((r, i) => (
        <BoardRow key={i} {...r} />
      ))}
    </div>
  )
}
