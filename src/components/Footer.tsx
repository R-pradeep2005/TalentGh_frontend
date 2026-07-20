import { BrainCircuit } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-accent-cyan" />
          <span>Talent Acquisition GitHub Analyzer</span>
        </div>
        <p>Built for evaluating engineering talent through real code, not just resumes.</p>
      </div>
    </footer>
  )
}
