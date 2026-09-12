import axios, { AxiosError } from 'axios'
import type { AnalyzeResponse } from '../types'
import { normalizeAnalysisResult } from './normalize'

// Base URL for the backend. Override with VITE_API_BASE_URL at build time.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120_000,
})

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface AnalyzeParams {
  jobDescription?: File
  jobDescriptionText?: string
  githubUsername?: string
  onUploadProgress?: (percent: number) => void
}

export async function analyzeCandidate({
  jobDescription,
  jobDescriptionText,
  githubUsername,
  onUploadProgress,
}: AnalyzeParams): Promise<AnalyzeResponse> {
  const formData = new FormData()
  
  if (jobDescription) {
    formData.append('job_description', jobDescription)
  } else if (jobDescriptionText) {
    formData.append('job_description_text', jobDescriptionText)
  }
  
  if (githubUsername) {
    formData.append('github_username', githubUsername)
  }

  try {
    const { data } = await client.post<unknown>('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (onUploadProgress && event.total) {
          onUploadProgress(Math.round((event.loaded / event.total) * 100))
        }
      },
    })
    // The backend's response is LLM-generated and its field names have been
    // observed to drift between calls. Normalize before handing it to the UI.
    return normalizeAnalysisResult(data)
  } catch (err) {
    const axiosErr = err as AxiosError<{ message?: string; detail?: string }>
    if (axiosErr.response) {
      const message =
        axiosErr.response.data?.message ||
        axiosErr.response.data?.detail ||
        'The analyzer could not process this submission.'
      throw new ApiError(message, axiosErr.response.status)
    }
    if (axiosErr.request) {
      throw new ApiError(
        'No response from the analyzer service. Check your connection and try again.',
      )
    }
    throw new ApiError('Something went wrong while preparing the request.')
  }
}
