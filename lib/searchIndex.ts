import { sections } from '@/data/commands'
import type { CodeToken } from '@/types'

export interface SearchItem {
  cardId: string
  cardTitle: string
  cardIcon: string
  section: string
  commandLabel: string
  rawText: string
}

function extractRawText(lines: CodeToken[][]): string {
  return lines.map((line) => line.map((t) => t.text).join('')).join('\n')
}

export const searchIndex: SearchItem[] = sections.flatMap((section) =>
  section.cards.flatMap((card) =>
    card.commands.map((command) => ({
      cardId: card.id,
      cardTitle: card.title,
      cardIcon: card.icon,
      section: section.label.replace(/^\d+ — /, ''),
      commandLabel: command.label,
      rawText: extractRawText(command.tokens),
    })),
  ),
)
