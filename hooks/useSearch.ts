'use client'

import { useEffect } from 'react'
import { useSearchStore } from '@/store/useSearchStore'
import { loadSearchIndex } from '@/lib/loadSearchIndex'

let querySeq = 0

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
    if (isOpen) void loadSearchIndex()
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          closeSearch()
        } else {
          openSearch()
        }
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  const handleQueryChange = (q: string) => {
    const id = ++querySeq
    void loadSearchIndex().then((index) => {
      if (id !== querySeq) return
      setQuery(q, index)
    })
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
