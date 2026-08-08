import { Link } from 'react-router-dom'
import MeshText from '../components/originkit/ui/meshtexthover'
import { TEAL, MUTED, pageWrap, inner, linkStyle, mutedStyle } from '../styles'

const primaryLinks = [
  { label: 'offline library', desc: '54M articles', to: '/library' },
  { label: 'network', desc: 'people and communities', to: '/network' },
]

const contact = [
  { label: 'lxmf', value: 'e0b83793dc64a49b26649ee663fd4f15', href: null },
  { label: 'code', value: 'github.com/noduscypher', href: 'https://github.com/noduscypher' },
  { label: 'music', value: 'bandcamp.com/noduscypher', href: 'https://bandcamp.com/noduscypher' },
]

function NavLink({ label, desc, to, href, mesh }) {
  const labelEl = mesh
    ? <span style={{ color: MUTED, fontSize: 14 }}>{label}</span>
    : to
      ? <Link to={to} style={linkStyle}>{label}</Link>
      : <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{label}</a>

  return (
    <div style={{ marginBottom: 8 }}>
      {labelEl}
      <span style={mutedStyle}> · {desc}</span>
      {mesh && <span style={{ color: '#555', fontSize: 12 }}> [mesh]</span>}
    </div>
  )
}

export default function Home() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

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

        <div style={{ marginBottom: 48 }}>
          {primaryLinks.map(l => <NavLink key={l.label} {...l} />)}
        </div>

        <div style={{ marginBottom: 32 }}>
          {contact.map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: 4, fontSize: 13 }}>
              <span style={{ color: MUTED, display: 'inline-block', width: 52 }}>{label}</span>
              {href
                ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>{value}</a>
                : <span style={{ color: TEAL }}>{value}</span>
              }
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 40, fontSize: 13 }}>
          <Link to="/start-here" style={{ color: TEAL, textDecoration: 'none' }}>start here</Link>
          <span style={{ color: MUTED }}> · </span>
          <Link to="/about" style={{ color: TEAL, textDecoration: 'none' }}>about</Link>
          <span style={{ color: MUTED }}> · </span>
          <Link to="/content-policy" style={{ color: TEAL, textDecoration: 'none' }}>content policy</Link>
        </div>

        <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>
          walk quietly & keep the signal alive.
        </p>

      </div>
    </div>
  )
}
