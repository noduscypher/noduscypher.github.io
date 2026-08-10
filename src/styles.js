export const TEAL = '#79ddbb'
export const MUTED = '#888888'
export const FONT = 'ui-monospace, Consolas, monospace'

// Escala tipográfica, alinhada com rawmesh.neocities.org.
// Um sítio só para afinar tamanhos, em vez de literais espalhados.
export const TYPE = {
  tag: 15,    // etiquetas [mesh], labels de secção
  small: 16,  // breadcrumbs, contactos, rodapé
  base: 17,   // corpo e links de navegação
  sub: 19,    // subtítulo da home
  title: 22,  // h1 das páginas interiores
}

export const linkStyle = { color: TEAL, textDecoration: 'none', fontSize: TYPE.base }
export const mutedStyle = { color: MUTED, fontSize: TYPE.base }

// Sem `background` de propósito: o fundo vive no body, para o brilho
// em body::before ficar visível por trás. Ver src/index.css.
export const pageWrap = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 24px',
  fontFamily: FONT,
  color: '#cccccc',
}

export const inner = { width: '100%', maxWidth: 560 }
