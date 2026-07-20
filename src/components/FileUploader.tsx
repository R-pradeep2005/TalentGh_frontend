import { useCallback, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, UploadCloud, X } from 'lucide-react'

const ACCEPTED_TYPES = ['.pdf', '.docx', '.txt']
const ACCEPTED_MIME =
  '.pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain'

interface FileUploaderProps {
  label: string
  description: string
  file: File | null
  onFileSelect: (file: File | null) => void
  accentFrom?: string
  accentTo?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isAccepted(file: File): boolean {
  const name = file.name.toLowerCase()
  return ACCEPTED_TYPES.some((ext) => name.endsWith(ext))
}

export default function FileUploader({
  label,
  description,
  file,
  onFileSelect,
  accentFrom = 'from-accent-cyan',
  accentTo = 'to-accent-blue',
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const candidate = fileList[0]
      if (!isAccepted(candidate)) {
        setDragError('Unsupported format. Use PDF, DOCX, or TXT.')
        window.setTimeout(() => setDragError(null), 3000)
        return
      }
      setDragError(null)
      onFileSelect(candidate)
    },
    [onFileSelect],
  )

  return (
    <div>
      <label htmlFor={inputId} className="mb-3 block text-sm font-semibold text-slate-200">
        {label}
      </label>

      <div
        role="button"
        tabIndex={0}
        aria-label={`${label} drop zone`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
          isDragging
            ? 'border-accent-cyan/60 bg-accent-cyan/5 shadow-glow-cyan'
            : 'border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPTED_MIME}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {!file ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} shadow-glow`}
            >
              <UploadCloud className="h-6 w-6 text-white" />
            </span>
            <p className="text-sm text-slate-300">
              <span className="font-medium text-white">Click to upload</span> or drag &amp; drop
            </p>
            <p className="text-xs text-slate-500">{description}</p>
            <div className="flex gap-1.5">
              {ACCEPTED_TYPES.map((ext) => (
                <span
                  key={ext}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400"
                >
                  {ext.replace('.', '')}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between gap-3 rounded-xl bg-white/5 p-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
                <FileText className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium text-white">{file.name}</p>
                <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onFileSelect(null)
                  if (inputRef.current) inputRef.current.value = ''
                }}
                className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {dragError && (
        <p className="mt-2 text-xs font-medium text-rose-400" role="alert">
          {dragError}
        </p>
      )}
    </div>
  )
}
