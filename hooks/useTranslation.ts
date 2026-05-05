'use client'

import { useLocaleStore } from '@/store/useLocaleStore'
import { en } from '@/locales/en'
import { bn } from '@/locales/bn'

const translations = { en, bn }

export function useTranslation() {
  const { locale, setLocale } = useLocaleStore()
  const t = translations[locale]
  return { t, locale, setLocale }
}
