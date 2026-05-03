'use client'

import { create } from 'zustand'
import type { SimRepo, TerminalLine, ExplainerState, VisualizerScenario } from '@/types/visualizer'
import { scenarios } from '@/data/visualizer/scenarios'

const EMPTY_REPO: SimRepo = {
  commits: [],
  branches: [],
  HEAD: 'main',
  stash: [],
  stage: [],
  workingDir: [],
}

const EMPTY_EXPLAINER: ExplainerState = {
  before: null,
  after: null,
  explanation: '',
  command: '',
}

function makeWelcomeLines(): TerminalLine[] {
  const lines: Array<{ type: TerminalLine['type']; content: string }> = [
    { type: 'info', content: 'Welcome to the hi-git interactive simulator.' },
    { type: 'info', content: '─'.repeat(48) },
    { type: 'info', content: 'Available commands for this scenario:' },
    { type: 'output', content: '  git branch <name>     — create a new branch' },
    { type: 'output', content: '  git switch <name>     — switch to a branch' },
    { type: 'output', content: '  git commit -m "msg"   — create a new commit' },
    { type: 'output', content: '  git merge <name>      — merge a branch' },
    { type: 'output', content: '  git reset --hard      — undo last commit' },
    { type: 'output', content: '  git stash             — save changes temporarily' },
    { type: 'info', content: '─'.repeat(48) },
    { type: 'info', content: 'Type "git help" to see this list anytime.' },
  ]
  const now = Date.now()
  return lines.map(({ type, content }) => ({ type, content, timestamp: now }))
}

interface VisualizerStore {
  scenarioId: string
  scenario: VisualizerScenario | null
  loadScenario: (id: string) => void

  repo: SimRepo
  updateRepo: (repo: SimRepo) => void
  resetRepo: () => void

  terminalLines: TerminalLine[]
  addLine: (line: TerminalLine) => void
  clearTerminal: () => void

  explainer: ExplainerState
  updateExplainer: (state: ExplainerState) => void

  isAnimating: boolean
  setAnimating: (val: boolean) => void

  highlightCommits: string[]
  setHighlightCommits: (hashes: string[]) => void

  commandHistory: string[]
  addToHistory: (cmd: string) => void
}

export const useVisualizerStore = create<VisualizerStore>((set, get) => ({
  scenarioId: '',
  scenario: null,
  loadScenario: (id: string) => {
    const found = scenarios.find((s) => s.id === id) ?? null
    set({
      scenarioId: id,
      scenario: found,
      repo: found ? JSON.parse(JSON.stringify(found.initialRepo)) as SimRepo : EMPTY_REPO,
      terminalLines: makeWelcomeLines(),
      explainer: EMPTY_EXPLAINER,
      highlightCommits: [],
    })
  },

  repo: EMPTY_REPO,
  updateRepo: (repo) => set({ repo }),
  resetRepo: () => {
    const { scenario } = get()
    if (scenario) {
      set({
        repo: JSON.parse(JSON.stringify(scenario.initialRepo)) as SimRepo,
        terminalLines: makeWelcomeLines(),
        explainer: EMPTY_EXPLAINER,
        highlightCommits: [],
      })
    }
  },

  terminalLines: makeWelcomeLines(),
  addLine: (line) => set((s) => ({ terminalLines: [...s.terminalLines, line] })),
  clearTerminal: () => set({ terminalLines: [] }),

  explainer: EMPTY_EXPLAINER,
  updateExplainer: (state) => set({ explainer: state }),

  isAnimating: false,
  setAnimating: (val) => set({ isAnimating: val }),

  highlightCommits: [],
  setHighlightCommits: (hashes) => set({ highlightCommits: hashes }),

  commandHistory: [],
  addToHistory: (cmd) =>
    set((s) => ({ commandHistory: [...s.commandHistory.slice(-49), cmd] })),
}))
