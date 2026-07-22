import { motion } from 'framer-motion'
import { CheckCircle2, Lightbulb, XCircle } from 'lucide-react'
import type { ComplianceCheck, RecommendationItem } from '../types'

interface RecommendationsComplianceCardProps {
  recommendations: RecommendationItem[]
  compliance: ComplianceCheck
}

function formatLabel(key: string): string {
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function isMet(value: string): boolean {
  return !/\bnot\b/i.test(value)
}

export default function RecommendationsComplianceCard({
  recommendations,
  compliance,
}: RecommendationsComplianceCardProps) {
  const complianceEntries = Object.entries(compliance)

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

      <div className="relative">
        <div className="mb-6 flex items-center gap-2">
          <Lightbulb className="h-4.5 w-4.5 text-accent-cyan" />
          <h3 className="text-2xl font-bold text-white md:text-3xl">Recommendations</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={`${rec.recommendation}-${i}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-sm font-semibold text-white">{rec.recommendation}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{rec.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
              Compliance Checklist
            </p>
            <ul className="space-y-3">
              {complianceEntries.map(([key, value]) => {
                const met = isMet(value)
                return (
                  <li key={key} className="flex items-start gap-2.5">
                    {met ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{formatLabel(key)}</p>
                      <p className="text-xs text-slate-500">{value}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
