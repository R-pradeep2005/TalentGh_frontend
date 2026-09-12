import { useCallback, useRef, useState } from 'react'
import { analyzeCandidate, ApiError } from '../services/api'
import type { AnalysisResult, ProgressStage } from '../types'

const STAGE_DEFS: Omit<ProgressStage, 'status'>[] = [
  { id: 'username', label: 'GitHub Username Received' },
  { id: 'repos', label: 'Repositories Retrieved' },
  { id: 'requirements', label: 'Extracting Job Requirements' },
  { id: 'ranking', label: 'Ranking Repositories' },
  { id: 'ai', label: 'AI Repository Analysis' },
  { id: 'done', label: 'Completed' },
]

const initialStages: ProgressStage[] = STAGE_DEFS.map((s, i) => ({
  ...s,
  status: i === 0 ? 'active' : 'pending',
}))

type AnalysisPhase = 'idle' | 'running' | 'success' | 'error'

interface UseAnalysisReturn {
  phase: AnalysisPhase
  stages: ProgressStage[]
  result: AnalysisResult | null
  error: string | null
  run: (jobDescription?: File, jobDescriptionText?: string, githubUsername?: string) => Promise<void>
  reset: () => void
}

export function useAnalysis(): UseAnalysisReturn {
  const [phase, setPhase] = useState<AnalysisPhase>('idle')
  const [stages, setStages] = useState<ProgressStage[]>(initialStages)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const advanceStage = useCallback((index: number) => {
    setStages((prev) =>
      prev.map((s, i) => ({
        ...s,
        status: i < index ? 'complete' : i === index ? 'active' : 'pending',
      })),
    )
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setStages(initialStages)
    setResult(null)
    setError(null)
  }, [])

  const run = useCallback(
    async (jobDescription?: File, jobDescriptionText?: string, githubUsername?: string) => {
      clearTimers()
      setPhase('running')
      setError(null)
      setResult(null)
      setStages(initialStages)

      // Simulated staged progression for stages that precede the network response.
      // Real repo retrieval / ranking / AI analysis happen server-side inside /analyze;
      // this timeline gives the recruiter visibility while that request is in flight.
      const scheduled = [0, 1, 2, 3].map((stageIndex, i) =>
        window.setTimeout(() => advanceStage(stageIndex), (i + 1) * 900),
      )
      timers.current = scheduled

      try {
        const data = await analyzeCandidate({ 
          jobDescription, 
          jobDescriptionText,
          githubUsername 
        })
        clearTimers()
        advanceStage(4)
        window.setTimeout(() => {
          setStages((prev) => prev.map((s) => ({ ...s, status: 'complete' })))
          setResult(data)
          setPhase('success')
        }, 700)
      } catch (err) {
        clearTimers()
        setPhase('error')
        setError(err instanceof ApiError ? err.message : 'Analysis failed unexpectedly.')
      }
    },
    [advanceStage],
  )

  return { phase, stages, result, error, run, reset }
}
