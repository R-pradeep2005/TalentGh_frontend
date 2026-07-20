import { motion } from 'framer-motion'
import { Award, TrendingUp } from 'lucide-react'
import type { Recommendation } from '../types'

interface RecommendationCardProps {
  overallScore: number
  recommendation: Recommendation
}

const BADGE_STYLES: Record<Recommendation, string> = {
  'Strong Hire': 'from-emerald-400 to-teal-400 text-emerald-950',
  Hire: 'from-accent-cyan to-accent-blue text-slate-950',
  Consider: 'from-amber-400 to-orange-400 text-amber-950',
  'Needs Improvement': 'from-rose-500 to-red-500 text-white',
}

const RADIUS = 70
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function RecommendationCard({
  overallScore,
  recommendation,
}: RecommendationCardProps) {
  const offset = CIRCUMFERENCE - (overallScore / 100) * CIRCUMFERENCE

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="glass-card glass-card-hover relative overflow-hidden p-8 md:p-12"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent-cyan/15 blur-3xl" />

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" />
            Overall Candidate Score
          </span>
          <h3 className="text-2xl font-bold text-white md:text-3xl">Hiring Recommendation</h3>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Aggregated from repository quality, documentation, and relevance to
            the job description.
          </p>

          <div
            className={`mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-5 py-2 text-sm font-bold shadow-glow ${BADGE_STYLES[recommendation]}`}
          >
            <Award className="h-4 w-4" />
            {recommendation}
          </div>
        </div>

        <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{overallScore}</span>
            <span className="text-xs font-medium text-slate-400">out of 100</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
