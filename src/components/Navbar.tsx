import { motion } from 'framer-motion'
import { BrainCircuit, Github } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-white/5 bg-base-900/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple shadow-glow">
            <BrainCircuit className="h-5 w-5 text-white" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Talent<span className="gradient-text">GH</span>
          </span>
        </a>

      

        <a
          href="https://github.com/R-pradeep2005/TalentGH"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </motion.header>
  )
}
