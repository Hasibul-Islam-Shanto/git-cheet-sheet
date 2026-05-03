'use client'

import type { SimRepo } from '@/types/visualizer'

interface Props {
  repo: SimRepo
  before: SimRepo | null
}

function isNew(hash: string, before: SimRepo | null): boolean {
  if (!before) return false
  return !before.commits.find((c) => c.hash === hash)
}

export default function RepoStateAfter({ repo, before }: Props) {
  const currentBranch = repo.branches.find((b) => b.name === repo.HEAD)
  const headChanged = before ? before.HEAD !== repo.HEAD : false
  const tipChanged =
    before
      ? before.branches.find((b) => b.name === repo.HEAD)?.tipHash !==
        repo.branches.find((b) => b.name === repo.HEAD)?.tipHash
      : false

  return (
    <div className="bg-(--card) border border-(--border) rounded-xl p-4 flex-1">
      <div className="text-[0.65rem] font-mono text-(--muted) uppercase tracking-widest mb-3">After</div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-(--muted)">HEAD</span>
          <span className="text-(--muted)">→</span>
          <span className={headChanged ? 'text-(--accent)' : 'text-(--accent4)'}>{repo.HEAD}</span>
          {currentBranch && (
            <span className={tipChanged ? 'text-(--accent)' : 'text-(--muted)'}>
              ({currentBranch.tipHash.slice(0, 7)})
            </span>
          )}
        </div>

        <div className="mt-3">
          <div className="text-[0.65rem] text-(--muted) font-mono mb-1">Commits</div>
          <div className="space-y-1 max-h-[120px] overflow-y-auto">
            {[...repo.commits].reverse().map((c) => {
              const newCommit = isNew(c.hash, before)
              return (
                <div key={c.hash} className="flex items-center gap-2 text-[0.72rem] font-mono">
                  <span className={`shrink-0 ${newCommit ? 'text-(--accent)' : 'text-(--muted)'}`}>
                    {c.hash.slice(0, 7)}
                  </span>
                  <span className={`truncate ${newCommit ? 'text-(--accent)' : 'text-(--text)'}`}>
                    {c.message}
                    {newCommit && ' ✨'}
                  </span>
                </div>
              )
            })}
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
