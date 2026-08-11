import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner } from '../styles'

const contact = [
  { label: 'lxmf', value: 'e0b83793dc64a49b26649ee663fd4f15', href: null },
  { label: 'code', value: 'github.com/noduscypher', href: 'https://github.com/noduscypher' },
  { label: 'music', value: 'bandcamp.com/noduscypher', href: 'https://bandcamp.com/noduscypher' },
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
          {contact.map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: 4, fontSize: TYPE.small, display: 'flex', gap: 12 }}>
              <span style={{ color: MUTED, width: 52, flexShrink: 0 }}>{label}</span>
              {href
                ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
                : <span style={{ color: TEAL, wordBreak: 'break-all' }}>{value}</span>
              }
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
