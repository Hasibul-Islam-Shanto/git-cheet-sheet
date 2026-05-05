'use client'

import { useState } from 'react'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useTranslation } from '@/hooks/useTranslation'
import BookmarksPanel from './BookmarksPanel'

export default function BookmarksTrigger() {
  const [open, setOpen] = useState(false)
  const { bookmarks } = useBookmarkStore()
  const { t } = useTranslation()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open bookmarks"
        className="flex items-center gap-2 bg-[#13161f] border border-[#232840] px-3 py-2 rounded-lg text-xs text-[#7a8099] hover:text-[#f7c948] hover:border-[rgba(247,201,72,0.3)] transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {t.ui.saved}
        {bookmarks.length > 0 && (
          <span className="bg-[#f7c948] text-[#0d0f16] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {bookmarks.length}
          </span>
        )}
      </button>

      {open && <BookmarksPanel onClose={() => setOpen(false)} />}
    </>
  )
}
