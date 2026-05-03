'use client'

import type { SimRepo } from '@/types/visualizer'

interface Props {
  repo: SimRepo
}

export default function RepoStateBefore({ repo }: Props) {
  const currentBranch = repo.branches.find((b) => b.name === repo.HEAD)

  return (
    <div className="bg-(--card) border border-(--border) rounded-xl p-4 flex-1">
      <div className="text-[0.65rem] font-mono text-(--muted) uppercase tracking-widest mb-3">Before</div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-(--muted)">HEAD</span>
          <span className="text-(--muted)">→</span>
          <span className="text-(--accent4)">{repo.HEAD}</span>
          {currentBranch && (
            <span className="text-(--muted)">({currentBranch.tipHash.slice(0, 7)})</span>
          )}
        </div>

        <div className="mt-3">
          <div className="text-[0.65rem] text-(--muted) font-mono mb-1">Commits</div>
          <div className="space-y-1 max-h-[120px] overflow-y-auto">
            {[...repo.commits].reverse().map((c) => (
              <div key={c.hash} className="flex items-center gap-2 text-[0.72rem] font-mono">
                <span className="text-(--muted) shrink-0">{c.hash.slice(0, 7)}</span>
                <span className="text-(--text) truncate">{c.message}</span>
              </div>
            ))}
            {repo.commits.length === 0 && (
              <div className="text-[0.72rem] text-(--muted) font-mono">(none)</div>
            )}
          </div>
        </div>

        {repo.stash.length > 0 && (
          <div className="mt-2">
            <div className="text-[0.65rem] text-(--muted) font-mono mb-1">Stash</div>
            {repo.stash.map((s, i) => (
              <div key={i} className="text-[0.72rem] font-mono text-[#c084fc]">
                stash@{'{'}
                {i}
                {'}'}: {s.message}
              </div>
            ))}
          </div>
        )}

        {repo.workingDir.length > 0 && (
          <div className="mt-2">
            <div className="text-[0.65rem] text-(--muted) font-mono mb-1">Modified</div>
            {repo.workingDir.map((f) => (
              <div key={f} className="text-[0.72rem] font-mono text-(--accent3)">{f}</div>
            ))}
          </div>
        )}

        {repo.stage.length > 0 && (
          <div className="mt-2">
            <div className="text-[0.65rem] text-(--muted) font-mono mb-1">Staged</div>
            {repo.stage.map((f) => (
              <div key={f} className="text-[0.72rem] font-mono text-(--accent2)">{f}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
