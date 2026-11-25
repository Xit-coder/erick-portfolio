import { useEffect, useRef, type ReactNode } from 'react'

export function Dialog({ children, label, className, onClose }: {
  children: ReactNode; label: string; className?: string; onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const previous = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (previous instanceof HTMLElement && previous.isConnected && !document.querySelector('dialog[open]')) {
        previous.focus({ preventScroll: true })
      }
    }
  }, [])
  return <dialog ref={ref} className={className} aria-label={label}
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    {children}
  </dialog>
}
