'use client'

import { useEffect } from 'react'
import { useLocaleStore } from '@/store/useLocaleStore'

export function HtmlLangSync() {
  const { locale } = useLocaleStore()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
