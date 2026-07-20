import { useCallback, useState } from 'react'
import type { ToastMessage } from '../types'

let idCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (message: string, type: ToastMessage['type'] = 'info') => {
      const id = `toast-${idCounter++}`
      setToasts((prev) => [...prev, { id, message, type }])
      window.setTimeout(() => dismiss(id), 5000)
    },
    [dismiss],
  )

  return { toasts, push, dismiss }
}
