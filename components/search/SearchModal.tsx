'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { useTranslation } from '@/hooks/useTranslation'
import SearchResult from './SearchResult'

interface SearchModalProps {
  onClose: () => void
}

function scrollToCard(cardId: string) {
  const el = document.getElementById(cardId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('search-highlight')
    setTimeout(() => el.classList.remove('search-highlight'), 1500)
  }
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const { query, results, activeIndex, handleQueryChange, setActiveIndex } = useSearch()
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelect = useCallback((cardId: string) => {
    onClose()
    setTimeout(() => scrollToCard(cardId), 100)
  }, [onClose])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex(Math.min(activeIndex + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex(Math.max(activeIndex - 1, 0))
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        handleSelect(results[activeIndex].cardId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, results, handleSelect, setActiveIndex])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[560px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 bg-(--card) border border-(--border) rounded-xl focus-within:border-[rgba(247,201,72,0.5)] transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-(--muted)"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="flex-1 bg-transparent text-(--text) text-[0.9rem] font-mono outline-none placeholder:text-(--muted)"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="text-(--muted) hover:text-(--text) transition-colors text-sm"
            >
              ✕
            </button>
          )}
          <kbd className="hidden sm:inline-flex text-[10px] text-(--muted) font-mono bg-(--bg) border border-(--border) px-1.5 py-0.5 rounded shrink-0">
            Esc
          </kbd>
        </div>

        <div className="mt-2 bg-(--card) border border-(--border) rounded-xl overflow-hidden max-h-[380px] overflow-y-auto">
          {query.length === 0 && (
            <div className="p-6 text-center text-(--muted) text-xs font-mono">
              {t.search.hint}
            </div>
          )}

          {query.length === 1 && (
            <div className="p-6 text-center text-(--muted) text-xs">
              {t.search.keepTyping}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-(--text) font-semibold">{t.search.noResults}</p>
              <p className="text-xs text-(--muted) mt-1">
                {t.search.noResultsHint}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="divide-y divide-(--border)">
              {results.map((item, idx) => (
                <SearchResult
                  key={`${item.cardId}-${item.commandLabel}`}
                  item={item}
                  isActive={idx === activeIndex}
                  query={query}
                  onClick={() => handleSelect(item.cardId)}
                  onMouseEnter={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
