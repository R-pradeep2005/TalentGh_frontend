import { motion } from 'framer-motion'
import { Loader2, Zap } from 'lucide-react'
import FileUploader from './FileUploader'

interface UploadCardProps {
  resume: File | null
  jobDescription: File | null
  onResumeSelect: (file: File | null) => void
  onJobDescriptionSelect: (file: File | null) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function UploadCard({
  resume,
  jobDescription,
  onResumeSelect,
  onJobDescriptionSelect,
  onAnalyze,
  isAnalyzing,
}: UploadCardProps) {
  const canAnalyze = Boolean(resume && jobDescription) && !isAnalyzing

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="glass-card glass-card-hover mx-auto max-w-3xl p-6 md:p-10"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Start an evaluation</h2>
        <p className="mt-2 text-sm text-slate-400">
          Upload a resume and the target job description to generate a candidate score.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FileUploader
          label="Resume"
          description="The candidate's resume"
          file={resume}
          onFileSelect={onResumeSelect}
          accentFrom="from-accent-cyan"
          accentTo="to-accent-blue"
        />
        <FileUploader
          label="Job Description"
          description="The role being hired for"
          file={jobDescription}
          onFileSelect={onJobDescriptionSelect}
          accentFrom="from-accent-blue"
          accentTo="to-accent-purple"
        />
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="btn-primary flex w-full max-w-sm items-center justify-center gap-2 text-base md:w-auto md:px-12"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Analyze
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
