'use client'
import { useEffect, useRef } from 'react'
import { useVisualizerStore } from '@/store/useVisualizerStore'

export function useVisualizerNavigation() {
  const nextStep = useVisualizerStore((s) => s.nextStep)
  const prevStep = useVisualizerStore((s) => s.prevStep)
  const touchStartX = useRef<number | null>(null)
  const SWIPE_THRESHOLD = 60

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextStep()
      if (e.key === 'ArrowLeft') prevStep()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [nextStep, prevStep])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > SWIPE_THRESHOLD) nextStep()
    if (delta < -SWIPE_THRESHOLD) prevStep()
    touchStartX.current = null
  }

  return { onTouchStart, onTouchEnd }
}
