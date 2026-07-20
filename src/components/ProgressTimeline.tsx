import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Circle } from 'lucide-react'
import type { ProgressStage } from '../types'

interface ProgressTimelineProps {
  stages: ProgressStage[]
}

export default function ProgressTimeline({ stages }: ProgressTimelineProps) {
  return (
    <div className="glass-card p-6 md:p-8" aria-label="Analysis progress">
      <h3 className="mb-6 text-lg font-semibold text-white">Analysis Progress</h3>
      <ol className="space-y-1">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-300"
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              {stage.status === 'complete' && (
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              )}
              {stage.status === 'active' && (
                <Loader2 className="h-6 w-6 animate-spin text-accent-cyan" />
              )}
              {stage.status === 'pending' && (
                <Circle className="h-5 w-5 text-slate-600" />
              )}
              {stage.status === 'active' && (
                <span className="absolute -inset-1 -z-10 animate-pulse-glow rounded-full bg-accent-cyan/20 blur-md" />
              )}
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                stage.status === 'complete'
                  ? 'text-slate-300'
                  : stage.status === 'active'
                    ? 'text-white'
                    : 'text-slate-600'
              }`}
            >
              {stage.label}
            </span>
            {i < stages.length - 1 && (
              <span className="ml-auto hidden text-xs text-slate-700 sm:inline" aria-hidden="true">
                {/* connecting spacer */}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
