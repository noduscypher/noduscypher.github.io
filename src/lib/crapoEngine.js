// Crapô (crapette / russian bank) — motor do jogo, sem interface.
// Mesmo ficheiro usado no React e colado em rawmesh-neocities/crapo.html,
// por isso: sem imports, sem JSX, sem nada do browser. Só funções.
//
// Jogador 0 = humano, jogador 1 = computador.
// Carta: { r: 1..13, s: 0..3 }  (s: 0 ♠, 1 ♥, 2 ♣, 3 ♦ ; vermelhas = s ímpar)
//
// Localização de uma pilha (loc):
//   { k: 'crap', p }        pilha de crapette do jogador p (topo à vista)
//   { k: 'waste', p }       descarte do jogador p
//   { k: 'stock', p }       baralho de compra do jogador p
//   { k: 'tab', p, i }      pilha de trabalho i (0..3) do jogador p
//   { k: 'found', i }       fundação i (0..7), Ás a Rei, por naipe

export const SUITS = ['♠', '♥', '♣', '♦']
export const RANKS = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
export const isRed = (c) => c.s % 2 === 1
export const cardLabel = (c) => RANKS[c.r] + SUITS[c.s]

const STALL_LIMIT = 30 // turnos seguidos sem progresso => empate

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]; a[i] = a[j]; a[j] = t
  }
  return a
}

export function newGame() {
  const deck = []
  for (let d = 0; d < 2; d++)
    for (let s = 0; s < 4; s++)
      for (let r = 1; r <= 13; r++) deck.push({ r, s })
  shuffle(deck)

  const players = [0, 1].map(() => {
    const crap = deck.splice(0, 13)
    const tab = [0, 1, 2, 3].map(() => deck.splice(0, 1))
    const stock = deck.splice(0, 35)
    return { crap, stock, waste: [], tab }
  })

  return {
    players,
    found: Array.from({ length: 8 }, () => []),
    turn: 0,
    over: null,        // { winner: 0 | 1 | -1 }  (-1 = empate)
    aiMoves: 0,
    stall: 0,
    lastKey: '',
  }
}

export function pileAt(g, loc) {
  switch (loc.k) {
    case 'crap': return g.players[loc.p].crap
    case 'waste': return g.players[loc.p].waste
    case 'stock': return g.players[loc.p].stock
    case 'tab': return g.players[loc.p].tab[loc.i]
    default: return g.found[loc.i]
  }
}

export function topCard(g, loc) {
  const pile = pileAt(g, loc)
  return pile.length ? pile[pile.length - 1] : null
}

export function sameLoc(a, b) {
  return !!a && !!b && a.k === b.k && a.p === b.p && a.i === b.i
}

// Origens jogáveis do jogador p: topo da crapette, do descarte e das 4 pilhas.
export function sourcesOf(g, p) {
  const out = []
  if (g.players[p].crap.length) out.push({ k: 'crap', p })
  if (g.players[p].waste.length) out.push({ k: 'waste', p })
  for (let i = 0; i < 4; i++) if (g.players[p].tab[i].length) out.push({ k: 'tab', p, i })
  return out
}

// Destinos legais da carta que está no topo da pilha `from`.
export function legalDests(g, from) {
  const c = topCard(g, from)
  if (!c) return []
  const p = from.p
  const o = 1 - p
  const out = []

  // fundações: Ás em fundação vazia, depois o mesmo naipe a subir
  for (let i = 0; i < 8; i++) {
    const pile = g.found[i]
    if (pile.length === 0) {
      if (c.r === 1) out.push({ k: 'found', i }) // todas as vazias são destino possível
    } else {
      const t = pile[pile.length - 1]
      if (t.s === c.s && t.r === c.r - 1) out.push({ k: 'found', i })
    }
  }

  // pilhas de trabalho próprias: descer alternando cor; vazia aceita qualquer
  for (let i = 0; i < 4; i++) {
    if (from.k === 'tab' && from.i === i) continue
    const pile = g.players[p].tab[i]
    if (pile.length === 0) {
      // mover a única carta de uma pilha para outra vazia não muda nada
      if (from.k === 'tab' && g.players[p].tab[from.i].length === 1) continue
      out.push({ k: 'tab', p, i })
    } else {
      const t = pile[pile.length - 1]
      if (isRed(t) !== isRed(c) && t.r === c.r + 1) out.push({ k: 'tab', p, i })
    }
  }

  // crapette e descarte do adversário: mesmo naipe, um acima ou um abaixo
  const oc = topCard(g, { k: 'crap', p: o })
  if (oc && oc.s === c.s && Math.abs(oc.r - c.r) === 1) out.push({ k: 'crap', p: o })
  const ow = topCard(g, { k: 'waste', p: o })
  if (ow && ow.s === c.s && Math.abs(ow.r - c.r) === 1) out.push({ k: 'waste', p: o })

  return out
}

