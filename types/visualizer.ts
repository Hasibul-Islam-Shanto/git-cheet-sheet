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

export type ChangeType =
  | 'branch-created'
  | 'branch-deleted'
  | 'branch-switched'
  | 'commit-added'
  | 'commit-removed'
  | 'head-moved'
  | 'files-changed'
  | 'files-unchanged'
  | 'stash-saved'
  | 'stash-applied'
  | 'merge-happened'
  | 'rebase-happened'

export interface WhatChanged {
  type: ChangeType
  label: string
  labelBn?: string
}

export interface ScenarioStep {
  id: number
  title: string
  titleBn?: string
  explanation: string
  explanationBn?: string
  whyItMatters: string
  whyItMattersBn?: string
  command: string
  commandDescription: string
  commandDescriptionBn?: string
  whatChanged: WhatChanged[]
  commonMistake?: string
  commonMistakeBn?: string
  repoState?: SimRepo
  highlightedCommits?: string[]
  highlightedBranches?: string[]
  isNewCommit?: string
  isNewBranch?: string
}

export interface VisualizerScenario {
  id: string
  command: string
  title: string
  titleBn?: string
  description: string
  descriptionBn?: string
  analogy: string
  analogyBn?: string
  analogyIcon: string
  initialRepo?: SimRepo
  steps: ScenarioStep[]
  nextScenario?: string
}

export interface CompletionSummary {
  commands: string[]
  conceptLearned: string
  conceptLearnedBn?: string
  tryItYourself: string
  tryItYourselfBn?: string
}
