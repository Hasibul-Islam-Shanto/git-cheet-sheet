'use client'

import { useTranslation } from '@/hooks/useTranslation'
import type { QuickRefRow } from '@/types'

interface Props {
  rows: QuickRefRow[]
}

export default function QuickRefTable({ rows }: Props) {
  const { t } = useTranslation()

  return (
    <div className="card bg-(--card) border border-(--border) rounded-xl overflow-hidden min-w-0 w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {[t.quickRef.colCommand, t.quickRef.colDesc].map((heading) => (
              <th
                key={heading}
                className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-(--muted) text-left px-3 py-2 border-b border-(--border)"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className={`px-3 py-2 text-[0.8rem] align-middle ${idx < rows.length - 1 ? 'border-b border-[rgba(35,40,64,0.5)]' : ''}`}>
                <code className="font-mono text-[0.74rem] text-(--accent) bg-[rgba(247,201,72,0.08)] px-[7px] py-[2px] rounded">
                  {row.command}
                </code>
              </td>
              <td className={`px-3 py-2 text-[0.75rem] text-(--muted) align-middle ${idx < rows.length - 1 ? 'border-b border-[rgba(35,40,64,0.5)]' : ''}`}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
