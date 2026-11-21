import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner } from '../styles'

const contact = [
  { label: 'lxmf', value: 'e0b83793dc64a49b26649ee663fd4f15', href: null, desc: 'contact on the reticulum network' },
  { label: 'code', value: 'github.com/noduscypher', href: 'https://github.com/noduscypher', desc: 'guides and manuals, in several languages' },
  { label: 'music', value: 'bandcamp.com/noduscypher', href: 'https://bandcamp.com/noduscypher', desc: 'personal music' },
  { label: 'lightning', value: 'trustyflame02@zeuspay.com', href: null, desc: 'donations' },
]

export default function Contacts() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · contacts</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 32px', letterSpacing: 1 }}>
          contacts
        </h1>

        <div style={{ marginBottom: 32 }}>
          {contact.map(({ label, value, href, desc }) => (
            <div key={label} style={{ marginBottom: 16, fontSize: TYPE.small, display: 'flex', gap: 12 }}>
              <span style={{ color: MUTED, width: 88, flexShrink: 0 }}>{label}</span>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
                  : <span style={{ color: TEAL, wordBreak: 'break-all' }}>{value}</span>
                }
                <span style={{ color: MUTED, fontSize: 14, lineHeight: 1.5, marginTop: 1 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
