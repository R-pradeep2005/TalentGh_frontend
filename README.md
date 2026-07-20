# Talent Acquisition GitHub Analyzer

A dark, glassmorphism-themed React + TypeScript frontend for AI-powered candidate
evaluation using GitHub repositories and resumes.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Axios

## Getting started

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your backend
npm run dev
```

## Backend contract

The app POSTs `multipart/form-data` to `${VITE_API_BASE_URL}/analyze` with fields:

- `resume` — PDF/DOCX/TXT file
- `job_description` — PDF/DOCX/TXT file

Expected JSON response shape:

```json
{
  "candidate": {
    "resumeFilename": "string",
    "githubUsername": "string",
    "repositoryCount": 0
  },
  "repositories": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "primaryLanguage": "string",
      "stars": 0,
      "topics": ["string"],
      "overallScore": 0,
      "scores": {
        "codeQuality": 0,
        "readmeQuality": 0,
        "errorHandling": 0,
        "technicalWriting": 0,
        "jobRelevance": 0
      }
    }
  ],
  "overallScore": 0,
  "recommendation": "Strong Hire | Hire | Consider | Needs Improvement"
}
```

## Project structure

```
src/
  components/   Reusable UI building blocks
  pages/        Top-level page composition (HomePage)
  services/     API client (axios)
  hooks/        useAnalysis, useToast
  types/        Shared TypeScript interfaces
```

## Build

```bash
npm run build
npm run preview
```
