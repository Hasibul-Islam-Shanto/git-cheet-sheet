'use client'
import { create } from 'zustand'
import type { VisualizerScenario, ScenarioStep } from '@/types/visualizer'

interface VisualizerStore {
  scenario: VisualizerScenario | null
  currentStepIndex: number
  completedSteps: number[]
  isComplete: boolean
  currentStep: ScenarioStep | null
  totalSteps: number
  isFirstStep: boolean
  isLastStep: boolean

  loadScenario: (scenario: VisualizerScenario) => void
  clearScenario: () => void
  goToStep: (index: number) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useVisualizerStore = create<VisualizerStore>((set, get) => ({
  scenario: null,
  currentStepIndex: 0,
  completedSteps: [],
  isComplete: false,
  currentStep: null,
  totalSteps: 0,
  isFirstStep: true,
  isLastStep: false,

  loadScenario: (scenario) => set({
    scenario,
    currentStepIndex: 0,
    completedSteps: [],
    isComplete: false,
    currentStep: scenario.steps[0] ?? null,
    totalSteps: scenario.steps.length,
    isFirstStep: true,
    isLastStep: scenario.steps.length === 1,
  }),

  clearScenario: () => set({
    scenario: null,
    currentStepIndex: 0,
    completedSteps: [],
    isComplete: false,
    currentStep: null,
    totalSteps: 0,
    isFirstStep: true,
    isLastStep: false,
  }),

  goToStep: (index) => {
    const { scenario } = get()
    if (!scenario) return
    set({
      currentStepIndex: index,
      currentStep: scenario.steps[index],
      isFirstStep: index === 0,
      isLastStep: index === scenario.steps.length - 1,
    })
  },

  nextStep: () => {
    const { currentStepIndex, scenario, completedSteps } = get()
    if (!scenario) return
    const newCompleted = completedSteps.includes(currentStepIndex)
      ? completedSteps
      : [...completedSteps, currentStepIndex]
    if (currentStepIndex >= scenario.steps.length - 1) {
      set({ completedSteps: newCompleted, isComplete: true })
      return
    }
    const next = currentStepIndex + 1
    set({
      currentStepIndex: next,
      currentStep: scenario.steps[next],
      completedSteps: newCompleted,
      isFirstStep: false,
      isLastStep: next === scenario.steps.length - 1,
    })
  },

  prevStep: () => {
    const { currentStepIndex, scenario } = get()
    if (!scenario || currentStepIndex === 0) return
    const prev = currentStepIndex - 1
    set({
      currentStepIndex: prev,
      currentStep: scenario.steps[prev],
      isFirstStep: prev === 0,
      isLastStep: false,
      isComplete: false,
    })
  },

  reset: () => {
    const { scenario } = get()
    if (!scenario) return
    set({
      currentStepIndex: 0,
      completedSteps: [],
      isComplete: false,
      currentStep: scenario.steps[0],
      isFirstStep: true,
      isLastStep: scenario.steps.length === 1,
    })
  },
}))
