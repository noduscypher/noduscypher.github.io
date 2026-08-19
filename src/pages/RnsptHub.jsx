import { Link } from 'react-router-dom'
import { MUTED, TYPE, pageWrap, inner, RNSPT_ACCENT } from './rnsptStyles'

export default function RnsptHub() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: RNSPT_ACCENT, textDecoration: 'underline' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · rnspt</span>
        </p>

        <h1 style={{ color: RNSPT_ACCENT, fontSize: 32, fontWeight: 'bold', margin: '0 0 6px', letterSpacing: 1 }}>
          RNSPT
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 4px' }}>
          hub da comunidade Reticulum em Portugal
        </p>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 40px' }}>
          Portuguese Reticulum community hub
        </p>

        <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 40px' }}>
          Um ponto de encontro para quem está a construir, ou quer começar
          a construir, a sua presença na rede Reticulum em Portugal.
        </p>

        <div style={{ marginBottom: 40 }}>
          <p style={{ color: RNSPT_ACCENT, fontSize: TYPE.tag, margin: '0 0 12px', letterSpacing: 1 }}>
            ligar ao hub PT
          </p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 12px' }}>
            adiciona isto ao teu <code style={{ color: RNSPT_ACCENT }}>~/.reticulum/config</code>:
          </p>
          <pre style={{
            background: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: 4,
            padding: '16px 20px',
            color: '#aaaaaa',
            fontSize: TYPE.small,
            lineHeight: 1.7,
            overflowX: 'auto',
            margin: 0,
          }}>
{`  [[Reticulum.pt]]
    type = TCPClientInterface
    target_host = network.reticulum.pt
    target_port = 4242`}
          </pre>
        </div>

        <div style={{ marginBottom: 40 }}>
          <Link to="/rnspt/recursos" style={{ color: RNSPT_ACCENT, textDecoration: 'underline', fontSize: TYPE.base }}>recursos</Link>
          <span style={{ color: MUTED, fontSize: TYPE.base }}> · guias e software</span>
          <br />
          <Link to="/rnspt/aderir" style={{ color: RNSPT_ACCENT, textDecoration: 'underline', fontSize: TYPE.base }}>aderir</Link>
          <span style={{ color: MUTED, fontSize: TYPE.base }}> · nunca usaste Reticulum? começa aqui</span>
        </div>

        <div>
          <Link to="/" style={{ color: RNSPT_ACCENT, textDecoration: 'underline', fontSize: TYPE.small }}>← rawmesh</Link>
        </div>

      </div>
    </div>
  )
}
