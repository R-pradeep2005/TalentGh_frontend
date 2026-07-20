import { useMemo } from 'react'

const PARTICLE_COUNT = 18

export default function AnimatedBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        color: [
          'bg-accent-cyan',
          'bg-accent-blue',
          'bg-accent-purple',
        ][i % 3],
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-accent-blue/20 blur-3xl animate-float" />
      <div
        className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-accent-purple/20 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/15 blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />

      {/* Floating glowing particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-pulse-glow`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 12px 2px currentColor',
            opacity: 0.5,
          }}
        />
      ))}

      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  )
}
