'use client'

import { useRef } from 'react'
import type { Bookmark } from '@/types'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useTranslation } from '@/hooks/useTranslation'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import BookmarkEmpty from './BookmarkEmpty'

interface BookmarksPanelProps {
  onClose: () => void
}

export default function BookmarksPanel({ onClose }: BookmarksPanelProps) {
  const { bookmarks, removeBookmark, clearAll } = useBookmarkStore()
  const { t } = useTranslation()
  const trapRef = useRef<HTMLDivElement>(null)
  useFocusTrap(trapRef, true)

  const grouped = bookmarks.reduce<Record<string, Bookmark[]>>((acc, b) => {
    if (!acc[b.section]) acc[b.section] = []
    acc[b.section].push(b)
    return acc
  }, {})

  return (
    <div ref={trapRef} className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="absolute top-0 right-0 h-full w-[380px] max-w-full bg-(--card) border-l border-(--border) z-50 flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-drawer-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-(--border)">
          <div>
            <h2
              id="bookmarks-drawer-title"
              tabIndex={0}
              data-autofocus
              className="font-bold text-sm text-(--text) outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/40 rounded-sm"
            >
              {t.bookmarks.header}
            </h2>
            <p className="text-xs text-(--muted) mt-0.5">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.bookmarks.closePanel}
            className="text-(--muted) hover:text-(--text) transition-colors text-lg leading-none min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded-lg"
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
                <div className="text-[0.62rem] text-(--accent) font-mono tracking-[0.15em] uppercase mb-2">
                  {sectionName}
                </div>
                <div className="flex flex-col gap-1">
                  {items.map((bookmark) => (
                    <div
                      key={`${bookmark.cardId}-${bookmark.commandLabel}`}
                      className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-(--bg) border border-(--border) group/item"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.75rem] font-semibold text-(--text) truncate">
                          {bookmark.commandLabel}
                        </p>
                        <p className="text-[0.68rem] text-(--muted) font-mono mt-0.5 truncate">
                          {bookmark.rawText.split('\n')[0]}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBookmark(bookmark.cardId, bookmark.commandLabel)}
                        aria-label={t.bookmarks.removeItem}
                        className="shrink-0 text-(--border) hover:text-(--accent3) transition-colors opacity-0 group-hover/item:opacity-100 group-focus-within/item:opacity-100 focus-visible:opacity-100 text-sm leading-none min-h-11 min-w-11 inline-flex items-center justify-center rounded-md"
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
          <div className="p-4 border-t border-(--border)">
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-(--muted) hover:text-(--accent3) transition-colors min-h-11 px-2 inline-flex items-center rounded-md"
            >
              {t.bookmarks.clearAll}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
