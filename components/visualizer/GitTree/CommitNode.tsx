'use client'

import { motion } from 'framer-motion'

const NODE_RADIUS = 22

interface Props {
  x: number
  y: number
  hash: string
  message: string
  color: string
  isHead: boolean
  isHighlighted: boolean
}

export default function CommitNode({ x, y, hash, message, color, isHead, isHighlighted }: Props) {
  return (
    <g>
      {isHighlighted && (
        <motion.circle
          cx={x}
          cy={y}
          r={NODE_RADIUS + 6}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0, r: NODE_RADIUS + 2 }}
          animate={{ opacity: [0, 0.6, 0], r: [NODE_RADIUS + 2, NODE_RADIUS + 10, NODE_RADIUS + 2] }}
          transition={{ duration: 1.2, repeat: 1 }}
        />
      )}

      <motion.circle
        cx={x}
        cy={y}
        r={NODE_RADIUS}
        fill={color}
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={isHead ? 2.5 : 1.8}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      <motion.text
        x={x}
        y={y + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={9}
        fontFamily="monospace"
        fill="#e8eaf0"
        style={{ userSelect: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {hash.slice(0, 7)}
      </motion.text>

      <motion.text
        x={x}
        y={y + NODE_RADIUS + 16}
        textAnchor="middle"
        fontSize={11}
        fontFamily="sans-serif"
        fill="#7a8099"
        style={{ userSelect: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message.length > 14 ? message.slice(0, 14) + '…' : message}
      </motion.text>
    </g>
  )
}
