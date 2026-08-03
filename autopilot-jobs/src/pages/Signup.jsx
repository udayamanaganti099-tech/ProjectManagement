import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-ink text-paper font-body flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display font-semibold text-lg tracking-tight block mb-10 text-center">
          autopilot
        </Link>
        <div className="border border-ink-line bg-ink-panel rounded-lg p-8">
          <h1 className="font-display font-semibold text-xl mb-1">Create your account</h1>
          <p className="text-sm text-paper-muted mb-6">Takes about a minute.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                Full name
              </label>
              <input
                type="text"
                className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                placeholder="Jordan Vega"
              />
            </div>
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
              Continue to onboarding
            </button>
          </form>
        </div>
        <p className="text-sm text-paper-muted text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-signal hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
