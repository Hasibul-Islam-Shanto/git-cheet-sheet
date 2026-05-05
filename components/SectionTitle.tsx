'use client'

import { useTranslation } from '@/hooks/useTranslation'

const labelToKey: Record<string, 's01' | 's02' | 's03' | 's04' | 's05' | 's06' | 's07' | 's08'> = {
  '01': 's01',
  '02': 's02',
  '03': 's03',
  '04': 's04',
  '05': 's05',
  '06': 's06',
  '07': 's07',
  '08': 's08',
}

interface Props {
  label: string
}

export default function SectionTitle({ label }: Props) {
  const { t } = useTranslation()
  const num = label.match(/^(\d+)/)?.[1]
  const translatedLabel = num && labelToKey[num] ? t.sections[labelToKey[num]] : label

  return (
    <div className="section-title text-[0.7rem] font-mono tracking-[0.2em] uppercase text-(--accent) mt-12 mb-5 flex items-center gap-3">
      {translatedLabel}
    </div>
  )
}