function hasMove(g, p) {
  return sourcesOf(g, p).some((s) => legalDests(g, s).length > 0)
}

function progressKey(g) {
  const f = g.found.reduce((n, pile) => n + pile.length, 0)
  return g.players[0].crap.length + ':' + g.players[1].crap.length + ':' + f
}

export function endTurn(g) {
  const key = progressKey(g)
  g.stall = key === g.lastKey ? g.stall + 1 : 0
  g.lastKey = key
  g.turn = 1 - g.turn
  g.aiMoves = 0
  if (g.stall >= STALL_LIMIT) g.over = { winner: -1 }
}

// Executa a jogada. Devolve true se foi aplicada.
export function move(g, from, to) {
  if (g.over) return false
  const ok = legalDests(g, from).some((d) => sameLoc(d, to))
  if (!ok) return false
  const card = pileAt(g, from).pop()
  pileAt(g, to).push(card)
  const p = from.p
  if (g.players[p].crap.length === 0) g.over = { winner: p }
  return true
}

// Vira uma carta do baralho para o descarte.
// Se o baralho acabou, o descarte volta a ser baralho.
// O turno só continua se a carta virada puder ser jogada logo.
export function flip(g) {
  if (g.over) return
  const P = g.players[g.turn]
  if (P.stock.length === 0) {
    if (P.waste.length === 0) { endTurn(g); return }
    P.stock = P.waste.reverse()
    P.waste = []
  }
  P.waste.push(P.stock.pop())
  if (legalDests(g, { k: 'waste', p: g.turn }).length === 0) endTurn(g)
}

// Se o jogador da vez não tem jogadas nem baralho, passa a vez.
export function autoPass(g) {
  if (g.over) return false
  const P = g.players[g.turn]
  if (P.stock.length === 0 && P.waste.length === 0 && !hasMove(g, g.turn)) {
    endTurn(g)
    return true
  }
  return false
}

// --- computador ---------------------------------------------------------

function pickAiMove(g) {
  const p = 1
  const crap = { k: 'crap', p }
  const waste = { k: 'waste', p }
  const tabs = [0, 1, 2, 3].map((i) => ({ k: 'tab', p, i })).filter((l) => pileAt(g, l).length)
  const pick = (from, pred) => {
    if (!pileAt(g, from).length) return null
    const d = legalDests(g, from).find(pred)
    return d ? { from, to: d } : null
  }
  const isFound = (d) => d.k === 'found'
  const isOwnTab = (d) => d.k === 'tab'
  const isOpp = (d) => d.k === 'crap' || d.k === 'waste'

  // 1. crapette para fundação
  let m = pick(crap, isFound)
  if (m) return m
  // 2. descarte / pilhas para fundação
  m = pick(waste, isFound)
  if (m) return m
  for (const t of tabs) { m = pick(t, isFound); if (m) return m }
  // 3. crapette para as pilhas próprias (de preferência não vazias)
  m = pick(crap, (d) => isOwnTab(d) && pileAt(g, d).length > 0) || pick(crap, isOwnTab)
  if (m) return m
  // 4. crapette para cima do adversário
  m = pick(crap, isOpp)
  if (m) return m
  // 5. descarte para as pilhas próprias
  m = pick(waste, (d) => isOwnTab(d) && pileAt(g, d).length > 0) || pick(waste, isOwnTab)
  if (m) return m
  // 6. esvaziar uma pilha de uma só carta para outra pilha com carta
  for (const t of tabs) {
    if (pileAt(g, t).length !== 1) continue
    m = pick(t, (d) => isOwnTab(d) && pileAt(g, d).length > 0)
    if (m) return m
  }
  // 7. descarte para cima do adversário
  m = pick(waste, isOpp)
  if (m) return m
  return null
}

// Uma ação do computador (uma jogada ou uma viragem). Devolve texto curto.
export function aiStep(g) {
  if (g.over || g.turn !== 1) return ''
  if (autoPass(g)) return 'computer has no moves'
  if (g.aiMoves < 80) {
    const m = pickAiMove(g)
    if (m) {
      const label = cardLabel(topCard(g, m.from))
      move(g, m.from, m.to)
      g.aiMoves++
      return 'computer plays ' + label
    }
  }
  flip(g)
  return 'computer turns a card'
}
