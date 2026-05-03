'use client'

import { useEffect } from 'react'
import { useSearchStore } from '@/store/useSearchStore'
import { searchIndex } from '@/lib/searchIndex'

export function useSearch() {
  const store = useSearchStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        store.isOpen ? store.closeSearch() : store.openSearch()
      }
      if (e.key === 'Escape' && store.isOpen) {
        store.closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [store.isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleQueryChange = (q: string) => {
    store.setQuery(q, searchIndex)
  }

  return {
    query: store.query,
    isOpen: store.isOpen,
    results: store.results,
    activeIndex: store.activeIndex,
    openSearch: store.openSearch,
    closeSearch: store.closeSearch,
    setActiveIndex: store.setActiveIndex,
    handleQueryChange,
  }
}
