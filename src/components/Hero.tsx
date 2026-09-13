import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Github, Sparkles } from 'lucide-react'

interface HeroProps {
  onAnalyzeClick: () => void
}

export default function Hero({ onAnalyzeClick }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 60, damping: 20 })
  const springY = useSpring(my, { stiffness: 60, damping: 20 })

  const blobX = useTransform(springX, [-1, 1], [-24, 24])
  const blobY = useTransform(springY, [-1, 1], [-24, 24])
  const blobX2 = useTransform(springX, [-1, 1], [18, -18])
  const blobY2 = useTransform(springY, [-1, 1], [18, -18])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    mx.set(relX * 2 - 1)
    my.set(relY * 2 - 1)
  }

  return (
    <div
      id="top"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-6 pb-28 pt-20 md:pt-28"
    >
      {/* Parallax glow blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none absolute left-1/2 top-10 h-[26rem] w-[26rem] -translate-x-[70%] rounded-full bg-accent-blue/25 blur-3xl"
      />
      <motion.div
        style={{ x: blobX2, y: blobY2 }}
        className="pointer-events-none absolute right-1/4 top-24 h-[22rem] w-[22rem] rounded-full bg-accent-purple/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl text-center">
         
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Talent Acquisition{' '}
          <span className="gradient-text">GitHub Analyzer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400"
        >
          AI-powered candidate evaluation using GitHub repositories and Large
          Language Models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button onClick={onAnalyzeClick} className="btn-primary group flex items-center gap-2">
            Analyze Candidate
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="https://github.com/R-pradeep2005/TalentGH-Java-"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            View GitHub
          </a>
        </motion.div>
      </div>
    </div>
  )
}
