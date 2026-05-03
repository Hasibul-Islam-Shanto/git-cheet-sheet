'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useVisualizerStore } from '@/store/useVisualizerStore'
import GitTree from './GitTree/GitTree'
import SimulatedTerminal from './Terminal/SimulatedTerminal'
import ExplainerPanel from './Explainer/ExplainerPanel'
import InstructionsBar from './InstructionsBar'

interface Props {
  cmdId: string
}

export default function VisualizerLayout({ cmdId }: Props) {
  const loadScenario = useVisualizerStore((s) => s.loadScenario)
  const scenario = useVisualizerStore((s) => s.scenario)
  const resetRepo = useVisualizerStore((s) => s.resetRepo)

  useEffect(() => {
    loadScenario(cmdId)
  }, [cmdId, loadScenario])

  if (!scenario) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-(--muted) font-mono">
          Unknown command &quot;{cmdId}&quot;. Try branch, merge, reset, rebase, stash, or cherry-pick.
        </p>
        <Link href="/" className="mt-4 inline-block text-(--accent) text-sm hover:underline">
          ← Back to cheat sheet
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-(--muted) text-sm font-mono hover:text-(--text) transition-colors flex items-center gap-1"
        >
          ← Back to cheat sheet
        </Link>
        <button
          onClick={resetRepo}
          className="text-xs font-mono text-(--muted) hover:text-(--accent3) transition-colors border border-(--border) rounded-lg px-3 py-1.5"
        >
          ↺ Reset
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <code className="text-(--accent) bg-(--code-bg) border border-(--border) rounded-lg px-3 py-1.5 font-mono text-sm">
            {scenario.command}
          </code>
          <h1 className="text-xl font-bold">{scenario.title}</h1>
        </div>
        <p className="text-(--muted) text-sm mt-2">{scenario.description}</p>
      </div>

      <InstructionsBar />

      <div className="flex flex-col gap-4">
        <GitTree />
        <SimulatedTerminal />
        <ExplainerPanel />
      </div>
    </div>
  )
}
