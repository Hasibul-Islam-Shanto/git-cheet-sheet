export interface CodeToken {
  text: string
  type: 'kw' | 'flag' | 'str' | 'cmt' | 'branch' | 'remote' | 'tag' | 'plain'
}

export interface CommandExample {
  label: string
  tokens: CodeToken[][]
}

export interface CommandCardDef {
  id: string
  icon: string
  iconVariant: 'init' | 'stage' | 'branch' | 'merge' | 'remote' | 'undo' | 'stash' | 'log' | 'tag' | 'config' | 'gh'
  title: string
  subtitle: string
  commands: CommandExample[]
}

export interface Section {
  id: string
  label: string
  cards: CommandCardDef[]
}

export interface QuickRefRow {
  command: string
  description: string
}

export interface WorkflowStep extends CommandExample {
  step: number
}

export interface WhatIsGitItem {
  icon: string
  title: string
  description: string
}

export interface Bookmark {
  cardId: string
  cardTitle: string
  section: string
  commandLabel: string
  rawText: string
  savedAt: number
}
