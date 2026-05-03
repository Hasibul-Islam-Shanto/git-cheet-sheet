import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'hi-git — Git Cheat Sheet'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0f16',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background:
              'radial-gradient(ellipse at center, rgba(247,201,72,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            display: 'flex',
            background: 'rgba(247,201,72,0.1)',
            border: '1px solid rgba(247,201,72,0.3)',
            color: '#f7c948',
            fontSize: '14px',
            letterSpacing: '0.18em',
            padding: '6px 18px',
            borderRadius: '100px',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}
        >
          Developer Reference
        </div>

        <div
          style={{
            fontSize: '72px',
            fontWeight: '800',
            color: '#e8eaf0',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          hi-git
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#7a8099',
            fontFamily: 'monospace',
            marginBottom: '40px',
          }}
        >
          Git, made human.
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {['Search', 'Bookmarks', 'Examples', 'GitHub Workflow'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(19,22,31,0.8)',
                border: '1px solid #232840',
                color: '#7a8099',
                fontSize: '14px',
                padding: '6px 14px',
                borderRadius: '8px',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            color: '#3d4460',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
        >
          hi-shanto.me
        </div>
      </div>
    ),
    { ...size },
  )
}
