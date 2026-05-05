'use client'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  onPrev: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
}

export function StepNavigation({ onPrev, onNext, isFirst, isLast }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      <div
        className="flex items-center justify-between mt-6 pt-4"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            isFirst
              ? 'opacity-30 cursor-not-allowed text-(--muted)'
              : 'text-(--text) hover:bg-(--card2)'
          }`}
        >
          {t.visualizer.previous}
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-[#0d0f16] bg-(--accent) hover:opacity-90 transition-all duration-200"
        >
          {isLast ? t.visualizer.complete : t.visualizer.nextStep}
        </button>
      </div>
      <p className="text-center text-[10px] text-(--muted) opacity-50 mt-2 font-mono">
        {t.visualizer.keyboardHint}
      </p>
    </div>
  )
}
