export default function InstructionsBar() {
  return (
    <div
      className="w-full rounded-xl px-5 py-4 mb-4"
      style={{
        background: 'rgba(247,201,72,0.04)',
        border: '1px solid rgba(247,201,72,0.12)',
      }}
    >
      <p className="text-[10px] font-mono font-bold text-[#f7c948] tracking-widest uppercase mb-3">
        How to use
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: '👀', text: 'Watch the Git Tree update live' },
          { icon: '⌨️', text: 'Type a git command + press Enter' },
          { icon: '📖', text: 'Read the Before & After below' },
          { icon: '🔄', text: 'Press Reset to start over' },
        ].map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-lg p-2.5"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-base shrink-0">{step.icon}</span>
            <span className="text-[0.72rem] text-[#7a8099] leading-snug">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
