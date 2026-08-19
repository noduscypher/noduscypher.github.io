import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner } from '../styles'

const MAZE = [
  '###################',
  '#........#........#',
  '#.##.###.#.###.##.#',
  '#o##.###.#.###.##o#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '#......#.#.#......#',
  '#.####.#.#.#.####.#',
  '#.................#',
  '#.#.##.#####.##.#.#',
  '#...#....#....#...#',
  '###.#.##.#.##.#.###',
  '#.....#.....#.....#',
  '#.###.#.###.#.###.#',
  '#o..............o.#',
  '#.................#',
  '###################',
]

const COLS = MAZE[0].length
const ROWS = MAZE.length
const CELL = 18
const SPEED = 3
const GHOST_SPEED = 2
const TICK_MS = 55
const POWER_MS = 6000
const CHASE_CHANCE = 0.35
const RESPAWN_GRACE_MS = 1200
const GHOST_COLORS = ['#f08080', '#6fb3f0', '#b39ddb']

const PLAYER_SPAWN = { x: 9, y: 10 }
const GHOST_SPAWNS = [
  { x: 1, y: 1 },
  { x: 10, y: 1 },
  { x: 17, y: 1 },
]

function isWall(x, y) {
  if (y < 0 || y >= ROWS || x < 0 || x >= COLS) return true
  return MAZE[y][x] === '#'
}

const DIRS = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
]

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

