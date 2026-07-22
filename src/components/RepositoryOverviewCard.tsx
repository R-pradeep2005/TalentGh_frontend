import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'

interface RepositoryOverviewCardProps {
  repository: string
  overview: string
}

export default function RepositoryOverviewCard({
  repository,
  overview,
}: RepositoryOverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="glass-card glass-card-hover p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20">
          <FolderGit2 className="h-5 w-5 text-accent-cyan" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Repository</p>
          <h3 className="truncate text-lg font-semibold text-white">{repository}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-400">{overview}</p>
    </motion.div>
  )
}
