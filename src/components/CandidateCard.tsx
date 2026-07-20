import { motion } from 'framer-motion'
import { FileText, FolderGit2, Github } from 'lucide-react'
import type { Candidate } from '../types'

interface CandidateCardProps {
  candidate: Candidate
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const stats = [
    {
      icon: FileText,
      label: 'Resume',
      value: candidate.resumeFilename,
    },
    {
      icon: Github,
      label: 'GitHub Username',
      value: `@${candidate.githubUsername}`,
    },
    {
      icon: FolderGit2,
      label: 'Repositories Found',
      value: String(candidate.repositoryCount),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="glass-card glass-card-hover p-6 md:p-8"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Candidate</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20">
              <Icon className="h-4.5 w-4.5 text-accent-cyan" />
            </span>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 truncate text-sm font-semibold text-white" title={value}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
