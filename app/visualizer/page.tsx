import type { Metadata } from 'next'
import VisualizerLayout from '@/components/visualizer/VisualizerLayout'

interface Props {
  searchParams: Promise<{ cmd?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { cmd } = await searchParams
  const title = cmd ? `git ${cmd} — Interactive Visualizer` : 'Git Visualizer'
  return {
    title: `${title} | hi-git`,
    description: 'Interactive Git command visualizer with animated commit graph and simulated terminal.',
  }
}

export default async function VisualizerPage({ searchParams }: Props) {
  const { cmd } = await searchParams
  const cmdId = cmd ?? 'branch'

  return (
    <main>
      <VisualizerLayout cmdId={cmdId} />
    </main>
  )
}
