'use client'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useTranslation } from '@/hooks/useTranslation'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const { copy, copied } = useCopyToClipboard()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={copied ? t.ui.copied : t.ui.copy}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 p-1.5 rounded-md bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(255,255,255,0.08)]"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--accent)"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--muted)"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}
