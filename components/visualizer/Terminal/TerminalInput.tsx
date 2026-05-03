'use client'

import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { useVisualizerStore } from '@/store/useVisualizerStore'
import { runCommand } from '@/lib/gitSimulator'
import type { TerminalLine } from '@/types/visualizer'

export default function TerminalInput() {
  const [value, setValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const repo = useVisualizerStore((s) => s.repo)
  const addLine = useVisualizerStore((s) => s.addLine)
  const updateRepo = useVisualizerStore((s) => s.updateRepo)
  const updateExplainer = useVisualizerStore((s) => s.updateExplainer)
  const clearTerminal = useVisualizerStore((s) => s.clearTerminal)
  const resetRepo = useVisualizerStore((s) => s.resetRepo)
  const setAnimating = useVisualizerStore((s) => s.setAnimating)
  const setHighlightCommits = useVisualizerStore((s) => s.setHighlightCommits)
  const commandHistory = useVisualizerStore((s) => s.commandHistory)
  const addToHistory = useVisualizerStore((s) => s.addToHistory)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(nextIdx)
      setValue(commandHistory[commandHistory.length - 1 - nextIdx] ?? '')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIdx)
      setValue(nextIdx === -1 ? '' : (commandHistory[commandHistory.length - 1 - nextIdx] ?? ''))
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (!value.startsWith('git ') && value === 'git') {
        setValue('git ')
      }
      return
    }
    if (e.key !== 'Enter') return

    const cmd = value.trim()
    if (!cmd) return

    setHistoryIndex(-1)
    addToHistory(cmd)
    setValue('')

    const inputLine: TerminalLine = { type: 'input', content: cmd, timestamp: Date.now() }
    addLine(inputLine)

    if (cmd === 'clear') {
      clearTerminal()
      return
    }

    if (cmd === 'reset') {
      resetRepo()
      const infoLine: TerminalLine = {
        type: 'info',
        content: 'Scenario reset to initial state.',
        timestamp: Date.now(),
      }
      addLine(infoLine)
      return
    }

    const prevRepo = repo
    const result = runCommand(cmd, repo)

    setAnimating(true)
    updateRepo(result.newRepo)
    setHighlightCommits(result.highlightCommits ?? [])

    result.outputLines.forEach((line) => {
      addLine({
        type: result.error ? 'error' : 'output',
        content: line,
        timestamp: Date.now(),
      })
    })

    updateExplainer({
      before: prevRepo,
      after: result.newRepo,
      explanation: '',
      command: cmd,
    })

    setTimeout(() => {
      setAnimating(false)
      setHighlightCommits([])
    }, 1500)
  }

  return (
    <div className="flex items-center gap-1 font-mono text-[0.78rem]">
      <span className="text-(--accent2) shrink-0">user@hi-git</span>
      <span className="text-(--muted) shrink-0">:~/project$&nbsp;</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        className="flex-1 bg-transparent outline-none text-(--text) caret-(--accent) min-w-0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="terminal input"
      />
    </div>
  )
}
