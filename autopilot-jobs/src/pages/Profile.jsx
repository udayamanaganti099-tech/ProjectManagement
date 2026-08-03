import { FileText, Plus } from 'lucide-react'

export default function Profile() {
  return (
    <div className="px-8 py-8 max-w-3xl">
      <h1 className="font-display font-semibold text-2xl mb-1">Profile</h1>
      <p className="text-sm text-paper-muted mb-8">Your resume and cover letter templates.</p>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-6 mb-6">
        <h2 className="font-display font-medium text-base mb-4">Resume</h2>
        <div className="flex items-center gap-3 border border-ink-line rounded-md p-4">
          <FileText size={20} className="text-signal" strokeWidth={1.75} />
          <div className="flex-1">
            <div className="text-sm">resume_jordan_vega.pdf</div>
            <div className="text-xs text-paper-faint num">Uploaded Jul 1, 2026</div>
          </div>
          <button className="text-sm text-signal hover:underline">Replace</button>
        </div>
      </div>

      <div className="border border-ink-line bg-ink-panel rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-medium text-base">Cover letter templates</h2>
          <button className="inline-flex items-center gap-1 text-sm text-signal hover:underline">
            <Plus size={15} /> New template
          </button>
        </div>
        <p className="text-sm text-paper-muted">
          No templates yet. Autopilot will generate one from your resume the first
          time it needs it, or you can write your own.
        </p>
      </div>
    </div>
  )
}
