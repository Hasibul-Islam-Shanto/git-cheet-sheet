import type { WorkflowStep } from '@/types'
import CommandBlock from './CommandBlock'

interface Props {
  steps: WorkflowStep[]
}

export default function GitHubWorkflow({ steps }: Props) {
  return (
    <div className="card bg-(--card) border border-(--border) rounded-xl overflow-hidden transition-[border-color,transform] duration-200 min-w-0">
      <div className="pt-[14px] px-[18px] pb-[10px] flex items-center gap-[10px] border-b border-(--border)">
        <div className="ic-gh w-7 h-7 rounded-[7px] flex items-center justify-center text-[0.9rem] shrink-0">
          🐙
        </div>
        <div>
          <h3 className="text-[0.9rem] font-bold">GitHub Workflow</h3>
          <p className="text-[0.72rem] text-(--muted) mt-px">Fork → PR → Review → Merge</p>
        </div>
      </div>

      <div className="pt-[14px] px-[18px] pb-4 min-w-0 overflow-hidden">
        <div className="flex flex-col gap-3">
          {steps.map((step) => (
            <div key={step.step} className="grid grid-cols-[24px_1fr] gap-3 items-start min-w-0">
              <div className="w-6 h-6 bg-[rgba(247,201,72,0.15)] border border-[rgba(247,201,72,0.3)] rounded-full flex items-center justify-center text-[0.65rem] text-(--accent) font-bold font-mono shrink-0 mt-[2px]">
                {step.step}
              </div>
              <CommandBlock
                command={{ label: step.label, tokens: step.tokens }}
                style={{ margin: 0, flex: 1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
