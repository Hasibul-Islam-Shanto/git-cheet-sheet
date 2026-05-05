'use client'

import type { Bookmark } from '@/types'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useTranslation } from '@/hooks/useTranslation'
import BookmarkEmpty from './BookmarkEmpty'

interface BookmarksPanelProps {
  onClose: () => void
}

export default function BookmarksPanel({ onClose }: BookmarksPanelProps) {
  const { bookmarks, removeBookmark, clearAll } = useBookmarkStore()
  const { t } = useTranslation()

  const grouped = bookmarks.reduce<Record<string, Bookmark[]>>((acc, b) => {
    if (!acc[b.section]) acc[b.section] = []
    acc[b.section].push(b)
    return acc
  }, {})

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[380px] max-w-full bg-[#13161f] border-l border-[#232840] z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-[#232840]">
          <div>
            <h2 className="font-bold text-sm text-[#e8eaf0]">{t.bookmarks.header}</h2>
            <p className="text-xs text-[#7a8099] mt-0.5">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bookmarks"
            className="text-[#7a8099] hover:text-[#e8eaf0] transition-colors text-lg leading-none p-1"
          >
            {t.ui.close}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {bookmarks.length === 0 ? (
            <BookmarkEmpty />
          ) : (
            Object.entries(grouped).map(([sectionName, items]) => (
              <div key={sectionName} className="mb-5">
                <div className="text-[0.62rem] text-[#f7c948] font-mono tracking-[0.15em] uppercase mb-2">
                  {sectionName}
                </div>
                <div className="flex flex-col gap-1">
                  {items.map((bookmark) => (
                    <div
                      key={`${bookmark.cardId}-${bookmark.commandLabel}`}
                      className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-[#0d0f16] border border-[#232840] group/item"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.75rem] font-semibold text-[#e8eaf0] truncate">
                          {bookmark.commandLabel}
                        </p>
                        <p className="text-[0.68rem] text-[#7a8099] font-mono mt-0.5 truncate">
                          {bookmark.rawText.split('\n')[0]}
                        </p>
                      </div>
                      <button
                        onClick={() => removeBookmark(bookmark.cardId, bookmark.commandLabel)}
                        aria-label="Remove bookmark"
                        className="shrink-0 text-[#3d4460] hover:text-[#ff6b6b] transition-colors opacity-0 group-hover/item:opacity-100 text-sm leading-none p-0.5"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-[#232840]">
            <button
              onClick={clearAll}
              className="text-xs text-[#7a8099] hover:text-[#ff6b6b] transition-colors"
            >
              {t.bookmarks.clearAll}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
