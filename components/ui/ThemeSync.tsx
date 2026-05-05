'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export function ThemeSync() {
  const { theme, setResolvedTheme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (resolved: 'dark' | 'light') => {
      root.setAttribute('data-theme', resolved)
      setResolvedTheme(resolved)
    }

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      applyTheme(mq.matches ? 'dark' : 'light')

      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light')
      }
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      applyTheme(theme)
    }
  }, [theme, setResolvedTheme])

  return null
}
