'use client'

import { LOCALES } from '@/types/i18n'
import { useLocaleStore } from '@/store/useLocaleStore'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore()

  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1"
      style={{ background: '#13161f', border: '1px solid #232840' }}
    >
      {LOCALES.map((option) => (
        <button
          key={option.code}
          onClick={() => setLocale(option.code)}
          aria-label={`Switch to ${option.label}`}
          title={option.label}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md
                     text-xs font-mono font-semibold transition-all duration-200"
          style={{
            background: locale === option.code
              ? 'rgba(247,201,72,0.15)'
              : 'transparent',
            color: locale === option.code ? '#f7c948' : '#7a8099',
            border: locale === option.code
              ? '1px solid rgba(247,201,72,0.3)'
              : '1px solid transparent',
          }}
        >
          <span className="text-sm">{option.flag}</span>
          <span>{option.shortLabel}</span>
        </button>
      ))}
    </div>
  )
}
