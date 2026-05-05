'use client'
import { motion } from 'framer-motion'
import type { ScenarioStep } from '@/types/visualizer'
import { useTranslation } from '@/hooks/useTranslation'
import { useVisualizerNavigation } from '@/hooks/useVisualizerNavigation'
import { ProgressDots } from './ProgressDots'
import { WhatChangedBadges } from './WhatChangedBadges'
import { MistakeWarning } from './MistakeWarning'
import { CommandDisplay } from './CommandDisplay'

interface Props {
  step: ScenarioStep
  stepIndex: number
  totalSteps: number
  completedSteps: number[]
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export function StepCard({ step, stepIndex, totalSteps, completedSteps, onNext, onPrev, isFirst, isLast }: Props) {
  const { locale, t } = useTranslation()
  const { onTouchStart, onTouchEnd } = useVisualizerNavigation()

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full rounded-2xl p-7 flex flex-col gap-6"
      style={{ background: '#13161f', border: '1px solid #232840' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ProgressDots total={totalSteps} current={stepIndex} completed={completedSteps} />

      <h2 className="text-xl font-bold text-[#e8eaf0] leading-snug -mt-1">
        {locale === 'bn' ? (step.titleBn ?? step.title) : step.title}
      </h2>

      <div style={{ borderTop: '1px solid #1e2233' }} />

      <div>
        <p className="text-xs font-mono font-semibold text-[#f7c948] tracking-widest uppercase mb-2.5">
          {t.visualizer.whatsHappening}
        </p>
        <p className="text-[0.92rem] text-[#c8cad4] leading-relaxed">
          {locale === 'bn' ? (step.explanationBn ?? step.explanation) : step.explanation}
        </p>
      </div>

      <div>
        <p className="text-xs font-mono font-semibold text-[#4fffb0] tracking-widest uppercase mb-2.5">
          {t.visualizer.whyItMatters}
        </p>
        <p className="text-[0.92rem] text-[#9ba3bd] leading-relaxed">
          {locale === 'bn' ? (step.whyItMattersBn ?? step.whyItMatters) : step.whyItMatters}
        </p>
      </div>

      <WhatChangedBadges items={step.whatChanged} />

      {(step.commonMistake || step.commonMistakeBn) && (
        <MistakeWarning
          text={locale === 'bn' ? (step.commonMistakeBn ?? step.commonMistake) : step.commonMistake}
        />
      )}

      {step.command && (
        <CommandDisplay
          command={step.command}
          description={locale === 'bn' ? (step.commandDescriptionBn ?? step.commandDescription) : step.commandDescription}
        />
      )}

      <div style={{ borderTop: '1px solid #1e2233' }} className="pt-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.9rem] font-semibold transition-all duration-200 ${
              isFirst
                ? 'opacity-25 cursor-not-allowed text-[#7a8099]'
                : 'text-[#e8eaf0] hover:bg-[#1e2233]'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.visualizer.previous}
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl text-[0.9rem] font-bold text-[#0d0f16] bg-[#f7c948] hover:bg-[#e6b93d] active:scale-95 transition-all duration-150"
          >
            {isLast ? (
              <>{t.visualizer.complete} <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5L5.5 10.5L11.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></>
            ) : (
              <>{t.visualizer.nextStep} <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
            )}
          </button>
        </div>
        <p className="text-center text-xs text-[#2d3150] mt-3 font-mono">
          {t.visualizer.keyboardHint}
        </p>
      </div>
    </motion.div>
  )
}
