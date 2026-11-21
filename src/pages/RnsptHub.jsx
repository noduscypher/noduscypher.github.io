import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MUTED, TYPE, pageWrap, inner, RNSPT_ACCENT } from './rnsptStyles'

const SECTIONS = [
  ['o-que-e', 'o que é'],
  ['como-funciona', 'como funciona'],
  ['apps', 'apps'],
  ['hardware', 'hardware'],
  ['comunidade', 'comunidade'],
]

const BODY = { color: '#aaaaaa', fontSize: TYPE.base, lineHeight: 1.8, margin: '0 0 14px' }
const LABEL = { color: RNSPT_ACCENT, fontSize: TYPE.tag, margin: '0 0 12px', letterSpacing: 1 }
const SECTION = { marginBottom: 56, scrollMarginTop: 24 }
const PRE = {
  background: '#0a0a0a',
  border: '1px solid #222',
  borderRadius: 4,
  padding: '16px 20px',
  color: '#aaaaaa',
  fontSize: TYPE.small,
  lineHeight: 1.7,
  overflowX: 'auto',
  margin: '0 0 14px',
}
const LINK = { color: RNSPT_ACCENT, textDecoration: 'underline' }
const ROW = { marginBottom: 10, fontSize: TYPE.base, lineHeight: 1.7 }
const ITEM_NAME = { color: '#cccccc' }
const DASH = { color: '#555' }

const principios = [
  ['encriptação por defeito', 'não é uma opção que se liga: faz parte de como a rede encaminha.'],
  ['sem endereço de origem', 'um pacote não diz de onde veio nem quem o enviou.'],
  ['sem hierarquia', 'ninguém precisa de licença nem de convite para ligar um nó.'],
  ['qualquer meio', 'o mesmo software corre em rádio, WiFi, cabo ou internet.'],
]

const apps = [
  { name: 'columba', desc: 'android (ios em desenvolvimento). a forma mais direta de navegar e enviar mensagens.', href: 'https://columba.network' },
  { name: 'sideband', desc: 'android, ios e desktop. boa para mensagens.', href: 'https://reticulum.betweentheborders.com/software/Sideband.html' },
  { name: 'meshchatx', desc: 'cliente de secretária, com navegador de páginas.', href: 'https://meshchatx.com/download' },
  { name: 'nomadnet', desc: 'interface de terminal, para quem não tem medo da linha de comandos.', href: 'https://github.com/markqvist/NomadNet' },
]

const placas = [
  ['LilyGO T-Beam', 'ESP32 · SX1262, SX1268, SX1276 ou SX1278'],
  ['LilyGO T-Beam Supreme', 'ESP32 · SX1262 ou SX1268'],
  ['LilyGO T3S3', 'ESP32 · SX1262, SX1268, SX1276 ou SX1278'],
  ['Heltec LoRa32 v3', 'ESP32 · SX1262 ou SX1268'],
  ['Heltec LoRa32 v4', 'ESP32 · SX1262'],
  ['Heltec T114', 'nRF52 · SX1262 ou SX1268'],
  ['RAK4631', 'nRF52 · SX1262 ou SX1268'],
]

const bandas = [
  ['863 a 865 MHz', '25 mW', '0,1 % do tempo'],
  ['865 a 868 MHz', '25 mW', '1 % do tempo'],
  ['868 a 868,6 MHz', '25 mW', '1 % do tempo'],
  ['868,7 a 869,2 MHz', '25 mW', '0,1 % do tempo'],
  ['869,4 a 869,65 MHz', '500 mW', '10 % do tempo'],
  ['869,7 a 870 MHz', '25 mW', '1 % do tempo (5 mW sem limite de tempo)'],
]

const oficial = [
  { label: 'reticulum.network', desc: 'documentação e protocolo oficial', href: 'https://reticulum.network' },
  { label: 'github · Reticulum', desc: 'código-fonte da stack, por Mark Qvist', href: 'https://github.com/markqvist/Reticulum' },
  { label: 'github · NomadNet', desc: 'interface, mensagens e páginas', href: 'https://github.com/markqvist/NomadNet' },
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

function goTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
}

