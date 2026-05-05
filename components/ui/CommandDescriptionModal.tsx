'use client'

import { useEffect } from 'react'
import type { CommandDescription } from '@/types'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  label: string
  description: CommandDescription
  onClose: () => void
}

export function CommandDescriptionModal({ label, description, onClose }: Props) {
  const { locale, t } = useTranslation()

  const what    = locale === 'bn' ? description.whatBn    : description.what
  const when    = locale === 'bn' ? description.whenBn    : description.when
  const warning = locale === 'bn' ? description.warningBn : description.warning
  const tip     = locale === 'bn' ? description.tipBn     : description.tip

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[480px] rounded-2xl border p-7"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-mono text-(--muted) uppercase tracking-widest mb-1">
              {t.modal.command}
            </p>
            <h2 className="text-[0.95rem] font-bold text-(--text)">{label}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-(--muted) hover:text-(--text) text-lg leading-none transition-colors mt-0.5"
            aria-label="Close"
          >
            {t.ui.close}
          </button>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-mono text-(--accent) uppercase tracking-widest mb-2">
            {t.modal.whatItDoes}
          </p>
          <p className="text-[0.83rem] text-(--text) leading-relaxed">{what}</p>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-mono text-(--accent2) uppercase tracking-widest mb-2">
            {t.modal.whenToUse}
          </p>
          <p className="text-[0.83rem] text-(--muted) leading-relaxed">{when}</p>
        </div>

        {warning && (
          <div
            className="mb-4 p-3 rounded-lg"
            style={{
              background: 'rgba(255,107,107,0.08)',
              border: '1px solid rgba(255,107,107,0.2)',
            }}
          >
            <p className="text-[10px] font-mono text-(--accent3) uppercase tracking-widest mb-1">
              {t.modal.watchOut}
            </p>
            <p className="text-[0.8rem] text-(--accent3) leading-relaxed opacity-90">
              {warning}
            </p>
          </div>
        )}

        {tip && (
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'rgba(79,255,176,0.06)',
              border: '1px solid rgba(79,255,176,0.15)',
            }}
          >
            <p className="text-[10px] font-mono text-(--accent2) uppercase tracking-widest mb-1">
              {t.modal.proTip}
            </p>
            <p className="text-[0.8rem] text-(--muted) leading-relaxed">{tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}
