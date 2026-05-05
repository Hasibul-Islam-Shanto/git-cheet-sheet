'use client'

import { useSearch } from '@/hooks/useSearch'
import { useTranslation } from '@/hooks/useTranslation'
import SearchModal from './SearchModal'

export default function SearchBar() {
  const { isOpen, openSearch, closeSearch } = useSearch()
  const { t } = useTranslation()

  return (
    <>
      <button
        onClick={openSearch}
        aria-label="Search commands"
        className="flex items-center gap-3 w-full max-w-[420px] mx-auto px-4 py-2.5 rounded-xl text-left bg-[rgba(19,22,31,0.8)] border border-[#232840] hover:border-[rgba(247,201,72,0.3)] transition-colors duration-200 group"
      >
        <svg
          className="text-[#7a8099] group-hover:text-[#f7c948] transition-colors shrink-0"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="flex-1 text-[#7a8099] text-sm font-mono">{t.ui.search}</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#7a8099] font-mono bg-[#0d0f16] border border-[#232840] px-1.5 py-0.5 rounded">
          {t.ui.searchShortcut}
        </kbd>
      </button>

      {isOpen && <SearchModal onClose={closeSearch} />}
    </>
  )
}
