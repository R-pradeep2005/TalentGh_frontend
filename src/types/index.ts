// Core domain types for the Talent Acquisition GitHub Analyzer

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical'

export interface KeyIssue {
  issue: string
  description: string
  severity: Severity
}

export interface RecommendationItem {
  recommendation: string
  description: string
}

export interface ComplianceCheck {
  java_proficiency: string
  spring_framework: string
  j2ee: string
  relational_databases: string
  maven_gradle: string
  git: string
  ood_principles: string
  agile_methodologies: string
  [key: string]: string
}

export interface ReviewFeedback {
  repository_overview: string
  key_issues: KeyIssue[]
  recommendations: RecommendationItem[]
  compliance_check: ComplianceCheck
}

export interface EvidenceItem {
  file: string
  reason: string
}

export interface SkillAnalysis {
  score: number
  matching_skills: string[]
  missing_skills: string[]
  strengths: string[]
  weaknesses: string[]
  evidence: EvidenceItem[]
  summary: string
}

export interface AnalysisResult {
  repository: string
  analysis: SkillAnalysis
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

export type AnalyzeResponse = AnalysisResult
