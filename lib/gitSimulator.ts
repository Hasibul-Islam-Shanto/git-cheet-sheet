import type { SimRepo, SimCommit, SimBranch } from '@/types/visualizer'
import { HELP_LINES } from '@/data/visualizer/terminalResponses'

const BRANCH_COLORS: Record<string, string> = {
  main: '#f7c948',
  master: '#f7c948',
  feature: '#4fffb0',
  hotfix: '#ff6b6b',
  develop: '#7eb3ff',
  stash: '#c084fc',
}

const COMMAND_ALIASES: Record<string, string> = {
  checkout: 'switch',
  co: 'switch',
  br: 'branch',
  cm: 'commit',
}

function branchColor(name: string): string {
  return BRANCH_COLORS[name] ?? '#c084fc'
}

function shortHash(): string {
  return Math.random().toString(36).slice(2, 9)
}

function getTip(repo: SimRepo, branchName: string): SimCommit | undefined {
  const branch = repo.branches.find((b) => b.name === branchName)
  if (!branch) return undefined
  return repo.commits.find((c) => c.hash === branch.tipHash)
}

function getCurrentBranch(repo: SimRepo): string {
  return repo.HEAD
}

interface SimResult {
  newRepo: SimRepo
  outputLines: string[]
  error: boolean
  highlightCommits?: string[]
}

type ParsedCommand = { verb: string; args: string[] }

function parse(input: string): ParsedCommand {
  const parts = input.trim().split(/\s+/)
  if (parts[0] === 'git') parts.shift()
  const verb = COMMAND_ALIASES[parts[0]] ?? parts[0]
  return { verb, args: parts.slice(1) }
}

function cloneRepo(repo: SimRepo): SimRepo {
  return JSON.parse(JSON.stringify(repo)) as SimRepo
}

function cmdBranch(args: string[], repo: SimRepo): SimResult {
  if (args.length === 0) {
    const lines = repo.branches.map((b) => {
      const marker = b.name === repo.HEAD ? '* ' : '  '
      return `${marker}${b.name}`
    })
    return { newRepo: repo, outputLines: lines, error: false }
  }
  const name = args[0]
  if (repo.branches.find((b) => b.name === name)) {
    return {
      newRepo: repo,
      outputLines: [`fatal: A branch named '${name}' already exists.`],
      error: true,
    }
  }
  const currentBranch = getCurrentBranch(repo)
  const currentTip = repo.branches.find((b) => b.name === currentBranch)
  if (!currentTip) {
    return { newRepo: repo, outputLines: ['fatal: Not on any branch.'], error: true }
  }
  const newRepo = cloneRepo(repo)
  const newBranch: SimBranch = { name, tipHash: currentTip.tipHash, color: branchColor(name) }
  newRepo.branches.push(newBranch)
  return { newRepo, outputLines: [], error: false, highlightCommits: [currentTip.tipHash] }
}

function cmdSwitch(args: string[], repo: SimRepo): SimResult {
  const createFlag = args.includes('-c') || args.includes('-b')
  const name = args.find((a) => !a.startsWith('-'))
  if (!name) {
    return { newRepo: repo, outputLines: ['fatal: missing branch name'], error: true }
  }

  if (createFlag) {
    const created = cmdBranch([name], repo)
    if (created.error) return created
    const switched = cmdSwitch([name], created.newRepo)
    return { ...switched, outputLines: [`Switched to a new branch '${name}'`] }
  }

  if (!repo.branches.find((b) => b.name === name)) {
    return {
      newRepo: repo,
      outputLines: [`error: pathspec '${name}' did not match any file(s) known to git`],
      error: true,
    }
  }
  const newRepo = cloneRepo(repo)
  newRepo.HEAD = name
  return { newRepo, outputLines: [`Switched to branch '${name}'`], error: false }
}

