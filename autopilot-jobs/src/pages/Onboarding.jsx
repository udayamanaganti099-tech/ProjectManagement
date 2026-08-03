import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, ArrowRight } from 'lucide-react'

const STEPS = ['Upload resume', 'Set flight rules', 'Review']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const isLast = step === STEPS.length - 1

  function next() {
    if (isLast) navigate('/dashboard')
    else setStep((s) => s + 1)
  }

  return (
    <div className="min-h-screen bg-ink text-paper font-body flex flex-col items-center px-6 py-14">
      <div className="w-full max-w-lg">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div
                className={`h-1 rounded-full mb-2 ${
                  i <= step ? 'bg-signal' : 'bg-ink-line'
                }`}
              />
              <span
                className={`text-xs num ${
                  i <= step ? 'text-paper' : 'text-paper-faint'
                }`}
              >
                {String(i + 1).padStart(2, '0')} {label}
              </span>
            </div>
          ))}
        </div>

        <div className="border border-ink-line bg-ink-panel rounded-lg p-8 min-h-[280px] flex flex-col">
          {step === 0 && (
            <div className="flex-1 flex flex-col">
              <h2 className="font-display font-semibold text-xl mb-1">Upload your resume</h2>
              <p className="text-sm text-paper-muted mb-6">
                Autopilot reads this to match roles and pre-fill applications.
              </p>
              <label className="flex-1 border border-dashed border-ink-line rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-signal transition-colors">
                <UploadCloud size={28} className="text-paper-faint" strokeWidth={1.5} />
                <span className="text-sm text-paper-muted">Drop a PDF or click to browse</span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display font-semibold text-xl mb-1">Set your flight rules</h2>
              <p className="text-sm text-paper-muted mb-6">
                Autopilot will only apply within these lines.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                    Target roles
                  </label>
                  <input
                    className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                    placeholder="e.g. Frontend Engineer, Product Designer"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                    Minimum salary
                  </label>
                  <input
                    className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                    placeholder="$90,000"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-paper-faint block mb-2">
                    Locations
                  </label>
                  <input
                    className="w-full bg-ink border border-ink-line rounded-md px-3 py-2.5 text-sm placeholder:text-paper-faint focus:border-signal transition-colors"
                    placeholder="Remote, New York, Austin"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display font-semibold text-xl mb-1">Ready to fly</h2>
              <p className="text-sm text-paper-muted mb-6">
                Autopilot will start matching and applying as soon as you finish setup.
                You can pause it any time from Settings.
              </p>
              <div className="rounded-md bg-ink border border-ink-line p-4 text-sm text-paper-muted num">
                resume.pdf &middot; roles set &middot; rules set
              </div>
            </div>
          )}
        </div>

        <button
          onClick={next}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-signal text-ink font-medium py-2.5 rounded-md hover:bg-signal/90 transition-colors"
        >
          {isLast ? 'Go to dashboard' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
