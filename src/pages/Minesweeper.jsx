import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner } from '../styles'

const W = 9, H = 9, MINES = 10
const NUM_COLOR = { 1: '#6fb3f0', 2: '#7ed07e', 3: '#f08080', 4: '#b39ddb', 5: '#d2a679', 6: '#7ed7d7', 7: '#cccccc', 8: '#999999' }

function emptyBoard() { return new Array(W * H).fill(0) }
function emptyFlags() { return new Array(W * H).fill(false) }

function neighbors(i) {
  const x = i % W, y = Math.floor(i / W)
  const out = []
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx, ny = y + dy
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) out.push(ny * W + nx)
    }
  }
  return out
}

function placeMines(safeIdx) {
  const board = emptyBoard()
  let placed = 0
  while (placed < MINES) {
    const i = Math.floor(Math.random() * W * H)
    if (i === safeIdx || board[i] === -1) continue
    board[i] = -1
    placed++
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i] === -1) continue
    board[i] = neighbors(i).filter(n => board[n] === -1).length
  }
  return board
}

function floodReveal(board, rev, flagged, i) {
  if (rev[i] || flagged[i]) return
  rev[i] = true
  if (board[i] === 0) neighbors(i).forEach(n => floodReveal(board, rev, flagged, n))
}

export default function Minesweeper() {
  const [board, setBoard] = useState(emptyBoard)
  const [revealed, setRevealed] = useState(() => new Array(W * H).fill(false))
  const [flagged, setFlagged] = useState(emptyFlags)
  const [status, setStatus] = useState('playing')
  const started = useRef(false)

  function reset() {
    setBoard(emptyBoard())
    setRevealed(new Array(W * H).fill(false))
    setFlagged(emptyFlags())
    setStatus('playing')
    started.current = false
  }

  function reveal(i) {
    if (status !== 'playing' || flagged[i] || revealed[i]) return

    let b = board
    if (!started.current) {
      b = placeMines(i)
      setBoard(b)
      started.current = true
    }

    const rev = revealed.slice()
    if (b[i] === -1) {
      rev[i] = true
      for (let j = 0; j < b.length; j++) if (b[j] === -1) rev[j] = true
      setRevealed(rev)
      setStatus('lost')
      return
    }

    floodReveal(b, rev, flagged, i)
    setRevealed(rev)

    if (b.every((v, idx) => v === -1 || rev[idx])) setStatus('won')
  }

  function toggleFlag(e, i) {
    e.preventDefault()
    if (status !== 'playing' || revealed[i]) return
    const fl = flagged.slice()
    fl[i] = !fl[i]
    setFlagged(fl)
  }

  const flagCount = flagged.filter(Boolean).length

  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · minesweeper</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          minesweeper
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 32px' }}>
          9×9, 10 mines · no accounts, no history
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, fontSize: TYPE.base }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); reset() }}
            style={{ color: TEAL, textDecoration: 'none' }}
          >
            new game
          </a>
          <span style={{ color: MUTED }}>mines {MINES - flagCount}</span>
          {status === 'lost' && <span style={{ color: '#f08080' }}>boom.</span>}
          {status === 'won' && <span style={{ color: TEAL }}>cleared.</span>}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${W}, 28px)`,
            gridTemplateRows: `repeat(${H}, 28px)`,
            gap: 2,
            background: '#0a0a0a',
            border: '1px solid #222',
            padding: 8,
            width: 'fit-content',
          }}
        >
          {board.map((v, i) => {
            const isRevealed = revealed[i]
            const isFlagged = flagged[i]
            const isMine = v === -1
            let content = ''
            let color = '#cccccc'
            if (isRevealed) {
              if (isMine) content = '*'
              else if (v > 0) { content = v; color = NUM_COLOR[v] }
            } else if (isFlagged) {
              content = '>'
              color = TEAL
            }
            return (
              <div
                key={i}
                onClick={() => reveal(i)}
                onContextMenu={(e) => toggleFlag(e, i)}
                style={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isRevealed ? (isMine ? '#3a1414' : '#050505') : '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  fontSize: 14,
                  color,
                  cursor: isRevealed ? 'default' : 'pointer',
                  userSelect: 'none',
                }}
              >
                {content}
              </div>
            )
          })}
        </div>

        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '16px 0 0' }}>
          left click reveals · right click flags
        </p>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
