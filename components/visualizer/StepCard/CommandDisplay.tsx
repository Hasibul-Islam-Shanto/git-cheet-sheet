'use client'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  command: string
  description?: string
}

export function CommandDisplay({ command, description }: Props) {
  const { copy, copied } = useCopyToClipboard()
  const { t } = useTranslation()

  return (
    <div>
      <p className="text-xs font-mono font-semibold text-(--accent2) tracking-widest uppercase mb-2.5">
        {t.visualizer.theCommand}
      </p>
      <div
        className="relative group rounded-xl overflow-hidden"
        style={{ background: 'var(--code-bg)', border: '1px solid var(--border)' }}
      >
        <pre className="px-5 py-4 font-mono text-[0.95rem] text-(--accent) leading-relaxed overflow-x-auto whitespace-pre-wrap break-all pr-16">
          {command}
        </pre>
        <button
          onClick={() => copy(command)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-150"
          style={{
            background: copied ? 'rgba(79,255,176,0.15)' : 'rgba(255,255,255,0.05)',
            color: copied ? 'var(--accent2)' : 'var(--muted)',
            border: `1px solid ${copied ? 'rgba(79,255,176,0.3)' : 'var(--border)'}`,
          }}
        >
          {copied ? t.ui.copied : t.ui.copy}
        </button>
      </div>
      {description && (
        <p className="text-[0.8rem] text-(--muted) mt-2.5 font-mono leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
