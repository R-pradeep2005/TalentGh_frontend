import { motion } from 'framer-motion'
import { Loader2, Zap } from 'lucide-react'
import TextInput from './TextInput'

interface UploadCardProps {
  jobDescriptionText: string
  onJobDescriptionTextChange: (text: string) => void
  githubUsername: string
  onGithubUsernameChange: (text: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function UploadCard({
  jobDescriptionText,
  onJobDescriptionTextChange,
  githubUsername,
  onGithubUsernameChange,
  onAnalyze,
  isAnalyzing,
}: UploadCardProps) {
  const canAnalyze = Boolean(jobDescriptionText && githubUsername) && !isAnalyzing

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
          Enter the job description and GitHub username to generate a candidate score.
        </p>
      </div>

      <div className="space-y-6">
        <TextInput
          label="Job Description"
          description="The role being hired for"
          value={jobDescriptionText}
          onChange={onJobDescriptionTextChange}
          placeholder="Paste or type the job description here..."
          accentFrom="from-accent-blue"
          accentTo="to-accent-purple"
          icon="text"
        />

        <TextInput
          label="GitHub Username"
          description="The candidate's GitHub username"
          value={githubUsername}
          onChange={onGithubUsernameChange}
          placeholder="e.g., johndoe"
          accentFrom="from-accent-purple"
          accentTo="to-accent-pink"
          icon="github"
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
