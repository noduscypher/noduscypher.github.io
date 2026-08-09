import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

const sections = [
  {
    title: 'books · philosophy',
    links: [
      { label: 'gutenberg.org', desc: '70,000 free ebooks', href: 'https://gutenberg.org' },
      { label: 'standardebooks.org', desc: 'beautifully formatted public domain books', href: 'https://standardebooks.org' },
      { label: 'archive.org', desc: 'internet archive, books, music, software', href: 'https://archive.org' },
    ],
  },
  {
    title: 'mesh · reticulum · radio',
    links: [
      { label: 'reticulum.network', desc: 'official docs and protocol', href: 'https://reticulum.network' },
      { label: 'unsigned.io/rnode', desc: 'RNode LoRa hardware', href: 'https://unsigned.io/rnode' },
      { label: 'github · Reticulum', desc: 'source code', href: 'https://github.com/markqvist/Reticulum' },
      { label: 'meshtastic.org', desc: 'LoRa mesh for the masses', href: 'https://meshtastic.org' },
      { label: 'meshtastic.pt', desc: 'comunidade portuguesa · LoRa off-grid', href: 'https://meshtastic.pt' },
    ],
  },
]

export default function Library() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 13, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · library</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 18, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          library
        </h1>
        <p style={{ color: MUTED, fontSize: 13, margin: '0 0 48px' }}>
          curated resources · no accounts · no tracking
        </p>

        <div style={{ marginBottom: 36 }}>
          <p style={{ color: TEAL, fontSize: 12, margin: '0 0 12px', letterSpacing: 1 }}>
            mirrors you can run yourself
          </p>
          <div style={{ marginBottom: 8 }}>
            <a
              href="https://library.kiwix.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cccccc', textDecoration: 'none', fontSize: 14 }}
            >
              library.kiwix.org
            </a>
            <span style={{ color: MUTED, fontSize: 14 }}> · 54M articles, wikipedia, MDN, gutenberg and more</span>
          </div>
        </div>

        {sections.map(({ title, links }) => (
          <div key={title} style={{ marginBottom: 36 }}>
            <p style={{ color: TEAL, fontSize: 12, margin: '0 0 12px', letterSpacing: 1 }}>
              {title}
            </p>
            {links.map(({ label, desc, href }) => (
              <div key={label} style={{ marginBottom: 8 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#cccccc', textDecoration: 'none', fontSize: 14 }}
                >
                  {label}
                </a>
                <span style={{ color: MUTED, fontSize: 14 }}> · {desc}</span>
              </div>
            ))}
          </div>
        ))}

        <div style={{ marginBottom: 36, paddingTop: 8, borderTop: '1px solid #222' }}>
          <p style={{ color: TEAL, fontSize: 12, margin: '20px 0 12px', letterSpacing: 1 }}>
            on the node
          </p>
          <p style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>
            rawmesh runs its own offline library on a raspberry pi — wikipedia,
            medicine and sciences, books, technical docs. It is served over
            reticulum, so it keeps working when the internet does not.
          </p>
          <div style={{ marginBottom: 8, fontSize: 14, color: '#cccccc', wordBreak: 'break-all' }}>
            2f756995d6febcde6b850c1c005774c7:/page/library.mu
          </div>
          <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>
            That address opens in a reticulum client, not a web browser.{' '}
            <Link to="/start-here" style={{ color: TEAL, textDecoration: 'none' }}>start here</Link>
            {' '}if you do not have one yet.
          </p>
        </div>

        <div>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 13 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
