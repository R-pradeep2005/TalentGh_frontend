import { motion } from 'framer-motion'

export interface EvidenceItem {
  file: string
  reason: string
}

export interface AnalysisResult {
  score: number
  matching_skills: string[]
  missing_skills: string[]
  strengths: string[]
  weaknesses: string[]
  evidence: EvidenceItem[]
  summary: string
}

interface AnalysisReportCardProps {
  repository: string
  analysis: AnalysisResult
}

function scoreColor(score: number) {
  if (score >= 70) return { text: 'text-emerald-400', ring: '#34d399' }
  if (score >= 40) return { text: 'text-amber-400', ring: '#fbbf24' }
  return { text: 'text-rose-400', ring: '#fb7185' }
}

function ScoreRing({ score }: { score: number }) {
  const { text, ring } = scoreColor(score)
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={ring}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold ${text}`}>{score}</span>
        <span className="text-[11px] text-slate-500">/ 100</span>
      </div>
    </div>
  )
}

function SkillChip({ label, matched }: { label: string; matched: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        matched
          ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
          : 'border-rose-800 bg-rose-950/60 text-rose-300'
      }`}
    >
      <span className="font-mono">{matched ? '+' : '−'}</span>
      {label}
    </span>
  )
}

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'positive' | 'negative'
}) {
  return (
    <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h4 className="mb-3 text-sm font-semibold text-slate-200">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-400">
            <span className={tone === 'positive' ? 'text-emerald-500' : 'text-rose-500'}>
              {tone === 'positive' ? '✓' : '✗'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AnalysisReportCard({ repository, analysis }: AnalysisReportCardProps) {
  const {
    score,
    matching_skills: matchingSkills,
    missing_skills: missingSkills,
    strengths,
    weaknesses,
    evidence,
    summary,
  } = analysis

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <ScoreRing score={score} />
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-wide text-slate-500">Skill match report</p>
          <h3 className="text-xl font-bold text-white">{repository}</h3>
          <p className="mt-1 font-mono text-xs text-slate-500">
            <span className="text-emerald-400">+{matchingSkills.length} matched</span>
            {'  '}
            <span className="text-rose-400">−{missingSkills.length} missing</span>
          </p>
        </div>
      </div>

      {/* Skill diff */}
      <div>
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((s) => (
            <SkillChip key={s} label={s} matched />
          ))}
          {missingSkills.map((s) => (
            <SkillChip key={s} label={s} matched={false} />
          ))}
        </div>
      </div>

      {/* Strengths / weaknesses */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <ListBlock title="Strengths" items={strengths} tone="positive" />
        <ListBlock title="Weaknesses" items={weaknesses} tone="negative" />
      </div>

      {/* Evidence */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-200">Evidence</h4>
        <ul className="space-y-3">
          {evidence.map((e, i) => (
            <li key={i} className="text-sm">
              <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-sky-300">
                {e.file}
              </code>
              <p className="mt-1 text-slate-400">{e.reason}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="border-l-2 border-slate-700 pl-4">
        <p className="text-sm italic text-slate-400">{summary}</p>
      </div>
    </motion.div>
  )
}