export default function RnsptHub() {
  const { state } = useLocation()

  useEffect(() => {
    if (state && state.section) goTo(state.section)
  }, [state])

  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={LINK}>rawmesh</Link>
          <span style={{ color: MUTED }}> · rnspt</span>
        </p>

        <h1 style={{ color: RNSPT_ACCENT, fontSize: 32, fontWeight: 'bold', margin: '0 0 6px', letterSpacing: 1 }}>
          RNSPT
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 4px' }}>
          hub da comunidade Reticulum em Portugal
        </p>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 24px' }}>
          Portuguese Reticulum community hub
        </p>

        <p style={{ fontSize: TYPE.small, margin: '0 0 48px', lineHeight: 1.9 }}>
          {SECTIONS.map(([id, label], i) => (
            <span key={id}>
              {i > 0 && <span style={{ color: MUTED }}> · </span>}
              <a href="#/rnspt" onClick={(e) => { e.preventDefault(); goTo(id) }} style={LINK}>{label}</a>
            </span>
          ))}
        </p>

        <div style={{ marginBottom: 56 }}>
          <p style={LABEL}>ligar ao hub PT</p>
          <p style={BODY}>
            adiciona isto ao teu <code style={{ color: RNSPT_ACCENT }}>~/.reticulum/config</code>:
          </p>
          <pre style={{ ...PRE, margin: 0 }}>
{`  [[Reticulum.pt]]
    type = TCPClientInterface
    target_host = network.reticulum.pt
    target_port = 4242`}
          </pre>
        </div>

        <div id="o-que-e" style={SECTION}>
          <p style={LABEL}>o que é</p>
          <p style={BODY}>
            a Reticulum é uma pilha de rede pensada para funcionar sem infraestrutura
            central: não precisa de operadora, de servidor nem de conta. dois aparelhos
            que se alcancem, por rádio LoRa, WiFi, cabo, internet ou packet radio,
            formam uma rede encriptada entre si.
          </p>
          <p style={BODY}>
            a tua identidade é um par de chaves, não uma conta. o teu endereço é um hash
            dessa chave, e acompanha-te do rádio para a internet sem mudar.
          </p>
          <div style={{ marginTop: 20 }}>
            {principios.map(([nome, desc]) => (
              <div key={nome} style={{ ...ROW, color: '#aaaaaa', paddingLeft: 12 }}>
                <span style={DASH}>— </span>
                <span style={ITEM_NAME}>{nome}</span>
                {' · '}{desc}
              </div>
            ))}
          </div>
        </div>

        <div id="como-funciona" style={SECTION}>
          <p style={LABEL}>como funciona</p>
          <p style={BODY}>
            o caminho mais curto até à tua primeira ligação, em quatro passos:
          </p>
          <div style={{ marginBottom: 16 }}>
            {[
              ['instalar', 'a Reticulum instala-se com o pip, em Linux, macOS, Windows e Raspberry Pi.'],
              ['ligar uma interface', 'diz à Reticulum por onde falar: o hub PT acima, um rádio LoRa, WiFi.'],
              ['deixar a malha formar-se', 'os nós anunciam-se e aprendem os caminhos uns dos outros, sozinhos.'],
              ['comunicar', 'abre uma das apps abaixo para mensagens, páginas e ficheiros.'],
            ].map(([nome, desc], i) => (
              <div key={nome} style={{ ...ROW, color: '#aaaaaa', paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#444' }}>{i + 1}.</span>
                <span style={ITEM_NAME}>{nome}</span>
                {' · '}{desc}
              </div>
            ))}
          </div>
          <pre style={PRE}>
{`pip install rns     # instalar
rnsd                # arrancar o serviço
rnstatus            # ver as interfaces ligadas`}
          </pre>
          <p style={{ ...BODY, margin: 0 }}>
            não precisas de pedir licença nem de te registares. liga-te e diz olá:
            o endereço LXMF de quem mantém este hub está em{' '}
            <Link to="/contacts" style={LINK}>contacts</Link>.
          </p>
        </div>

        <div id="apps" style={SECTION}>
          <p style={LABEL}>apps</p>
          <p style={BODY}>instala uma. a identidade é criada sozinha no primeiro arranque, sem registo nem email.</p>
          {apps.map(({ name, desc, href }) => (
            <div key={name} style={{ ...ROW, color: '#aaaaaa', paddingLeft: 12 }}>
              <span style={DASH}>— </span>
              <span style={ITEM_NAME}>{name}</span>
              {' · '}{desc}{' '}
              <a href={href} target="_blank" rel="noopener noreferrer" style={LINK}>website</a>
            </div>
          ))}
        </div>

        <div id="hardware" style={SECTION}>
          <p style={LABEL}>hardware</p>
          <p style={BODY}>
            um RNode é um rádio LoRa com firmware aberto. não é um aparelho de um
            fabricante: instala-se o firmware numa placa comum, com uma ferramenta que
            já vem com a Reticulum. estas são as placas que o instalador automático
            suporta, segundo o manual oficial:
          </p>
          <div style={{ marginBottom: 16 }}>
            {placas.map(([nome, desc]) => (
              <div key={nome} style={{ ...ROW, color: '#aaaaaa', paddingLeft: 12 }}>
                <span style={DASH}>— </span>
                <span style={ITEM_NAME}>{nome}</span>
                {' · '}{desc}
              </div>
            ))}
          </div>
          <p style={BODY}>
            a lista completa e atualizada está no{' '}
            <a href="https://reticulum.network/manual/hardware.html" target="_blank" rel="noopener noreferrer" style={LINK}>manual</a>.
            para instalar o firmware, com a placa ligada por USB:
          </p>
          <pre style={PRE}>
{`rnodeconf --autoinstall`}
          </pre>
          <p style={BODY}>
            depois, a placa liga-se à Reticulum com uma interface no ficheiro de
            configuração. este exemplo é o do manual oficial:
          </p>
          <pre style={PRE}>
{`  [[RNode LoRa Interface]]
    type = RNodeInterface
    enabled = yes
    port = /dev/ttyUSB0
    frequency = 867200000
    bandwidth = 125000
    txpower = 7
    spreadingfactor = 8
    codingrate = 5`}
          </pre>
          <p style={BODY}>
            a porta (<code style={{ color: RNSPT_ACCENT }}>/dev/ttyUSB0</code>) muda de
            aparelho para aparelho. os restantes valores são um ponto de partida: antes
            de montares um nó fixo, combina a frequência e os parâmetros com a
            comunidade, para os rádios se ouvirem uns aos outros.
          </p>
          <p style={{ ...BODY, margin: 0 }}>
            este nó (rawmesh) funciona assim: um RNode ligado por USB a um Raspberry Pi.
          </p>

          <p style={{ ...LABEL, marginTop: 36 }}>regras em portugal</p>
          <p style={BODY}>
            a banda de 863 a 870 MHz é de uso livre, sem licença, para dispositivos de
            curto alcance, mas com limites. cada sub-banda tem uma potência máxima e uma
            percentagem máxima de tempo em que podes emitir (o <em>duty cycle</em>).
            quem emite és tu, por isso o limite é teu, não do software.
          </p>
          <div style={{ marginBottom: 16 }}>
            {bandas.map(([faixa, potencia, tempo]) => (
              <div key={faixa} style={{ ...ROW, color: '#aaaaaa', paddingLeft: 12 }}>
                <span style={DASH}>— </span>
                <span style={ITEM_NAME}>{faixa}</span>
                {' · '}{potencia} · {tempo}
              </div>
            ))}
          </div>
          <p style={BODY}>
            as potências são em e.r.p. (a ANACOM escreve p.a.r.), ou seja, contam o
            ganho da antena. em alternativa ao limite de tempo, a norma admite técnicas
            de acesso ao espectro (LBT+AFA).
          </p>
          <p style={BODY}>
            o exemplo de cima usa 867,2 MHz, dentro dos 865 a 868, onde o limite é 1 %.
            a Reticulum deixa-te impor esse teto na própria interface, em percentagem
            numa janela de 60 minutos:
          </p>
          <pre style={PRE}>
{`    airtime_limit_long = 1`}
          </pre>
          <p style={{ ...BODY, margin: 0 }}>
            fonte: recomendação ERC/REC 70-03 da CEPT, edição de outubro de 2025 (
            <a href="https://docdb.cept.org/download/4831" target="_blank" rel="noopener noreferrer" style={LINK}>pdf</a>
            ), que a ANACOM aplica na lista de{' '}
            <a href="https://www.anacom.pt/streaming/Isencaodelicencadeestacao_revisao25nov2025.pdf?contentId=1188499&field=ATTACHED_FILE" target="_blank" rel="noopener noreferrer" style={LINK}>isenção de licença de estação</a>.
            confirma sempre os valores atuais com a ANACOM antes de montares um nó fixo.
          </p>
        </div>

        <div id="comunidade" style={SECTION}>
          <p style={LABEL}>comunidade</p>
          <p style={BODY}>
            quem constrói e quem quer começar a construir. a ligação de quem mantém
            este hub está em <Link to="/contacts" style={LINK}>contacts</Link>.
          </p>

          <p style={{ ...LABEL, marginTop: 28 }}>oficial</p>
          {oficial.map((l) => <LinkRow key={l.label} {...l} />)}

          <p style={{ ...LABEL, marginTop: 28 }}>guias traduzidos</p>
          <p style={BODY}>
            manuais em português para as apps da Reticulum, escritos e mantidos
            pela comunidade PT.
          </p>
          {traduzidos.map((l) => <LinkRow key={l.label} {...l} />)}
        </div>

        <div>
          <Link to="/" style={{ ...LINK, fontSize: TYPE.small }}>← rawmesh</Link>
        </div>

      </div>
    </div>
  )
}
