import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body flex flex-col items-center justify-center px-6 text-center">
      <div className="num text-signal text-sm uppercase tracking-widest mb-3">Flight not found</div>
      <h1 className="font-display font-semibold text-3xl mb-3">404</h1>
      <p className="text-paper-muted mb-6">This page never took off.</p>
      <Link to="/" className="text-signal hover:underline text-sm">
        Return home
      </Link>
    </div>
  )
}
