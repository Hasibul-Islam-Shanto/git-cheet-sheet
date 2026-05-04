'use client'
import { create } from 'zustand'
import { en } from '@/locales/en'
import { bn } from '@/locales/bn'

type Locale = 'en' | 'bn'

const useLocaleStore = create<{ locale: Locale; setLocale: (l: Locale) => void }>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}))

export function useTranslation() {
  const { locale, setLocale } = useLocaleStore()
  const t = locale === 'bn' ? bn : en
  return { locale, setLocale, t }
}
