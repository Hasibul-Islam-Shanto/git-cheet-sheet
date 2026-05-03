export interface SimCommit {
  hash: string
  message: string
  parentHash: string | null
  branch: string
  x?: number
  y?: number
}

export interface SimBranch {
  name: string
  tipHash: string
  color: string
}

export interface SimRepo {
  commits: SimCommit[]
  branches: SimBranch[]
  HEAD: string
  stash: SimCommit[]
  stage: string[]
  workingDir: string[]
}

export interface VisualizerScenario {
  id: string
  command: string
  title: string
  description: string
  initialRepo: SimRepo
  steps: ScenarioStep[]
}

export interface ScenarioStep {
  command: string
  outputLines: string[]
  repoAfter: SimRepo
  explanation: string
  highlightCommits: string[]
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'info'
  content: string
  timestamp: number
}

export interface ExplainerState {
  before: SimRepo | null
  after: SimRepo | null
  explanation: string
  command: string
}

export interface LayoutCommit extends SimCommit {
  x: number
  y: number
}