function cmdCommit(args: string[], repo: SimRepo): SimResult {
  const mIdx = args.indexOf('-m')
  let message = 'Update'
  if (mIdx !== -1 && args[mIdx + 1]) {
    message = args.slice(mIdx + 1).join(' ').replace(/^["']|["']$/g, '')
  }

  const currentBranch = getCurrentBranch(repo)
  const branchObj = repo.branches.find((b) => b.name === currentBranch)
  if (!branchObj) {
    return { newRepo: repo, outputLines: ['fatal: not on a branch'], error: true }
  }

  const hash = shortHash()
  const newCommit: SimCommit = {
    hash,
    message,
    parentHash: branchObj.tipHash,
    branch: currentBranch,
  }

  const newRepo = cloneRepo(repo)
  newRepo.commits.push(newCommit)
  const branch = newRepo.branches.find((b) => b.name === currentBranch)!
  branch.tipHash = hash
  newRepo.workingDir = []
  newRepo.stage = []
  return {
    newRepo,
    outputLines: [`[${currentBranch} ${hash}] ${message}`, ` 1 file changed`],
    error: false,
    highlightCommits: [hash],
  }
}

function cmdMerge(args: string[], repo: SimRepo): SimResult {
  const targetName = args[0]
  if (!targetName) {
    return { newRepo: repo, outputLines: ['fatal: no branch specified'], error: true }
  }
  const targetBranch = repo.branches.find((b) => b.name === targetName)
  if (!targetBranch) {
    return {
      newRepo: repo,
      outputLines: [`merge: ${targetName} - not something we can merge`],
      error: true,
    }
  }

  const currentBranch = getCurrentBranch(repo)
  if (currentBranch === targetName) {
    return {
      newRepo: repo,
      outputLines: ['Already up to date.'],
      error: false,
    }
  }

  const currentBranchObj = repo.branches.find((b) => b.name === currentBranch)!
  const hash = shortHash()
  const mergeCommit: SimCommit = {
    hash,
    message: `Merge branch '${targetName}'`,
    parentHash: currentBranchObj.tipHash,
    branch: currentBranch,
  }

  const newRepo = cloneRepo(repo)
  newRepo.commits.push(mergeCommit)
  const branch = newRepo.branches.find((b) => b.name === currentBranch)!
  branch.tipHash = hash
  return {
    newRepo,
    outputLines: [
      `Merge made by the "ort" strategy.`,
      ` 1 file changed`,
    ],
    error: false,
    highlightCommits: [hash],
  }
}

function cmdReset(args: string[], repo: SimRepo): SimResult {
  const soft = args.includes('--soft')
  const hard = args.includes('--hard') || (!soft && args.includes('HEAD~1'))
  const steps = args.find((a) => a.startsWith('HEAD~'))
  const count = steps ? parseInt(steps.split('~')[1] ?? '1') : 1

  const currentBranch = getCurrentBranch(repo)
  const branchObj = repo.branches.find((b) => b.name === currentBranch)!

  const commits = repo.commits.filter((c) => {
    let cur: SimCommit | undefined = repo.commits.find((x) => x.hash === branchObj.tipHash)
    for (let i = 0; i < count; i++) {
      if (!cur) break
      if (cur.hash === c.hash) return false
      cur = repo.commits.find((x) => x.hash === cur!.parentHash)
    }
    return true
  })

  let targetHash = branchObj.tipHash
  let cur = repo.commits.find((x) => x.hash === branchObj.tipHash)
  for (let i = 0; i < count; i++) {
    if (!cur?.parentHash) break
    const parent = repo.commits.find((x) => x.hash === cur!.parentHash)
    if (parent) {
      targetHash = parent.hash
      cur = parent
    }
  }

  const newRepo = cloneRepo(repo)
  newRepo.commits = commits
  const branch = newRepo.branches.find((b) => b.name === currentBranch)!
  branch.tipHash = targetHash

  if (soft) {
    newRepo.stage = ['staged-changes.js']
    newRepo.workingDir = []
    return {
      newRepo,
      outputLines: [],
      error: false,
      highlightCommits: [targetHash],
    }
  }

  newRepo.stage = []
  newRepo.workingDir = []
  const target = newRepo.commits.find((c) => c.hash === targetHash)
  return {
    newRepo,
    outputLines: [`HEAD is now at ${targetHash} ${target?.message ?? ''}`],
    error: false,
    highlightCommits: [targetHash],
  }
}

function cmdRebase(args: string[], repo: SimRepo): SimResult {
  const targetBranchName = args[0]
  if (!targetBranchName) {
    return { newRepo: repo, outputLines: ['fatal: no branch specified'], error: true }
  }
  const targetBranch = repo.branches.find((b) => b.name === targetBranchName)
  if (!targetBranch) {
    return {
      newRepo: repo,
      outputLines: [`fatal: invalid upstream '${targetBranchName}'`],
      error: true,
    }
  }

  const currentBranch = getCurrentBranch(repo)
  const currentBranchObj = repo.branches.find((b) => b.name === currentBranch)!

  const commitsOnCurrent = repo.commits.filter((c) => c.branch === currentBranch)
  if (commitsOnCurrent.length === 0) {
    return { newRepo: repo, outputLines: ['Current branch has nothing to rebase.'], error: false }
  }

  const newRepo = cloneRepo(repo)
  let parentHash = targetBranch.tipHash

  const rebased: string[] = []
  for (const commit of commitsOnCurrent) {
    const newHash = shortHash()
    const newCommit: SimCommit = {
      hash: newHash,
      message: commit.message,
      parentHash,
      branch: currentBranch,
    }
    newRepo.commits = newRepo.commits.filter((c) => c.hash !== commit.hash)
    newRepo.commits.push(newCommit)
    parentHash = newHash
    rebased.push(newHash)
  }

  const branch = newRepo.branches.find((b) => b.name === currentBranch)!
  branch.tipHash = parentHash

  return {
    newRepo,
    outputLines: ['Successfully rebased and updated refs/heads/' + currentBranch + '.'],
    error: false,
    highlightCommits: rebased,
  }
}

function cmdStash(args: string[], repo: SimRepo): SimResult {
  const subCmd = args[0]

  if (subCmd === 'pop') {
    if (repo.stash.length === 0) {
      return {
        newRepo: repo,
        outputLines: ['No stash entries found.'],
        error: true,
      }
    }
    const newRepo = cloneRepo(repo)
    const top = newRepo.stash.pop()!
    newRepo.workingDir = top.message
      .replace('WIP on ' + repo.HEAD + ': ', '')
      .split(', ')
      .filter(Boolean)
    return {
      newRepo,
      outputLines: [
        `On branch ${repo.HEAD}`,
        `Changes not staged for commit:`,
        ...newRepo.workingDir.map((f) => `  modified: ${f}`),
        `Dropped stash@{0}`,
      ],
      error: false,
    }
  }

  if (repo.workingDir.length === 0 && repo.stage.length === 0) {
    return {
      newRepo: repo,
      outputLines: ['No local changes to save'],
      error: false,
    }
  }

  const currentBranch = getCurrentBranch(repo)
  const branchObj = repo.branches.find((b) => b.name === currentBranch)!
  const files = [...repo.workingDir, ...repo.stage].join(', ')

  const newRepo = cloneRepo(repo)
  newRepo.stash.push({
    hash: `stash@{${repo.stash.length}}`,
    message: `WIP on ${currentBranch}: ${files}`,
    parentHash: branchObj.tipHash,
    branch: 'stash',
  })
  newRepo.workingDir = []
  newRepo.stage = []
  return {
    newRepo,
    outputLines: [`Saved working directory and index state WIP on ${currentBranch}: ${branchObj.tipHash} ${getTip(repo, currentBranch)?.message ?? ''}`],
    error: false,
  }
}

function cmdCherryPick(args: string[], repo: SimRepo): SimResult {
  const targetHash = args[0]
  if (!targetHash) {
    return { newRepo: repo, outputLines: ['fatal: no commit specified'], error: true }
  }

  const sourceCommit = repo.commits.find((c) => c.hash.startsWith(targetHash))
  if (!sourceCommit) {
    return {
      newRepo: repo,
      outputLines: [`error: could not apply ${targetHash}...`, `hint: commit not found`],
      error: true,
    }
  }

  const currentBranch = getCurrentBranch(repo)
  const branchObj = repo.branches.find((b) => b.name === currentBranch)!
  const newHash = shortHash()
  const newCommit: SimCommit = {
    hash: newHash,
    message: sourceCommit.message,
    parentHash: branchObj.tipHash,
    branch: currentBranch,
  }

  const newRepo = cloneRepo(repo)
  newRepo.commits.push(newCommit)
  const branch = newRepo.branches.find((b) => b.name === currentBranch)!
  branch.tipHash = newHash

  return {
    newRepo,
    outputLines: [`[${currentBranch} ${newHash}] ${sourceCommit.message}`, ` 1 file changed`],
    error: false,
    highlightCommits: [newHash, sourceCommit.hash],
  }
}

function cmdLog(repo: SimRepo): SimResult {
  const currentBranch = getCurrentBranch(repo)
  const branchObj = repo.branches.find((b) => b.name === currentBranch)
  if (!branchObj) return { newRepo: repo, outputLines: [], error: false }

  const lines: string[] = []
  let cur: SimCommit | undefined = repo.commits.find((c) => c.hash === branchObj.tipHash)
  while (cur) {
    const isTip = cur.hash === branchObj.tipHash
    const label = isTip ? ` (HEAD -> ${currentBranch})` : ''
    lines.push(`${cur.hash}${label} ${cur.message}`)
    cur = repo.commits.find((c) => c.hash === cur!.parentHash)
  }
  return { newRepo: repo, outputLines: lines, error: false }
}

function cmdStatus(repo: SimRepo): SimResult {
  const branch = getCurrentBranch(repo)
  const lines: string[] = [`On branch ${branch}`]
  if (repo.stage.length > 0) {
    lines.push('Changes to be committed:')
    repo.stage.forEach((f) => lines.push(`  new file: ${f}`))
  }
  if (repo.workingDir.length > 0) {
    lines.push('Changes not staged for commit:')
    repo.workingDir.forEach((f) => lines.push(`  modified: ${f}`))
  }
  if (repo.stage.length === 0 && repo.workingDir.length === 0) {
    lines.push('nothing to commit, working tree clean')
  }
  return { newRepo: repo, outputLines: lines, error: false }
}

export function runCommand(input: string, repo: SimRepo): SimResult {
  const trimmed = input.trim()
  if (!trimmed) return { newRepo: repo, outputLines: [], error: false }

  if (trimmed === 'clear' || trimmed === 'reset') {
    return { newRepo: repo, outputLines: [], error: false }
  }

  const { verb, args } = parse(trimmed)

  switch (verb) {
    case 'branch':
      return cmdBranch(args, repo)
    case 'switch':
      return cmdSwitch(args, repo)
    case 'commit':
      return cmdCommit(args, repo)
    case 'merge':
      return cmdMerge(args, repo)
    case 'reset':
      return cmdReset(args, repo)
    case 'rebase':
      return cmdRebase(args, repo)
    case 'stash':
      return cmdStash(args, repo)
    case 'cherry-pick':
      return cmdCherryPick(args, repo)
    case 'log':
      return cmdLog(repo)
    case 'status':
      return cmdStatus(repo)
    case 'help':
      return { newRepo: repo, outputLines: HELP_LINES, error: false }
    default:
      return {
        newRepo: repo,
        outputLines: [
          `hint: This command isn't simulated yet.`,
          `hint: Try: branch, merge, reset, rebase, stash, cherry-pick`,
        ],
        error: false,
      }
  }
}
