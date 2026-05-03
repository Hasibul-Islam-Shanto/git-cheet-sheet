'use client'

import { useMemo } from 'react'
import { useVisualizerStore } from '@/store/useVisualizerStore'
import { calculateLayout, calculateSVGDimensions } from '@/lib/treeLayout'
import CommitNode from './CommitNode'
import BranchLine from './BranchLine'
import BranchLabel from './BranchLabel'

export default function GitTree() {
  const repo = useVisualizerStore((s) => s.repo)
  const highlightCommits = useVisualizerStore((s) => s.highlightCommits)

  const layout = useMemo(() => calculateLayout(repo), [repo])
  const { width: svgWidth, height: svgHeight } = useMemo(() => calculateSVGDimensions(repo), [repo])

  const commitMap = useMemo(
    () => new Map(layout.commits.map((c) => [c.hash, c])),
    [layout.commits]
  )

  const currentBranch = repo.HEAD
  const currentBranchObj = repo.branches.find((b) => b.name === currentBranch)

  const edges = layout.commits
    .filter((c) => c.parentHash)
    .map((c) => {
      const parent = commitMap.get(c.parentHash!)
      if (!parent) return null
      const branchColor =
        repo.branches.find((b) => b.tipHash === c.hash)?.color ??
        repo.branches.find((b) => b.name === c.branch)?.color ??
        '#7a8099'
      return { from: parent, to: c, color: branchColor }
    })
    .filter(Boolean) as { from: (typeof layout.commits)[0]; to: (typeof layout.commits)[0]; color: string }[]

  return (
    <div
      className="w-full rounded-xl p-4"
      style={{
        background: '#0d0f16',
        border: '1px solid #232840',
        minHeight: '280px',
        maxHeight: '380px',
        overflow: 'hidden',
      }}
    >
      <p className="text-[10px] font-mono text-[#7a8099] tracking-widest uppercase mb-3">
        Git Tree
      </p>
      <svg
        width="100%"
        height="240"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        {edges.map((edge, i) => (
          <BranchLine
            key={`edge-${i}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            color={edge.color}
          />
        ))}

        {layout.commits.map((commit) => {
          const branchForCommit =
            repo.branches.find((b) => b.tipHash === commit.hash) ??
            repo.branches.find((b) => b.name === commit.branch)
          const color = branchForCommit?.color ?? '#7a8099'
          const isHead =
            branchForCommit?.name === currentBranch &&
            currentBranchObj?.tipHash === commit.hash

          return (
            <CommitNode
              key={commit.hash}
              x={commit.x}
              y={commit.y}
              hash={commit.hash}
              message={commit.message}
              color={color}
              isHead={isHead}
              isHighlighted={highlightCommits.includes(commit.hash)}
            />
          )
        })}

        {repo.branches.map((branch) => {
          const tip = commitMap.get(branch.tipHash)
          if (!tip) return null
          const isHead = branch.name === currentBranch
          return (
            <BranchLabel
              key={branch.name}
              x={tip.x}
              y={tip.y}
              name={branch.name}
              color={branch.color}
              isHead={isHead}
            />
          )
        })}
      </svg>
    </div>
  )
}
