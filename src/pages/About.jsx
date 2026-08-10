import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

export default function About() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 16, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 22, fontWeight: 'normal', margin: '0 0 32px', letterSpacing: 1 }}>
          about
        </h1>

        <div style={{ color: '#aaaaaa', fontSize: 17, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 20px' }}>
            Not a blog. Not a service. A node.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            rawmesh is a personal presence on the Reticulum mesh —
            running on a Raspberry Pi in Beira Baixa, Portugal.
            Off the cloud, off the grid, reachable on the mesh.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            Here you'll find an offline library, a chat room,
            music, and pages from people in this network.
            A small, quiet hub for those who prefer signal over noise.
          </p>
        </div>

        <div style={{ marginTop: 40, color: MUTED, fontSize: 16 }}>
          open-source · mesh · music · community
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 16 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
