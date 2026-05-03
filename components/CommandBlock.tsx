import type { CommandExample } from '@/types'

interface Props {
  command: CommandExample
  style?: React.CSSProperties
}

export default function CommandBlock({ command, style }: Props) {
  return (
    <div className="mb-[14px]" style={style}>
      <div className="text-[0.72rem] text-(--muted) mb-[5px]">
        <strong className="text-(--text)">{command.label}</strong>
      </div>
      <pre>
        {command.tokens.map((line, lineIdx) => (
          <span key={lineIdx}>
            {line.map((token, tokenIdx) => (
              <span key={tokenIdx} className={`token-${token.type}`}>
                {token.text}
              </span>
            ))}
            {lineIdx < command.tokens.length - 1 && '\n'}
          </span>
        ))}
      </pre>
    </div>
  )
}
