import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display font-semibold text-lg tracking-tight block mb-10 text-center">
          autopilot
        </Link>
        <div className="border border-ink-line bg-ink-panel rounded-lg p-8">
          <h1 className="font-display font-semibold text-xl mb-1">Welcome back</h1>
          <p className="text-sm text-paper-muted mb-6">Log in to check your board.</p>

          <form className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-signal text-ink font-medium py-2.5 rounded-md hover:bg-signal/90 transition-colors"
            >
              Log in
            </button>
          </form>
        </div>
        <p className="text-sm text-paper-muted text-center mt-6">
          New here?{' '}
          <Link to="/signup" className="text-signal hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
