'use client'

import { useVisualizerStore } from '@/store/useVisualizerStore'
import RepoStateBefore from './RepoStateBefore'
import RepoStateAfter from './RepoStateAfter'
import ExplainerText from './ExplainerText'

export default function ExplainerPanel() {
  const explainer = useVisualizerStore((s) => s.explainer)

  if (!explainer.before || !explainer.after) {
    return (
      <div className="bg-(--card) border border-(--border) rounded-xl p-6 text-center">
        <p className="text-(--muted) text-sm font-mono">
          Run a command in the terminal to see the before &amp; after comparison.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-(--card) border border-(--border) rounded-xl p-4">
      <div className="text-[0.65rem] font-mono text-(--muted) uppercase tracking-widest mb-3">
        Before &amp; After
      </div>
      <div className="flex gap-3">
        <RepoStateBefore repo={explainer.before} />
        <RepoStateAfter repo={explainer.after} before={explainer.before} />
      </div>
      <ExplainerText command={explainer.command} explanation={explainer.explanation} />
    </div>
  )
}
