import { Link } from 'react-router-dom'
import { MUTED, TYPE, pageWrap, inner, RNSPT_GREEN } from './rnsptStyles'

const APP_NAME = { color: '#cccccc' }

export default function RnsptAderir() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/rnspt" style={{ color: RNSPT_GREEN, textDecoration: 'none' }}>rnspt</Link>
          <span style={{ color: MUTED }}> · aderir</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 6px', letterSpacing: 1 }}>
          aderir
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.tag, margin: '0 0 48px', letterSpacing: '0.05em' }}>
          entrar na Reticulum não exige autorização. não há registo, não há espera.
        </p>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 8px' }}>o que é a Reticulum?</p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 10px' }}>
            a maior parte das redes que usas — internet, dados móveis, apps
            de mensagens — passam por servidores de empresas. essas empresas
            veem com quem falas, podem abrandar o tráfego, fechar, ou desaparecer.
          </p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: 0 }}>
            a Reticulum é diferente: os aparelhos falam diretamente uns com
            os outros, sem empresa no meio. a tua identidade é um par de
            chaves — não é uma conta, não pede email, não pede nome.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 8px' }}>o que preciso?</p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 8px' }}>
            uma app no telemóvel ou computador:
          </p>
          {[
            { label: 'columba', desc: 'android (ios em desenvolvimento). a forma mais direta de navegar e enviar mensagens.', website: 'https://columba.network' },
            { label: 'sideband', desc: 'android, ios e desktop. boa para mensagens.', website: 'https://reticulum.betweentheborders.com/software/Sideband.html' },
            { label: 'meshchatx', desc: 'cliente de secretária, com navegador de páginas.', website: 'https://meshchatx.com/download' },
          ].map(({ label, desc, website }) => (
            <div key={label} style={{ marginBottom: 6, paddingLeft: 12, fontSize: TYPE.base, color: '#aaaaaa', lineHeight: 1.8 }}>
              <span style={{ color: '#555' }}>— </span>
              <span style={APP_NAME}>{label}</span>
              {' · '}{desc}
              {' '}
              <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: RNSPT_GREEN, textDecoration: 'none' }}>website</a>
            </div>
          ))}
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '10px 0 0' }}>
            instala uma. a identidade é criada sozinha no primeiro arranque.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 8px' }}>configurar a ligação</p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 8px' }}>
            a app precisa de saber por onde falar. opções mais comuns:
          </p>
          {[
            ['TCP/IP', 'ligar a um nó existente pela internet'],
            ['LoRa', 'rádio de longo alcance, sem internet (EU868)'],
            ['Packet radio', 'para quem tem licença e equipamento'],
          ].map(([name, desc]) => (
            <div key={name} style={{ marginBottom: 4, paddingLeft: 12, fontSize: TYPE.base, color: '#aaaaaa', lineHeight: 1.8 }}>
              <span style={{ color: '#555' }}>— </span>
              <span style={APP_NAME}>{name}</span>
              {' — '}{desc}
            </div>
          ))}
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '10px 0 12px' }}>
            para começar, liga por TCP/IP ao hub PT:
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
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '12px 0 0' }}>
            passa a rádio mais tarde, quando quiseres independência real.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: RNSPT_GREEN, fontSize: TYPE.tag, margin: '0 0 8px' }}>dizer olá</p>
          <p style={{ color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: 0 }}>
            ligado à rede, a tua app anuncia-te automaticamente. procura outros
            nós — vais vê-los aparecer aos poucos. se quiseres aparecer na
            lista de nós PT, fala connosco pelo{' '}
            <Link to="/contacts" style={{ color: RNSPT_GREEN, textDecoration: 'none' }}>lxmf</Link>.
          </p>
        </div>

        <div>
          <Link to="/rnspt" style={{ color: RNSPT_GREEN, textDecoration: 'none', fontSize: TYPE.small }}>← rnspt</Link>
        </div>

      </div>
    </div>
  )
}
