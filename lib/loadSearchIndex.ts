import type { SearchItem } from '@/lib/searchIndex'

let cache: Promise<SearchItem[]> | null = null

export function loadSearchIndex(): Promise<SearchItem[]> {
  if (!cache) {
    cache = import('./searchIndex').then((m) => m.searchIndex)
  }
  return cache
}
