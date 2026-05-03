'use client'

import { useEffect, useRef } from 'react'
import { useVisualizerStore } from '@/store/useVisualizerStore'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

export default function SimulatedTerminal() {
  const terminalLines = useVisualizerStore((s) => s.terminalLines)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLines])

  return (
    <div
      className="w-full rounded-xl overflow-hidden flex flex-col"
      style={{
        background: '#0a0c12',
        border: '1px solid #232840',
        height: '380px',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid #1e2233' }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] text-[#7a8099] font-mono">bash — hi-git</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
        <TerminalOutput lines={terminalLines} />
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid #1e2233' }}>
        <TerminalInput />
      </div>
    </div>
  )
}
