interface Props {
  onClick: () => void
}

export function InfoButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="View command description"
      title="What does this do?"
      className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold font-mono text-[#7a8099] border border-[#3d4460] hover:text-[#f7c948] hover:border-[#f7c948] transition-all duration-150 shrink-0"
    >
      ?
    </button>
  )
}
