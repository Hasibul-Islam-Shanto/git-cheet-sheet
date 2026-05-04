'use client'
import type { ChangeType, WhatChanged } from '@/types/visualizer'
import { useTranslation } from '@/hooks/useTranslation'

const BADGE_STYLES: Record<ChangeType, { bg: string; color: string; icon: string }> = {
  'branch-created':  { bg: 'rgba(79,255,176,0.1)',  color: '#4fffb0', icon: '🌿' },
  'branch-deleted':  { bg: 'rgba(255,107,107,0.1)', color: '#ff6b6b', icon: '🗑️' },
  'branch-switched': { bg: 'rgba(126,179,255,0.1)', color: '#7eb3ff', icon: '↔️' },
  'commit-added':    { bg: 'rgba(247,201,72,0.1)',  color: '#f7c948', icon: '✅' },
  'commit-removed':  { bg: 'rgba(255,107,107,0.1)', color: '#ff6b6b', icon: '❌' },
  'head-moved':      { bg: 'rgba(192,132,252,0.1)', color: '#c084fc', icon: '👆' },
  'files-changed':   { bg: 'rgba(247,201,72,0.1)',  color: '#f7c948', icon: '📝' },
  'files-unchanged': { bg: 'rgba(35,40,64,0.5)',    color: '#7a8099', icon: '⚪' },
  'stash-saved':     { bg: 'rgba(192,132,252,0.1)', color: '#c084fc', icon: '🗄️' },
  'stash-applied':   { bg: 'rgba(79,255,176,0.1)',  color: '#4fffb0', icon: '📤' },
  'merge-happened':  { bg: 'rgba(126,179,255,0.1)', color: '#7eb3ff', icon: '🔀' },
  'rebase-happened': { bg: 'rgba(247,201,72,0.1)',  color: '#f7c948', icon: '🔧' },
}

export function WhatChangedBadges({ items }: { items: WhatChanged[] }) {
  const { locale } = useTranslation()
  return (
    <div>
      <p className="text-xs font-mono font-semibold text-[#7a8099] tracking-widest uppercase mb-2.5">
        🔄 What changed?
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => {
          const style = BADGE_STYLES[item.type]
          return (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
              style={{ background: style.bg, color: style.color }}
            >
              {style.icon} {locale === 'bn' ? (item.labelBn ?? item.label) : item.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
