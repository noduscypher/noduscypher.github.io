import { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner } from '../styles'
import {
  newGame, pileAt, topCard, sameLoc, legalDests, move, flip, autoPass, aiStep,
  isRed, cardLabel, SUITS, RANKS,
} from '../lib/crapoEngine'

const RED = '#e48a8a'
const INK = '#cccccc'
const GAP = 6

// Uma posição do tabuleiro. `card` é a carta do topo (ou null), `count` o
// tamanho da pilha, `back` desenha o verso (baralho de compra).
function Slot({ card, count, back, selected, target, onClick, title }) {
  const clickable = !!onClick
  const base = {
    position: 'relative',
    aspectRatio: '5 / 7',
    minWidth: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontSize: 'clamp(11px, 3.4vw, 17px)',
    lineHeight: 1,
    cursor: clickable ? 'pointer' : 'default',
    userSelect: 'none',
    background: '#181818',
    border: '1px solid #2a2a2a',
    color: INK,
  }
  if (!card && !back) { base.background = 'transparent'; base.border = '1px dashed #262626' }
  if (back && count > 0) {
    base.background = 'repeating-linear-gradient(45deg, #151515 0 4px, #1b1b1b 4px 8px)'
    base.color = MUTED
  }
  if (back && count === 0) { base.background = 'transparent'; base.border = '1px dashed #262626' }
  if (card && isRed(card)) base.color = RED
  if (selected) { base.border = `1px solid ${TEAL}`; base.background = '#10201b' }
  if (target) { base.border = `1px dashed ${TEAL}`; base.background = card ? '#10201b' : '#0d1a16' }

  return (
    <button type="button" title={title} onClick={onClick} disabled={!clickable} style={base}>
      {card ? RANKS[card.r] + SUITS[card.s] : null}
      {count > 1 && (
        <span style={{ position: 'absolute', right: 3, bottom: 2, fontSize: 10, color: '#666' }}>{count}</span>
      )}
      {back && count > 0 && count <= 1 && (
        <span style={{ fontSize: 10 }}>{count}</span>
      )}
    </button>
  )
}

const row = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
  gap: GAP,
}

