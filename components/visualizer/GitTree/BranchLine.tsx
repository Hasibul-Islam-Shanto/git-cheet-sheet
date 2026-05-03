'use client'

import { motion } from 'framer-motion'

interface Props {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}

export default function BranchLine({ x1, y1, x2, y2, color }: Props) {
  const midX = (x1 + x2) / 2

  const d =
    y1 === y2
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : `M ${x1} ${y1} C ${midX} ${y1} ${midX} ${y2} ${x2} ${y2}`

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeOpacity={0.6}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  )
}
