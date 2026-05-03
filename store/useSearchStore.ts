import { create } from 'zustand'
import type { SearchItem } from '@/lib/searchIndex'

interface SearchStore {
  query: string
  isOpen: boolean
  results: SearchItem[]
  activeIndex: number
  setQuery: (query: string, allItems: SearchItem[]) => void
  openSearch: () => void
  closeSearch: () => void
  setActiveIndex: (index: number) => void
  reset: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  isOpen: false,
  results: [],
  activeIndex: 0,

  setQuery: (query, allItems) => {
    const q = query.toLowerCase().trim()
    const results =
      q.length < 2
        ? []
        : allItems
            .filter(
              (item) =>
                item.commandLabel.toLowerCase().includes(q) ||
                item.rawText.toLowerCase().includes(q) ||
                item.cardTitle.toLowerCase().includes(q) ||
                item.section.toLowerCase().includes(q),
            )
            .slice(0, 10)

    set({ query, results, activeIndex: 0 })
  },

  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: [], activeIndex: 0 }),
  setActiveIndex: (index) => set({ activeIndex: index }),
  reset: () => set({ query: '', results: [], activeIndex: 0 }),
}))
