// Core domain types for the Talent Acquisition GitHub Analyzer

export type Recommendation =
  | 'Strong Hire'
  | 'Hire'
  | 'Consider'
  | 'Needs Improvement'

export interface ScoreBreakdown {
  codeQuality: number
  readmeQuality: number
  errorHandling: number
  technicalWriting: number
  jobRelevance: number
}

export interface Repository {
  id: string
  name: string
  description: string
  primaryLanguage: string
  stars: number
  topics: string[]
  overallScore: number
  scores: ScoreBreakdown
}

export interface Candidate {
  resumeFilename: string
  githubUsername: string
  repositoryCount: number
}

export interface AnalysisResult {
  candidate: Candidate
  repositories: Repository[]
  overallScore: number
  recommendation: Recommendation
}

export type ProgressStageStatus = 'pending' | 'active' | 'complete'

export interface ProgressStage {
  id: string
  label: string
  status: ProgressStageStatus
}

export type UploadKind = 'resume' | 'jobDescription'

export interface UploadedFile {
  file: File
  name: string
  size: number
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export interface AnalyzeResponse {
  candidate: Candidate
  repositories: Repository[]
  overallScore: number
  recommendation: Recommendation
}
