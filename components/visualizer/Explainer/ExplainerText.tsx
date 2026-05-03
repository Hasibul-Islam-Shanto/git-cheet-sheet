'use client'

interface Props {
  command: string
  explanation: string
}

export default function ExplainerText({ command, explanation }: Props) {
  if (!explanation) return null

  return (
    <div className="mt-4 flex items-start gap-3 px-1">
      <span className="text-lg shrink-0 mt-0.5">💡</span>
      <div>
        {command && (
          <code className="text-[0.75rem] font-mono text-(--accent) bg-(--code-bg) px-2 py-0.5 rounded mr-2">
            {command}
          </code>
        )}
        <span className="text-sm text-(--text) opacity-80">{explanation}</span>
      </div>
    </div>
  )
}
