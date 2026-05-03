import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Bookmark } from '@/types'

interface BookmarkStore {
  bookmarks: Bookmark[]
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (cardId: string, commandLabel: string) => void
  isBookmarked: (cardId: string, commandLabel: string) => boolean
  clearAll: () => void
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),

      removeBookmark: (cardId, commandLabel) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !(b.cardId === cardId && b.commandLabel === commandLabel),
          ),
        })),

      isBookmarked: (cardId, commandLabel) =>
        get().bookmarks.some(
          (b) => b.cardId === cardId && b.commandLabel === commandLabel,
        ),

      clearAll: () => set({ bookmarks: [] }),
    }),
    {
      name: 'hi-git:bookmarks',
    },
  ),
)
