'use client'

import { motion } from 'framer-motion'

const NODE_RADIUS = 22

interface Props {
  x: number
  y: number
  name: string
  color: string
  isHead: boolean
}

export default function BranchLabel({ x, y, name, color, isHead }: Props) {
  const labelY = y - NODE_RADIUS - 28

  if (isHead) {
    const label = `HEAD → ${name}`
    const pillW = Math.max(80, label.length * 6.4 + 16)

    return (
      <motion.g
        initial={{ opacity: 0, y: labelY - 6 }}
        animate={{ opacity: 1, y: labelY }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <rect
          x={x - pillW / 2}
          y={-12}
          width={pillW}
          height={22}
          rx={11}
          fill="rgba(247,201,72,0.15)"
          stroke="#f7c948"
          strokeWidth={1}
          transform={`translate(0, ${labelY})`}
        />
        <text
          x={x}
          y={labelY + 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          fontFamily="monospace"
          fontWeight="bold"
          fill="#f7c948"
          style={{ userSelect: 'none' }}
        >
          {label}
        </text>
      </motion.g>
    )
  }

  const pillW = Math.max(60, name.length * 7 + 16)

  return (
    <motion.g
      initial={{ opacity: 0, y: labelY - 6 }}
      animate={{ opacity: 1, y: labelY }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <rect
        x={x - pillW / 2}
        y={-12}
        width={pillW}
        height={22}
        rx={11}
        fill="rgba(19,22,31,0.9)"
        stroke={color}
        strokeWidth={1}
        transform={`translate(0, ${labelY})`}
      />
      <text
        x={x}
        y={labelY + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontFamily="monospace"
        fill={color}
        style={{ userSelect: 'none' }}
      >
        {name}
      </text>
    </motion.g>
  )
}
