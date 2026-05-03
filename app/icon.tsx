import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0f16',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: '800',
          color: '#f7c948',
          fontFamily: 'sans-serif',
          borderRadius: '6px',
        }}
      >
        g
      </div>
    ),
    { ...size },
  )
}
