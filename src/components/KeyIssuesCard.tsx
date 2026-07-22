import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ChevronDown } from 'lucide-react'
import type { KeyIssue, Severity } from '../types'

interface KeyIssuesCardProps {
  issues: KeyIssue[]
}

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: 'from-rose-500 to-red-500 text-white',
  High: 'from-amber-400 to-orange-400 text-amber-950',
  Medium: 'from-accent-cyan to-accent-blue text-slate-950',
  Low: 'from-emerald-400 to-teal-400 text-emerald-950',
}

const SEVERITY_ORDER: Record<Severity, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
}

export default function KeyIssuesCard({ issues }: KeyIssuesCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const sorted = [...issues].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <AlertTriangle className="h-4.5 w-4.5 text-accent-cyan" />
        <h3 className="text-lg font-semibold text-white">Key Issues</h3>
        <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-400">
          {issues.length} found
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map((issue, i) => {
          const isExpanded = expandedIndex === i
          return (
            <div
              key={`${issue.issue}-${i}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                aria-expanded={isExpanded}
                className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.03]"
              >
                <span
                  className={`shrink-0 rounded-full bg-gradient-to-r px-2.5 py-1 text-[11px] font-bold ${SEVERITY_STYLES[issue.severity]}`}
                >
                  {issue.severity}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                  {issue.issue}
                </span>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden border-t border-white/10 bg-white/[0.02]"
                  >
                    <p className="p-4 text-sm leading-relaxed text-slate-400">
                      {issue.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
