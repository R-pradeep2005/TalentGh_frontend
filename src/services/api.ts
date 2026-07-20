import axios, { AxiosError } from 'axios'
import type { AnalyzeResponse } from '../types'

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
  resume: File
  jobDescription: File
  onUploadProgress?: (percent: number) => void
}

export async function analyzeCandidate({
  resume,
  jobDescription,
  onUploadProgress,
}: AnalyzeParams): Promise<AnalyzeResponse> {
  const formData = new FormData()
  formData.append('resume', resume)
  formData.append('job_description', jobDescription)

  try {
    const { data } = await client.post<AnalyzeResponse>('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (onUploadProgress && event.total) {
          onUploadProgress(Math.round((event.loaded / event.total) * 100))
        }
      },
    })
    return data
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
