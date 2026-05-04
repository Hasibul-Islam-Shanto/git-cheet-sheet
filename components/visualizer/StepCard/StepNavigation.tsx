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
        style={{ borderTop: '1px solid #232840' }}
      >
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            isFirst
              ? 'opacity-30 cursor-not-allowed text-[#7a8099]'
              : 'text-[#e8eaf0] hover:bg-[#232840]'
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-[#0d0f16] bg-[#f7c948] hover:bg-[#e6b93d] transition-all duration-200"
        >
          {isLast ? 'Complete ✓' : 'Next Step →'}
        </button>
      </div>
      <p className="text-center text-[10px] text-[#3d4460] mt-2 font-mono">
        {t.visualizer.keyboardHint}
      </p>
    </div>
  )
}
