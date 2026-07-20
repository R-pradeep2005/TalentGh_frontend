import { motion } from 'framer-motion'

function SkeletonBar({ width = '100%' }: { width?: string }) {
  return (
    <div
      className="h-3 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer"
      style={{ width }}
    />
  )
}

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2"
      aria-busy="true"
      aria-label="Loading analysis results"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-card space-y-4 p-6">
          <SkeletonBar width="40%" />
          <SkeletonBar width="90%" />
          <SkeletonBar width="70%" />
          <div className="flex gap-2 pt-2">
            <SkeletonBar width="20%" />
            <SkeletonBar width="20%" />
            <SkeletonBar width="20%" />
          </div>
        </div>
      ))}
    </motion.div>
  )
}
