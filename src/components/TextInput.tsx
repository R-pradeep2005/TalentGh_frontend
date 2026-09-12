import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Github, X } from 'lucide-react'

interface TextInputProps {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  accentFrom?: string
  accentTo?: string
  icon?: 'text' | 'github'
}

export default function TextInput({
  label,
  description,
  value,
  onChange,
  placeholder = '',
  accentFrom = 'from-accent-cyan',
  accentTo = 'to-accent-blue',
  icon = 'text',
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = useId()

  const Icon = icon === 'github' ? Github : FileText

  return (
    <div>
      <label htmlFor={inputId} className="mb-3 block text-sm font-semibold text-slate-200">
        {label}
      </label>

      <div
        className={`relative rounded-2xl border-2 transition-all duration-300 ${
          isFocused
            ? 'border-accent-cyan/60 bg-accent-cyan/5 shadow-glow-cyan'
            : 'border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
        }`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accentFrom} ${accentTo} shadow-glow`}
          >
            <Icon className="h-5 w-5 text-white" />
          </span>
        </div>

        {icon === 'github' ? (
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full bg-transparent py-4 pl-16 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        ) : (
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={6}
            className="w-full resize-none bg-transparent py-4 pl-16 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
        )}

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  )
}
