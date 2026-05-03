import type { SearchItem } from '@/lib/searchIndex'

interface SearchResultProps {
  item: SearchItem
  isActive: boolean
  query: string
  onClick: () => void
  onMouseEnter: () => void
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent text-[#f7c948] font-bold">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchResult({
  item,
  isActive,
  query,
  onClick,
  onMouseEnter,
}: SearchResultProps) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`px-4 py-3 cursor-pointer border-l-2 transition-colors duration-100 ${
        isActive
          ? 'bg-[rgba(247,201,72,0.08)] border-l-[#f7c948]'
          : 'border-l-transparent hover:bg-[rgba(247,201,72,0.05)]'
      }`}
    >
      <div className="text-[0.62rem] text-[#7a8099] font-mono tracking-[0.12em] uppercase mb-0.5">
        {item.cardIcon} {item.section} · {item.cardTitle}
      </div>
      <div className="text-[0.88rem] font-semibold text-[#e8eaf0]">
        {highlightMatch(item.commandLabel, query)}
      </div>
      <div className="text-[0.75rem] text-[#7a8099] font-mono mt-0.5 truncate">
        {highlightMatch(item.rawText.split('\n')[0], query)}
      </div>
    </div>
  )
}
