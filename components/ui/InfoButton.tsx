'use client'

import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  onClick: () => void
}

export function InfoButton({ onClick }: Props) {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      aria-label={t.ui.viewDesc}
      title={t.ui.viewDesc}
      className="min-h-11 min-w-11 rounded-full inline-flex items-center justify-center text-[10px] font-bold font-mono text-[#7a8099] border border-[#3d4460] hover:text-[#f7c948] hover:border-[#f7c948] transition-all duration-150 shrink-0"
    >
      ?
    </button>
  )
}
