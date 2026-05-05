'use client'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  total: number
  current: number
  completed: number[]
}

export function ProgressDots({ total, current, completed }: Props) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isDone = completed.includes(i)
        const isCurrent = i === current
        return (
          <motion.div
            key={i}
            layout
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: isCurrent ? 32 : 10,
              height: 10,
              background: isDone ? '#4fffb0' : isCurrent ? '#f7c948' : '#232840',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          >
            {isDone && (
              <span className="absolute text-[7px] font-bold text-[#0d0f16]">✓</span>
            )}
          </motion.div>
        )
      })}
      <span className="text-xs text-[#7a8099] font-mono ml-1">
        {t.visualizer.stepOf(current + 1, total)}
      </span>
    </div>
  )
}
