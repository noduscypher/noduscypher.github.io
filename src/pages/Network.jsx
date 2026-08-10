import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

const mesh = [
  { label: 'RNSPT', desc: '[pt] comunidade RNS Portugal', mesh: true },
]

const web = [
  { label: 'leandro fuego', desc: 'fire kitchen · regenerative food', href: 'https://rawmesh.neocities.org/leandro-fuego.html' },
  { label: 'darkmoonmagic', desc: 'inner sovereignty', href: 'https://darkmoonmagic.org' },
  { label: 'echo of coherence', desc: 'consciousness', href: 'https://youtube.com/@echoofcoherence' },
  { label: 'zitron.pt', desc: 'graphic & web design · bitcoin · nostr', href: 'https://zitron.pt' },
  { label: 'aceitabitcoin.pt', desc: 'negócios que aceitam Bitcoin em Portugal', href: 'https://aceitabitcoin.pt' },
  { label: 'bordalix · pinboard', desc: 'curated bookmarks', href: 'http://pinboard.in/u:bordalix' },
  { label: 'joão bordalo · nostr', desc: 'notes from the network', href: 'https://joaobordalo.com/nostr/?62cef883863022a4f1d60d54857c9d729650702c9fe227b0988c0b6e36c4bcce' },
]

export default function Network() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 16, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · network</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 22, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          network
        </h1>
        <p style={{ color: MUTED, fontSize: 16, margin: '0 0 48px' }}>
          people and communities
        </p>

        <div style={{ marginBottom: 36 }}>
          <a
            href="https://meshtastic.pt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: TEAL, fontSize: 15, letterSpacing: 1, textDecoration: 'none', display: 'block', marginBottom: 16 }}
          >
            mesh only
          </a>
          {mesh.map(({ label, desc }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <span style={{ color: MUTED, fontSize: 17 }}>{label}</span>
              <span style={{ color: MUTED, fontSize: 17 }}> · {desc}</span>
              <span style={{ color: '#444', fontSize: 15 }}> [mesh]</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 36 }}>
          <p style={{ color: TEAL, fontSize: 15, margin: '0 0 12px', letterSpacing: 1 }}>
            web
          </p>
          {web.map(({ label, desc, href }) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#cccccc', textDecoration: 'none', fontSize: 17 }}
              >
                {label}
              </a>
              <span style={{ color: MUTED, fontSize: 17 }}> · {desc}</span>
            </div>
          ))}
        </div>

        <div>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 16 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
