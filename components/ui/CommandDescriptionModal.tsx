'use client'

import { useEffect } from 'react'
import type { CommandDescription } from '@/types'

interface Props {
  label: string
  description: CommandDescription
  onClose: () => void
}

export function CommandDescriptionModal({ label, description, onClose }: Props) {
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
        style={{ background: '#13161f', borderColor: '#232840' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-mono text-[#7a8099] uppercase tracking-widest mb-1">
              Command
            </p>
            <h2 className="text-[0.95rem] font-bold text-[#e8eaf0]">{label}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-(--muted) hover:text-(--text) text-lg leading-none transition-colors mt-0.5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-mono text-[#f7c948] uppercase tracking-widest mb-2">
            What it does
          </p>
          <p className="text-[0.83rem] text-[#e8eaf0] leading-relaxed">{description.what}</p>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-mono text-[#4fffb0] uppercase tracking-widest mb-2">
            When to use
          </p>
          <p className="text-[0.83rem] text-[#7a8099] leading-relaxed">{description.when}</p>
        </div>

        {description.warning && (
          <div
            className="mb-4 p-3 rounded-lg"
            style={{
              background: 'rgba(255,107,107,0.08)',
              border: '1px solid rgba(255,107,107,0.2)',
            }}
          >
            <p className="text-[10px] font-mono text-[#ff6b6b] uppercase tracking-widest mb-1">
              ⚠️ Watch out
            </p>
            <p className="text-[0.8rem] text-[#ff6b6b] leading-relaxed opacity-90">
              {description.warning}
            </p>
          </div>
        )}

        {description.tip && (
          <div
            className="p-3 rounded-lg"
            style={{
              background: 'rgba(79,255,176,0.06)',
              border: '1px solid rgba(79,255,176,0.15)',
            }}
          >
            <p className="text-[10px] font-mono text-[#4fffb0] uppercase tracking-widest mb-1">
              💡 Pro tip
            </p>
            <p className="text-[0.8rem] text-[#7a8099] leading-relaxed">{description.tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}
