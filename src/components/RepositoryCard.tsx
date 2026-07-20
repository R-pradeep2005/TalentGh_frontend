import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import type { Repository } from '../types'

interface RepositoryCardProps {
  repository: Repository
  index: number
}

const SCORE_LABELS: { key: keyof Repository['scores']; label: string }[] = [
  { key: 'codeQuality', label: 'Code Quality' },
  { key: 'readmeQuality', label: 'README Quality' },
  { key: 'errorHandling', label: 'Error Handling' },
  { key: 'technicalWriting', label: 'Technical Writing' },
  { key: 'jobRelevance', label: 'Job Description Relevance' },
]

function scoreColor(score: number): string {
  if (score >= 80) return 'from-emerald-400 to-teal-400'
  if (score >= 60) return 'from-accent-cyan to-accent-blue'
  if (score >= 40) return 'from-amber-400 to-orange-400'
  return 'from-rose-500 to-red-500'
}

export default function RepositoryCard({ repository, index }: RepositoryCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass-card glass-card-hover overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="truncate text-base font-semibold text-white">{repository.name}</h4>
            <p className="mt-1 line-clamp-2 text-sm text-slate-400">{repository.description}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${scoreColor(
                repository.overallScore,
              )} shadow-glow`}
            >
              <span className="text-lg font-bold text-white">{repository.overallScore}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-medium text-slate-300">
            {repository.primaryLanguage}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
            {repository.stars.toLocaleString()}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {repository.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-400"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          {expanded ? 'Hide breakdown' : 'View score breakdown'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-white/[0.02]"
          >
            <div className="space-y-4 p-6">
              {SCORE_LABELS.map(({ key, label }, i) => {
                const value = repository.scores[key]
                return (
                  <div key={key}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{label}</span>
                      <span className="font-semibold text-white">{value}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${scoreColor(value)}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
