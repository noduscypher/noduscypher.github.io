import { Link } from 'react-router-dom'
import MeshText from '../components/originkit/ui/meshtexthover'
import { TEAL, MUTED, TYPE, pageWrap, inner, linkStyle, mutedStyle } from '../styles'

const primaryLinks = [
  { label: 'library', desc: 'where to find things', to: '/library' },
  { label: 'rnspt', desc: '[pt] comunidade Reticulum em Portugal', to: '/rnspt' },
  { label: 'network', desc: 'people and communities', to: '/network' },
  { label: 'rock paper scissors', desc: 'quick game, no accounts', to: '/rock-paper-scissors' },
]

// Folga de cada lado do título, para a malha se deformar sem cortar.
const TITLE_PAD = 26

function NavLink({ label, desc, to, href, mesh }) {
  const labelEl = mesh
    ? <span style={{ color: MUTED, fontSize: 17 }}>{label}</span>
    : to
      ? <Link to={to} style={linkStyle}>{label}</Link>
      : <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{label}</a>

  return (
    <div style={{ marginBottom: 8 }}>
      {labelEl}
      <span style={mutedStyle}> · {desc}</span>
      {mesh && <span style={{ color: '#555', fontSize: 15 }}> [mesh]</span>}
    </div>
  )
}

export default function Home() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        {/* Duas linhas em vez de uma: "rawmesh" a 96px precisa de ~403px e
            era cortado no telemóvel. O componente só desenha uma linha, por
            isso empilham-se duas instâncias — cada uma mantém o hover. */}
        {/* O componente desenha centrado na sua caixa. Dando a cada linha uma
            caixa do tamanho do próprio texto (+ folga igual dos dois lados para
            as letras se deformarem sem cortar), as duas encostam à esquerda,
            como o resto da página. 57.7px é a largura de um caractere do
            monospace a 96px; a folga é cancelada pelo marginLeft. */}
        <div style={{ marginBottom: 4, marginLeft: -TITLE_PAD }}>
          {['raw', 'mesh'].map(line => (
            <div
              key={line}
              style={{ height: 104, width: Math.round(line.length * 57.7) + TITLE_PAD * 2 }}
            >
              <MeshText
                text={line}
                color={TEAL}
                font={{ fontFamily: 'monospace', variant: 'Bold', fontSize: 96 }}
                colorSplit={true}
                customColors={['#79ddbb', '#336699']}
                force={18}
              />
            </div>
          ))}
        </div>
        <p style={{ ...mutedStyle, fontSize: TYPE.sub, margin: '0 0 48px' }}>low-noise creator</p>

        <div style={{ marginBottom: 24 }}>
          {primaryLinks.map(l => <NavLink key={l.label} {...l} />)}
        </div>

        <div style={{ marginBottom: 48, fontSize: 17 }}>
          <span style={{ color: MUTED }}>new to reticulum? · </span>
          <Link to="/start-here" style={linkStyle}>start here</Link>
        </div>

        <div style={{ marginBottom: 40, fontSize: 16 }}>
          <Link to="/contacts" style={{ color: TEAL, textDecoration: 'none' }}>contacts</Link>
          <span style={{ color: MUTED }}> · </span>
          <Link to="/about" style={{ color: TEAL, textDecoration: 'none' }}>about</Link>
          <span style={{ color: MUTED }}> · </span>
          <Link to="/content-policy" style={{ color: TEAL, textDecoration: 'none' }}>content policy</Link>
        </div>

        <p style={{ color: MUTED, fontSize: 16, margin: 0 }}>
          walk quietly & keep the signal alive.
        </p>

      </div>
    </div>
  )
}
