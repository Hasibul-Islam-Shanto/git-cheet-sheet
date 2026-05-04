interface Props {
  icon: string
  analogy: string
  label: string
}

export function AnalogyCard({ icon, analogy, label }: Props) {
  return (
    <div
      className="w-full rounded-xl px-5 py-5 flex items-start gap-4"
      style={{
        background: 'rgba(247,201,72,0.04)',
        border: '1px solid rgba(247,201,72,0.15)',
      }}
    >
      <span className="text-3xl shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-mono font-bold text-[#f7c948] tracking-widest uppercase mb-1.5">
          {label}
        </p>
        <p className="text-[0.9rem] text-[#9ba3bd] leading-relaxed">{analogy}</p>
      </div>
    </div>
  )
}