export default function Crapo() {
  const gRef = useRef(null)
  if (gRef.current === null) gRef.current = newGame()
  const g = gRef.current

  const [tick, bump] = useReducer((n) => n + 1, 0)
  const [sel, setSel] = useState(null)
  const [msg, setMsg] = useState('')
  const [score, setScore] = useState({ w: 0, l: 0, d: 0 })
  const counted = useRef(false)

  function settle() {
    if (g.over && !counted.current) {
      counted.current = true
      setScore((s) => ({
        w: s.w + (g.over.winner === 0 ? 1 : 0),
        l: s.l + (g.over.winner === 1 ? 1 : 0),
        d: s.d + (g.over.winner === -1 ? 1 : 0),
      }))
    }
    bump()
  }

  function newRound() {
    gRef.current = newGame()
    counted.current = false
    setSel(null)
    setMsg('')
    bump()
  }

  // vez do computador: uma ação de cada vez, com pausa
  useEffect(() => {
    if (g.over || g.turn !== 1) return undefined
    const t = setTimeout(() => {
      setMsg(aiStep(g))
      settle()
    }, 520)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const mine = (loc) => loc.p === 0 && (loc.k === 'crap' || loc.k === 'waste' || loc.k === 'tab')
  const dests = sel ? legalDests(g, sel) : []
  const isTarget = (loc) => dests.some((d) => sameLoc(d, loc))

  function press(loc) {
    if (g.over || g.turn !== 0) return
    if (sel) {
      if (sameLoc(sel, loc)) { setSel(null); return }
      if (isTarget(loc)) {
        const label = cardLabel(topCard(g, sel))
        move(g, sel, loc)
        setSel(null)
        setMsg(g.over ? '' : 'played ' + label)
        if (!g.over) autoPass(g)
        settle()
        return
      }
    }
    if (mine(loc) && topCard(g, loc)) setSel(loc)
    else setSel(null)
  }

  function turnCard() {
    if (g.over || g.turn !== 0) return
    setSel(null)
    flip(g)
    if (!g.over && g.turn === 0) setMsg('you can play that card')
    else setMsg('')
    if (!g.over) autoPass(g)
    settle()
  }

  const me = g.players[0]
  const cpu = g.players[1]

  function side(p, interactive) {
    const P = g.players[p]
    const loc = (k, i) => ({ k, p, i })
    return (
      <div style={row}>
        {[0, 1, 2, 3].map((i) => {
          const l = loc('tab', i)
          return (
            <Slot
              key={i}
              card={topCard(g, l)}
              count={pileAt(g, l).length}
              selected={sameLoc(sel, l)}
              target={isTarget(l)}
              onClick={interactive ? () => press(l) : (isTarget(l) ? () => press(l) : undefined)}
            />
          )
        })}
        <div />
        {(() => {
          const l = loc('crap')
          return (
            <Slot
              card={topCard(g, l)}
              count={P.crap.length}
              selected={sameLoc(sel, l)}
              target={isTarget(l)}
              title="crapette pile"
              onClick={interactive || isTarget(l) ? () => press(l) : undefined}
            />
          )
        })()}
        {(() => {
          const l = loc('waste')
          return (
            <Slot
              card={topCard(g, l)}
              count={P.waste.length}
              selected={sameLoc(sel, l)}
              target={isTarget(l)}
              title="waste"
              onClick={interactive || isTarget(l) ? () => press(l) : undefined}
            />
          )
        })()}
        <Slot
          back
          count={P.stock.length}
          title="stock"
          onClick={interactive && g.turn === 0 && !g.over ? turnCard : undefined}
        />
      </div>
    )
  }

  let status
  if (g.over) {
    status = g.over.winner === 0 ? 'you cleared your crapette pile.'
      : g.over.winner === 1 ? 'the computer cleared its pile.'
      : 'blocked · draw.'
  } else if (g.turn === 0) {
    status = msg && !msg.startsWith('computer') ? msg : 'your turn'
  } else {
    status = msg.startsWith('computer') ? msg : 'computer is playing…'
  }

  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · crapô</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          crapô
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 32px' }}>
          crapette · you vs the computer · no accounts, no history
        </p>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16, fontSize: TYPE.base }}>
          <a href="#" onClick={(e) => { e.preventDefault(); newRound() }} style={{ color: TEAL, textDecoration: 'none' }}>
            new game
          </a>
          <span style={{ color: MUTED }}>
            you {score.w} · computer {score.l}{score.d ? ` · draws ${score.d}` : ''}
          </span>
        </div>

        <div style={{ background: '#0a0a0a', border: '1px solid #222', padding: 10, display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div>
            <p style={{ color: MUTED, fontSize: 13, margin: '0 0 6px' }}>computer · crapette {cpu.crap.length}</p>
            {side(1, false)}
          </div>

          <div>
            <p style={{ color: MUTED, fontSize: 13, margin: '0 0 6px' }}>foundations · ace to king, by suit</p>
            <div style={row}>
              {g.found.map((pile, i) => {
                const l = { k: 'found', i }
                return (
                  <Slot
                    key={i}
                    card={topCard(g, l)}
                    count={pile.length}
                    target={isTarget(l)}
                    onClick={isTarget(l) ? () => press(l) : undefined}
                  />
                )
              })}
            </div>
          </div>

          <div>
            {side(0, true)}
            <p style={{ color: MUTED, fontSize: 13, margin: '6px 0 0' }}>you · crapette {me.crap.length}</p>
          </div>

        </div>

        <p style={{ color: g.over ? TEAL : MUTED, fontSize: TYPE.small, margin: '16px 0 0', minHeight: 28 }}>
          {status}
        </p>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0' }}>
          tap a card, then tap where it goes · tap your stock to turn a card
        </p>

        <details style={{ marginTop: 24, color: MUTED, fontSize: TYPE.small, lineHeight: 1.75 }}>
          <summary style={{ cursor: 'pointer', color: TEAL, listStyle: 'none' }}>rules</summary>
          <div style={{ marginTop: 8 }}>
            <p style={{ margin: '0 0 6px' }}>two decks. each side has a crapette pile of 13, four piles, a stock and a waste. first to clear the crapette pile wins.</p>
            <p style={{ margin: '0 0 6px' }}>foundations: ace up to king, same suit.</p>
            <p style={{ margin: '0 0 6px' }}>your four piles: build down, alternating colours, one card at a time. any card can go on an empty pile.</p>
            <p style={{ margin: '0 0 6px' }}>on the other side's crapette or waste: same suit, one up or one down.</p>
            <p style={{ margin: '0 0 6px' }}>turn a card from your stock when you are done. if it can be played the turn goes on, otherwise it passes. when the stock runs out, the waste becomes the stock again.</p>
            <p style={{ margin: 0 }}>this version has no crapette call or penalty. if nobody makes progress for a while it is a draw.</p>
          </div>
        </details>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
