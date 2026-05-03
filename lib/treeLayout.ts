import type { SimRepo, LayoutCommit } from '@/types/visualizer'

export const NODE_RADIUS = 20
export const HORIZONTAL_SPACING = 100
export const VERTICAL_SPACING = 80
export const SVG_PADDING = 50
const LABEL_SPACE_ABOVE = 45
const LABEL_SPACE_BELOW = 35

export interface TreeLayout {
  commits: LayoutCommit[]
  width: number
  height: number
}

export function calculateLayout(repo: SimRepo): TreeLayout {
  if (repo.commits.length === 0) {
    return { commits: [], width: 300, height: 160 }
  }

  const branchOrder = repo.branches.map((b) => b.name)
  const laneMap = new Map<string, number>()
  branchOrder.forEach((name, i) => laneMap.set(name, i))

  const sorted = topologicalSort(repo.commits)

  const columnMap = new Map<string, number>()
  for (const commit of sorted) {
    if (commit.parentHash === null) {
      columnMap.set(commit.hash, 0)
    } else {
      const parentCol = columnMap.get(commit.parentHash) ?? 0
      columnMap.set(commit.hash, parentCol + 1)
    }
  }

  const positioned: LayoutCommit[] = sorted.map((commit) => {
    const col = columnMap.get(commit.hash) ?? 0
    const lane = laneMap.get(commit.branch) ?? 0
    return {
      ...commit,
      x: SVG_PADDING + col * HORIZONTAL_SPACING,
      y: SVG_PADDING + LABEL_SPACE_ABOVE + lane * VERTICAL_SPACING,
    }
  })

  const { width, height } = calculateSVGDimensions(repo)
  return { commits: positioned, width, height }
}

export function calculateSVGDimensions(repo: SimRepo): { width: number; height: number } {
  const maxCommitsInRow =
    repo.branches.length > 0
      ? Math.max(...repo.branches.map((b) => repo.commits.filter((c) => c.branch === b.name).length), 1)
      : Math.max(1, repo.commits.length)
  const branchCount = Math.max(1, repo.branches.length)

  const width = Math.max(300, maxCommitsInRow * HORIZONTAL_SPACING + SVG_PADDING * 2)
  const height = Math.max(160, branchCount * VERTICAL_SPACING + SVG_PADDING * 2 + LABEL_SPACE_ABOVE + LABEL_SPACE_BELOW)

  return { width, height }
}

function topologicalSort(commits: SimRepo['commits']): SimRepo['commits'] {
  const hashMap = new Map(commits.map((c) => [c.hash, c]))
  const visited = new Set<string>()
  const result: SimRepo['commits'] = []

  function visit(hash: string) {
    if (visited.has(hash)) return
    visited.add(hash)
    const commit = hashMap.get(hash)
    if (!commit) return
    if (commit.parentHash) visit(commit.parentHash)
    result.push(commit)
  }

  for (const commit of commits) {
    visit(commit.hash)
  }

  return result
}
