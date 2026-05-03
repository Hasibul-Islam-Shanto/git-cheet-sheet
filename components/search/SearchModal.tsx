'use client'

import { useEffect, useRef } from 'react'
import { useSearch } from '@/hooks/useSearch'
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
  const inputRef = useRef<HTMLInputElement>(null)

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
  }, [activeIndex, results]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (cardId: string) => {
    onClose()
    setTimeout(() => scrollToCard(cardId), 100)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[560px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#13161f] border border-[#232840] rounded-xl focus-within:border-[rgba(247,201,72,0.5)] transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7a8099"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-[#e8eaf0] text-[0.9rem] font-mono outline-none placeholder:text-[#7a8099]"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="text-[#7a8099] hover:text-[#e8eaf0] transition-colors text-sm"
            >
              ✕
            </button>
          )}
          <kbd className="hidden sm:inline-flex text-[10px] text-[#7a8099] font-mono bg-[#0d0f16] border border-[#232840] px-1.5 py-0.5 rounded shrink-0">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="mt-2 bg-[#13161f] border border-[#232840] rounded-xl overflow-hidden max-h-[380px] overflow-y-auto">
          {query.length === 0 && (
            <div className="p-6 text-center text-[#7a8099] text-xs font-mono">
              Type a command name, flag, or keyword...
            </div>
          )}

          {query.length === 1 && (
            <div className="p-6 text-center text-[#7a8099] text-xs">
              Keep typing...
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-[#e8eaf0] font-semibold">No commands found</p>
              <p className="text-xs text-[#7a8099] mt-1">
                Try searching for &quot;reset&quot;, &quot;branch&quot;, &quot;stash&quot;...
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="divide-y divide-[#1e2233]">
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
