export function MistakeWarning({ text }: { text?: string }) {
  if (!text) return null
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(255,107,107,0.07)',
        border: '1px solid rgba(255,107,107,0.18)',
      }}
    >
      <p className="text-xs font-mono font-semibold text-(--accent3) tracking-widest uppercase mb-2">
        ⚠️ Common mistake
      </p>
      <p className="text-[0.88rem] leading-relaxed text-(--accent3)">
        {text}
      </p>
    </div>
  )
}
