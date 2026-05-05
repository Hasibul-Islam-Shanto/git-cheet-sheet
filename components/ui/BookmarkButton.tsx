'use client'

import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useTranslation } from '@/hooks/useTranslation'

interface BookmarkButtonProps {
  cardId: string
  cardTitle: string
  section: string
  commandLabel: string
  rawText: string
}

export default function BookmarkButton({
  cardId,
  cardTitle,
  section,
  commandLabel,
  rawText,
}: BookmarkButtonProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()
  const { t } = useTranslation()
  const bookmarked = isBookmarked(cardId, commandLabel)

  const toggle = () => {
    if (bookmarked) {
      removeBookmark(cardId, commandLabel)
    } else {
      addBookmark({ cardId, cardTitle, section, commandLabel, rawText, savedAt: Date.now() })
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? t.ui.bookmarkRemove : t.ui.bookmarkAdd}
      title={bookmarked ? t.ui.bookmarkRemove : t.ui.bookmarkAdd}
      className={`p-1 rounded transition-all duration-200 ${
        bookmarked
          ? 'text-(--accent)'
          : 'text-(--muted) hover:text-(--accent) hover:bg-[rgba(247,201,72,0.1)]'
      }`}
    >
      {bookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ) : (
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
      )}
    </button>
  )
}
