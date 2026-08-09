import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

export default function SignalNotes() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 13, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · signal notes</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 18, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          signal notes
        </h1>
        <p style={{ color: MUTED, fontSize: 13, margin: '0 0 40px' }}>thoughts in progress</p>

        <div style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 1.8, marginBottom: 40 }}>
          <p style={{ color: TEAL, margin: '0 0 16px', fontSize: 13 }}>3d printing · diy solar nodes</p>

          <p style={{ margin: '0 0 16px' }}>
            the idea is simple: off-grid mesh infrastructure
            anyone can build and print at home.
          </p>

          <p style={{ margin: '0 0 8px' }}>a self-sufficient solar node needs three things:</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· power — solar panel + LiFePO4 battery</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· compute — Raspberry Pi or ESP32</p>
          <p style={{ margin: '0 0 20px', color: MUTED }}>· radio — RNode LoRa 868/915MHz</p>

          <p style={{ margin: '0 0 8px' }}>what a 3d printer solves:</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· outdoor enclosure with UV and moisture resistance (PETG or ASA)</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· antenna mount with adjustable orientation</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· integrated case for panel + battery + Pi</p>
          <p style={{ margin: '0 0 4px', color: MUTED }}>· pole or wall mounting without tools</p>
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: 32, marginBottom: 32 }}>
          <p style={{ color: TEAL, fontSize: 13, margin: '0 0 12px' }}>open for discussion</p>
          <p style={{ color: MUTED, fontSize: 13, margin: '0 0 8px' }}>are you experimenting with solar nodes?</p>
          <p style={{ color: MUTED, fontSize: 13, margin: '0 0 8px' }}>what materials do you use for outdoor builds?</p>
          <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>what is the biggest obstacle in your setup?</p>
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 13 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