export default function Pacman() {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [status, setStatus] = useState('playing')

  function buildPellets() {
    const pellets = new Set()
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const c = MAZE[y][x]
        if (c === '.' || c === 'o') pellets.add(x + ',' + y)
      }
    }
    return pellets
  }

  function newGame() {
    gameRef.current = {
      player: { px: PLAYER_SPAWN.x * CELL, py: PLAYER_SPAWN.y * CELL, dir: null, nextDir: null, lastDir: { dx: 1, dy: 0 } },
      ghosts: GHOST_SPAWNS.map((s, i) => ({ px: s.x * CELL, py: s.y * CELL, dir: null, color: GHOST_COLORS[i] })),
      pellets: buildPellets(),
      poweredUntil: 0,
      safeUntil: Date.now() + RESPAWN_GRACE_MS,
      tick: 0,
      over: false,
    }
    setScore(0)
    setLives(3)
    setStatus('playing')
  }

  function loseLife() {
    const g = gameRef.current
    g.player.px = PLAYER_SPAWN.x * CELL
    g.player.py = PLAYER_SPAWN.y * CELL
    g.player.dir = null
    g.player.nextDir = null
    g.ghosts.forEach((gh, i) => {
      gh.px = GHOST_SPAWNS[i].x * CELL
      gh.py = GHOST_SPAWNS[i].y * CELL
      gh.dir = null
    })
    g.safeUntil = Date.now() + RESPAWN_GRACE_MS
    setLives(l => {
      const next = l - 1
      if (next <= 0) {
        g.over = true
        setStatus('lost')
      }
      return next
    })
  }

  function stepPlayer() {
    const p = gameRef.current.player
    const alignedX = p.px % CELL === 0
    const alignedY = p.py % CELL === 0
    if (alignedX && alignedY) {
      const cx = p.px / CELL, cy = p.py / CELL
      if (p.nextDir && !isWall(cx + p.nextDir.dx, cy + p.nextDir.dy)) {
        p.dir = p.nextDir
      }
      if (p.dir && isWall(cx + p.dir.dx, cy + p.dir.dy)) {
        p.dir = null
      }
      if (p.dir) p.lastDir = p.dir
    }
    if (p.dir) {
      p.px += p.dir.dx * SPEED
      p.py += p.dir.dy * SPEED
    }
  }

  function stepGhost(gh) {
    const alignedX = gh.px % CELL === 0
    const alignedY = gh.py % CELL === 0
    const g = gameRef.current
    const frightened = Date.now() < g.poweredUntil
    if (alignedX && alignedY) {
      const cx = gh.px / CELL, cy = gh.py / CELL
      let options = DIRS.filter(d => !isWall(cx + d.dx, cy + d.dy))
      if (gh.dir) {
        const reverse = options.filter(d => !(d.dx === -gh.dir.dx && d.dy === -gh.dir.dy))
        if (reverse.length > 0) options = reverse
      }
      if (options.length === 0) options = DIRS.filter(d => !isWall(cx + d.dx, cy + d.dy))

      const target = { x: g.player.px / CELL, y: g.player.py / CELL }
      const roll = Math.random()
      if (roll < CHASE_CHANCE) {
        options = options.slice().sort((a, b) => {
          const da = dist(cx + a.dx, cy + a.dy, target.x, target.y)
          const db = dist(cx + b.dx, cy + b.dy, target.x, target.y)
          return frightened ? db - da : da - db
        })
        gh.dir = options[0]
      } else {
        gh.dir = options[Math.floor(Math.random() * options.length)]
      }
    }
    if (gh.dir) {
      gh.px += gh.dir.dx * GHOST_SPEED
      gh.py += gh.dir.dy * GHOST_SPEED
    }
  }

  function tick() {
    const g = gameRef.current
    if (!g || g.over) return
    g.tick++
    stepPlayer()
    g.ghosts.forEach(stepGhost)

    const p = g.player
    if (p.px % CELL === 0 && p.py % CELL === 0) {
      const key = (p.px / CELL) + ',' + (p.py / CELL)
      if (g.pellets.has(key)) {
        const isPower = MAZE[p.py / CELL][p.px / CELL] === 'o'
        g.pellets.delete(key)
        setScore(s => s + (isPower ? 50 : 10))
        if (isPower) g.poweredUntil = Date.now() + POWER_MS
        if (g.pellets.size === 0) {
          g.over = true
          setStatus('won')
        }
      }
    }

    const frightened = Date.now() < g.poweredUntil
    const safe = Date.now() < g.safeUntil
    const pcx = p.px + CELL / 2, pcy = p.py + CELL / 2
    for (const gh of (safe ? [] : g.ghosts)) {
      const gcx = gh.px + CELL / 2, gcy = gh.py + CELL / 2
      if (dist(pcx, pcy, gcx, gcy) < CELL * 0.6) {
        if (frightened) {
          const idx = g.ghosts.indexOf(gh)
          gh.px = GHOST_SPAWNS[idx].x * CELL
          gh.py = GHOST_SPAWNS[idx].y * CELL
          gh.dir = null
          setScore(s => s + 50)
        } else {
          loseLife()
          break
        }
      }
    }

    draw()
  }

  function draw() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const g = gameRef.current
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#222222'
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (MAZE[y][x] === '#') ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
      }
    }

    const pulse = Math.sin(g.tick / 8) > 0
    g.pellets.forEach(key => {
      const [x, y] = key.split(',').map(Number)
      const isPower = MAZE[y][x] === 'o'
      ctx.fillStyle = TEAL
      ctx.beginPath()
      const r = isPower ? (pulse ? 5 : 4) : 2
      ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, r, 0, Math.PI * 2)
      ctx.fill()
    })

    const frightened = Date.now() < g.poweredUntil
    g.ghosts.forEach(gh => {
      const cx = gh.px + CELL / 2, cy = gh.py + CELL / 2
      const r = CELL / 2 - 2
      ctx.fillStyle = frightened ? '#3a4a6b' : gh.color
      ctx.beginPath()
      ctx.arc(cx, cy - 1, r, Math.PI, 0)
      ctx.lineTo(cx + r, cy + r)
      for (let i = 0; i < 3; i++) {
        const bx = cx + r - (i * 2 * r) / 2.5
        ctx.lineTo(bx, cy + r - (i % 2 === 0 ? 0 : 4))
      }
      ctx.lineTo(cx - r, cy + r)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#0a0a0a'
      ctx.beginPath()
      ctx.arc(cx - 3, cy - 2, 1.6, 0, Math.PI * 2)
      ctx.arc(cx + 3, cy - 2, 1.6, 0, Math.PI * 2)
      ctx.fill()
    })

    const p = g.player
    const cx = p.px + CELL / 2, cy = p.py + CELL / 2
    const r = CELL / 2 - 2
    const facing = p.dir || p.lastDir
    const angle = Math.atan2(facing.dy, facing.dx)
    const mouth = p.dir ? (Math.floor(g.tick / 3) % 2 === 0 ? 0.26 : 0.05) : 0.26
    ctx.fillStyle = TEAL
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, angle + mouth * Math.PI, angle - mouth * Math.PI + 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  useEffect(() => {
    newGame()
    draw()

    function onKey(e) {
      const map = {
        ArrowRight: { dx: 1, dy: 0 }, d: { dx: 1, dy: 0 },
        ArrowLeft: { dx: -1, dy: 0 }, a: { dx: -1, dy: 0 },
        ArrowDown: { dx: 0, dy: 1 }, s: { dx: 0, dy: 1 },
        ArrowUp: { dx: 0, dy: -1 }, w: { dx: 0, dy: -1 },
      }
      const d = map[e.key]
      if (d) {
        e.preventDefault()
        if (gameRef.current) gameRef.current.player.nextDir = d
      }
    }
    window.addEventListener('keydown', onKey)
    const interval = setInterval(tick, TICK_MS)

    return () => {
      window.removeEventListener('keydown', onKey)
      clearInterval(interval)
    }
  }, [])

  function press(dx, dy) {
    if (gameRef.current) gameRef.current.player.nextDir = { dx, dy }
  }

  const dpadBtn = {
    width: 40, height: 36,
    background: '#0a0a0a',
    color: '#cccccc',
    border: '1px solid #333',
    borderRadius: 3,
    fontSize: 15,
    cursor: 'pointer',
  }

  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · pacman</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          pacman
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 32px' }}>
          arrow keys or wasd · no accounts, no history
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, fontSize: TYPE.base, flexWrap: 'wrap' }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); newGame() }}
            style={{ color: TEAL, textDecoration: 'none' }}
          >
            new game
          </a>
          <span style={{ color: MUTED }}>score {score}</span>
          <span style={{ color: MUTED }}>lives {Math.max(lives, 0)}</span>
          {status === 'lost' && <span style={{ color: '#f08080' }}>game over.</span>}
          {status === 'won' && <span style={{ color: TEAL }}>cleared.</span>}
        </div>

        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          style={{ background: '#0a0a0a', border: '1px solid #222', maxWidth: '100%' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gridTemplateRows: 'repeat(2, 36px)', gap: 4, marginTop: 16 }}>
          <div />
          <button style={dpadBtn} onClick={() => press(0, -1)} aria-label="up">↑</button>
          <div />
          <button style={dpadBtn} onClick={() => press(-1, 0)} aria-label="left">←</button>
          <button style={dpadBtn} onClick={() => press(0, 1)} aria-label="down">↓</button>
          <button style={dpadBtn} onClick={() => press(1, 0)} aria-label="right">→</button>
        </div>

        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '16px 0 0' }}>
          large dots turn the ghosts vulnerable for a few seconds
        </p>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
