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
      <p className="text-xs font-mono font-semibold text-[#ff6b6b] tracking-widest uppercase mb-2">
        ⚠️ Common mistake
      </p>
      <p className="text-[0.88rem] leading-relaxed" style={{ color: '#ff8585' }}>
        {text}
      </p>
    </div>
  )
}
