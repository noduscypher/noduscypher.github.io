import { Link } from 'react-router-dom'
import { MUTED, TYPE, pageWrap, inner, RNSPT_GREEN } from './rnsptStyles'

const oficial = [
  { label: 'reticulum.network', desc: 'documentação e protocolo oficial', href: 'https://reticulum.network' },
  { label: 'github · Reticulum', desc: 'código-fonte da stack, por Mark Qvist', href: 'https://github.com/markqvist/Reticulum' },
  { label: 'github · NomadNet', desc: 'interface, mensagens e páginas (estás a usá-la agora)', href: 'https://github.com/markqvist/NomadNet' },
  { label: 'github · Sideband', desc: 'cliente LXMF oficial', href: 'https://github.com/markqvist/Sideband' },
]

const traduzidos = [
  { label: 'Sideband', desc: 'instalação e configuração (Linux, Raspberry Pi, desktop) · PT/EN', href: 'https://github.com/noduscypher/sideband-setup' },
  { label: 'Columba', desc: 'manual bilingue para Columba, Sideband e Reticulum · PT/EN', href: 'https://github.com/noduscypher/columba-manual' },
  { label: 'MeshChatX', desc: 'configuração da app e ferramentas relacionadas', href: 'https://github.com/noduscypher/meshchatx-setup' },
]

function LinkRow({ label, desc, href }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#cccccc', textDecoration: 'none', fontSize: TYPE.base }}>
        {label}
      </a>
      <span style={{ color: MUTED, fontSize: TYPE.base }}> · {desc}</span>
    </div>
  )
}

export default function RnsptRecursos() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/rnspt" style={{ color: RNSPT_GREEN, textDecoration: 'none' }}>rnspt</Link>
          <span style={{ color: MUTED }}> · recursos</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 40px', letterSpacing: 1 }}>
          recursos
        </h1>

        <div style={{ marginBottom: 36 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 12px', letterSpacing: 1 }}>
            oficial
          </p>
          {oficial.map(l => <LinkRow key={l.label} {...l} />)}
        </div>

        <div style={{ marginBottom: 36 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 12px', letterSpacing: 1 }}>
            guias traduzidos
          </p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 16px' }}>
            manuais em português para as apps da Reticulum, escritos
            e mantidos pela comunidade PT.
          </p>
          {traduzidos.map(l => <LinkRow key={l.label} {...l} />)}
        </div>

        <div>
          <Link to="/rnspt" style={{ color: RNSPT_GREEN, textDecoration: 'none', fontSize: TYPE.small }}>← rnspt</Link>
        </div>

      </div>
    </div>
  )
}
