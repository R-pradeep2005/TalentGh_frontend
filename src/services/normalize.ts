import type { AnalysisResult, ComplianceCheck, KeyIssue, RecommendationItem } from '../types'

// The backend's /analyze response is LLM-generated and its field names have been
// observed to drift between calls (e.g. `repository_overview` vs `summary`,
// `recommendation` vs `action`, `compliance_check` vs `compliance_with_job_description`).
// This normalizer maps any known variant onto the canonical shape the UI relies on,
// so a naming drift degrades gracefully instead of crashing the render tree.
// The real fix is constraining the backend's LLM call to a strict output schema —
// this is a safety net, not a substitute for that.

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function normalizeIssues(raw: unknown): KeyIssue[] {
  return asArray<Record<string, unknown>>(raw).map((item) => ({
    issue: String(item.issue ?? item.title ?? 'Untitled issue'),
    description: String(item.description ?? ''),
    severity: (item.severity as KeyIssue['severity']) ?? 'Medium',
  }))
}

function normalizeRecommendations(raw: unknown): RecommendationItem[] {
  return asArray<Record<string, unknown>>(raw).map((item) => ({
    recommendation: String(item.recommendation ?? item.action ?? item.title ?? 'Recommendation'),
    description: String(item.description ?? ''),
  }))
}

function normalizeCompliance(raw: unknown): ComplianceCheck {
  if (!raw || typeof raw !== 'object') return {} as ComplianceCheck
  const entries = Object.entries(raw as Record<string, unknown>).map(([k, v]) => [
    k,
    String(v ?? ''),
  ])
  return Object.fromEntries(entries) as ComplianceCheck
}

export function normalizeAnalysisResult(data: any): AnalysisResult {
  const feedback = data?.analysis?.review_feedback ?? {}

  return {
    repository: String(data?.repository ?? 'Unknown repository'),
    analysis: {
      review_feedback: {
        repository_overview: String(feedback.repository_overview ?? feedback.summary ?? ''),
        key_issues: normalizeIssues(feedback.key_issues),
        recommendations: normalizeRecommendations(feedback.recommendations),
        compliance_check: normalizeCompliance(
          feedback.compliance_check ?? feedback.compliance_with_job_description,
        ),
      },
    },
  }
}
