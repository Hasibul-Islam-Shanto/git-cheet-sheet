export default function BookmarkEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
      <div className="text-3xl">🔖</div>
      <p className="text-sm font-semibold text-(--text)">No bookmarks yet</p>
      <p className="text-xs text-(--muted) leading-relaxed">
        Click the bookmark icon next to any command to save it here for quick access.
      </p>
    </div>
  )
}
