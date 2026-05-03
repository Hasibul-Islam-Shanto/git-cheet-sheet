'use client'

import { useState } from 'react'
import type { CommandExample } from '@/types'
import CopyButton from '@/components/ui/CopyButton'
import BookmarkButton from '@/components/ui/BookmarkButton'
import { InfoButton } from '@/components/ui/InfoButton'
import { CommandDescriptionModal } from '@/components/ui/CommandDescriptionModal'

interface Props {
  command: CommandExample
  style?: React.CSSProperties
  cardId: string
  cardTitle: string
  section: string
}

export default function CommandBlock({ command, style, cardId, cardTitle, section }: Props) {
  const [showDescription, setShowDescription] = useState(false)

  const rawText = command.tokens
    .map((line) => line.map((token) => token.text).join(''))
    .join('\n')

  return (
    <div className="mb-[14px]" style={style}>
      <div className="flex items-center justify-between mb-[5px]">
        <div className="flex items-center gap-2 text-[0.72rem] text-(--muted)">
          <strong className="text-(--text)">{command.label}</strong>
          {command.description && (
            <InfoButton onClick={() => setShowDescription(true)} />
          )}
        </div>
        <BookmarkButton
          cardId={cardId}
          cardTitle={cardTitle}
          section={section}
          commandLabel={command.label}
          rawText={rawText}
        />
      </div>
      <div className="relative group">
        <pre>
          {command.tokens.map((line, lineIdx) => (
            <span key={lineIdx}>
              {line.map((token, tokenIdx) => (
                <span key={tokenIdx} className={`token-${token.type}`}>
                  {token.text}
                </span>
              ))}
              {lineIdx < command.tokens.length - 1 && '\n'}
            </span>
          ))}
        </pre>
        <CopyButton text={rawText} />
      </div>

      {showDescription && command.description && (
        <CommandDescriptionModal
          label={command.label}
          description={command.description}
          onClose={() => setShowDescription(false)}
        />
      )}
    </div>
  )
}
