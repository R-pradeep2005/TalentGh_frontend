import type { AnalysisResult, EvidenceItem } from '../types'

// The backend's /analyze response is LLM-generated and its field names have been
// observed to drift between calls (e.g. `matching_skills` vs `skills_matched`,
// `evidence` items using `file`/`path` or `reason`/`explanation`).
// This normalizer maps any known variant onto the canonical shape the UI relies on,
// so a naming drift degrades gracefully instead of crashing the render tree.
// The real fix is constraining the backend's LLM call to a strict output schema —
// this is a safety net, not a substitute for that.

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function asStringArray(value: unknown): string[] {
  return asArray<unknown>(value).map((v) => String(v))
}

function normalizeScore(value: unknown): number {
  const n = Number(value)
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(100, n))
}

function normalizeEvidence(raw: unknown): EvidenceItem[] {
  return asArray<Record<string, unknown>>(raw).map((item) => ({
    file: String(item.file ?? item.path ?? item.filename ?? 'Unknown file'),
    reason: String(item.reason ?? item.explanation ?? item.description ?? ''),
  }))
}

export function normalizeAnalysisResult(data: any): AnalysisResult {
  const analysis = data?.analysis ?? {}

  return {
    repository: String(data?.repository ?? 'Unknown repository'),
    analysis: {
      score: normalizeScore(analysis.score ?? analysis.match_score),
      matching_skills: asStringArray(analysis.matching_skills ?? analysis.skills_matched),
      missing_skills: asStringArray(analysis.missing_skills ?? analysis.skills_missing),
      strengths: asStringArray(analysis.strengths),
      weaknesses: asStringArray(analysis.weaknesses),
      evidence: normalizeEvidence(analysis.evidence),
      summary: String(analysis.summary ?? analysis.repository_overview ?? ''),
    },
  }
}