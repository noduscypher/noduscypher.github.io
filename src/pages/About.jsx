import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner, linkStyle } from '../styles'

export default function About() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 32px', letterSpacing: 1 }}>
          about
        </h1>

        <div style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 20px' }}>
            not a blog. not a service. a node.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            rawmesh is a personal presence on the reticulum mesh — a raspberry
            pi in beira baixa, portugal, off the cloud & reachable on the mesh.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            this site is the surface-web reflection of that node. same identity,
            different medium. new to reticulum?{' '}
            <Link to="/start-here" style={linkStyle}>start here</Link>.
          </p>
          <p style={{ margin: '0 0 20px' }}>
            here you'll find an offline library, a chat room,
            music, and pages from people in this network.
            a small, quiet hub for those who prefer signal over noise.
          </p>
        </div>

        <div style={{ marginTop: 40, color: MUTED, fontSize: TYPE.small }}>
          open-source · mesh · music · community
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
