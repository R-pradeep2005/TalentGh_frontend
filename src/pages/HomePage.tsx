import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from '../components/Hero'
import UploadCard from '../components/UploadCard'
import ProgressTimeline from '../components/ProgressTimeline'
import RepositoryOverviewCard from '../components/RepositoryOverviewCard'
import KeyIssuesCard from '../components/KeyIssuesCard'
import RecommendationsComplianceCard from '../components/RecommendationsComplianceCard'
import LoadingOverlay from '../components/LoadingOverlay'
import { useAnalysis } from '../hooks/useAnalysis'
import { useToast } from '../hooks/useToast'
import ToastContainer from '../components/Toast'

export default function HomePage() {
  const [resume, setResume] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState<File | null>(null)
  const uploadSectionRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const { phase, stages, result, error, run, reset } = useAnalysis()
  const { toasts, push, dismiss } = useToast()

  const isAnalyzing = phase === 'running'
  const feedback = result?.analysis.review_feedback

  useEffect(() => {
    if (phase === 'error' && error) {
      push(error, 'error')
    }
  }, [phase, error, push])

  useEffect(() => {
    if (phase === 'success') {
      push('Analysis complete — review is ready.', 'success')
      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }, [phase, push])

  function scrollToUpload() {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleAnalyze() {
    if (!resume || !jobDescription) return
    await run(resume, jobDescription)
  }

  function handleStartOver() {
    reset()
    setResume(null)
    setJobDescription(null)
    scrollToUpload()
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      <Hero onAnalyzeClick={scrollToUpload} />

      <section id="analyze" ref={uploadSectionRef} className="px-6 py-10">
        <UploadCard
          resume={resume}
          jobDescription={jobDescription}
          onResumeSelect={setResume}
          onJobDescriptionSelect={setJobDescription}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      </section>

      <AnimatePresence mode="wait">
        {(isAnalyzing || phase === 'error') && (
          <motion.section
            key="progress"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-auto max-w-3xl px-6 pb-10"
          >
            <ProgressTimeline stages={stages} />
            {isAnalyzing && <LoadingOverlay />}
          </motion.section>
        )}
      </AnimatePresence>

      {phase === 'success' && result && feedback && (
        <section
          ref={resultsRef}
          id="results"
          className="mx-auto max-w-5xl space-y-8 px-6 pb-24 pt-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <h2 className="text-2xl font-bold text-white md:text-3xl">Review Dashboard</h2>
            <p className="text-sm text-slate-400">
              Here&apos;s how {result.repository} stacks up against the job description.
            </p>
          </motion.div>

          <RepositoryOverviewCard
            repository={result.repository}
            overview={feedback.repository_overview}
          />

          <KeyIssuesCard issues={feedback.key_issues} />

          <RecommendationsComplianceCard
            recommendations={feedback.recommendations}
            compliance={feedback.compliance_check}
          />

          <div className="flex justify-center pt-4">
            <button type="button" onClick={handleStartOver} className="btn-secondary">
              Analyze another repository
            </button>
          </div>
        </section>
      )}
    </>
  )
}
