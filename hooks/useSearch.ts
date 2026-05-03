'use client'

import { useEffect } from 'react'
import { useSearchStore } from '@/store/useSearchStore'
import { searchIndex } from '@/lib/searchIndex'

export function useSearch() {
  const query = useSearchStore((s) => s.query)
  const isOpen = useSearchStore((s) => s.isOpen)
  const results = useSearchStore((s) => s.results)
  const activeIndex = useSearchStore((s) => s.activeIndex)
  const openSearch = useSearchStore((s) => s.openSearch)
  const closeSearch = useSearchStore((s) => s.closeSearch)
  const setActiveIndex = useSearchStore((s) => s.setActiveIndex)
  const setQuery = useSearchStore((s) => s.setQuery)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isOpen ? closeSearch() : openSearch()
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  const handleQueryChange = (q: string) => {
    setQuery(q, searchIndex)
  }

  return {
    query,
    isOpen,
    results,
    activeIndex,
    openSearch,
    closeSearch,
    setActiveIndex,
    handleQueryChange,
  }
}
