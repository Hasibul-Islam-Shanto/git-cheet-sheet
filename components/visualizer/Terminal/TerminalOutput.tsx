'use client'

import type { TerminalLine } from '@/types/visualizer'

interface Props {
  lines: TerminalLine[]
}

const TYPE_CLASS: Record<TerminalLine['type'], string> = {
  input: 'text-(--text)',
  output: 'text-(--text) opacity-80',
  error: 'text-(--accent3)',
  info: 'text-(--muted)',
}

export default function TerminalOutput({ lines }: Props) {
  return (
    <div className="flex flex-col gap-[2px]">
      {lines.map((line, i) => (
        <span key={i} className={`font-mono text-[0.78rem] leading-[1.6] ${TYPE_CLASS[line.type]}`}>
          {line.type === 'input' ? (
            <>
              <span className="text-(--accent2)">user@hi-git</span>
              <span className="text-(--muted)">:~/project$ </span>
              {line.content}
            </>
          ) : line.content === '' ? (
            <span>&nbsp;</span>
          ) : (
            line.content
          )}
        </span>
      ))}
    </div>
  )
}
