import MeshText from './components/originkit/ui/meshtexthover'

const TEAL = '#79ddbb'
const MUTED = '#888888'

const primaryLinks = [
  { label: 'signal notes', desc: 'thoughts and discussion' },
  { label: 'offline library', desc: '54M articles' },
  { label: 'chat', desc: 'open mesh chat' },
]

const secondaryLinks = [
  { label: 'RNSPT', desc: 'reticulum community · portugal' },
  { label: 'leandro fuego', desc: 'regenerative food' },
  { label: 'darkmoonmagic', desc: 'inner sovereignty' },
  { label: 'echo of coherence', desc: 'consciousness' },
]

const contact = [
  { label: 'lxmf', value: 'e0b83793dc64a49b26649ee663fd4f15', href: null },
  { label: 'code', value: 'github.com/noduscypher', href: 'https://github.com/noduscypher' },
  { label: 'music', value: 'bandcamp.com/noduscypher', href: 'https://bandcamp.com/noduscypher' },
]

const linkStyle = { color: TEAL, textDecoration: 'none', fontSize: 14 }
const mutedStyle = { color: MUTED, fontSize: 14 }

export default function App() {
  return (
    <div style={{
      background: '#0d0d0d',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '64px 24px',
      fontFamily: 'ui-monospace, Consolas, monospace',
      color: '#cccccc',
    }}>
      <div style={{ width: '100%', maxWidth: 560 }}>

        {/* Header */}
        <div style={{ height: 140, marginBottom: 4 }}>
          <MeshText
            text="rawmesh"
            color={TEAL}
            font={{ fontFamily: 'monospace', variant: 'Bold', fontSize: 96 }}
            colorSplit={true}
            customColors={['#79ddbb', '#336699']}
            force={18}
          />
        </div>
        <p style={{ ...mutedStyle, margin: '0 0 48px' }}>low-noise creator</p>

        {/* Primary links */}
        <div style={{ marginBottom: 24 }}>
          {primaryLinks.map(({ label, desc }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <a href="#" style={linkStyle}>{label}</a>
              <span style={mutedStyle}> · {desc}</span>
            </div>
          ))}
        </div>

        {/* Secondary links */}
        <div style={{ marginBottom: 48 }}>
          {secondaryLinks.map(({ label, desc }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <a href="#" style={linkStyle}>{label}</a>
              <span style={mutedStyle}> · {desc}</span>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 32 }}>
          {contact.map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: 4, fontSize: 13 }}>
              <span style={{ color: MUTED, display: 'inline-block', width: 52 }}>{label}</span>
              {href
                ? <a href={href} style={{ color: TEAL, textDecoration: 'none' }}>{value}</a>
                : <span style={{ color: TEAL }}>{value}</span>
              }
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{ marginBottom: 40, fontSize: 13 }}>
          <a href="#" style={{ color: TEAL, textDecoration: 'none' }}>about</a>
          <span style={{ color: MUTED }}> · </span>
          <a href="#" style={{ color: TEAL, textDecoration: 'none' }}>content policy</a>
        </div>

        {/* Tagline */}
        <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>
          walk quietly & keep the signal alive.
        </p>

      </div>
    </div>
  )
}
