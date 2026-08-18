import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TEAL, MUTED, TYPE, pageWrap, inner, linkStyle } from '../styles'

const NAME = { r: 'rock', p: 'paper', s: 'scissors' }

function wins(player, opponent) {
  return (player === 'r' && opponent === 's')
    || (player === 's' && opponent === 'p')
    || (player === 'p' && opponent === 'r')
}

function play(choice) {
  const options = ['r', 'p', 's']
  const computer = options[Math.floor(Math.random() * options.length)]
  return { choice, computer }
}

export default function RockPaperScissors() {
  const [round, setRound] = useState(null)

  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: TYPE.small, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · rock paper scissors</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: TYPE.title, fontWeight: 'normal', margin: '0 0 8px', letterSpacing: 1 }}>
          rock paper scissors
        </h1>
        <p style={{ color: MUTED, fontSize: TYPE.small, margin: '0 0 40px' }}>
          one round, no accounts, no history
        </p>

        {!round ? (
          <div>
            <p style={{ color: '#aaaaaa', fontSize: TYPE.base, margin: '0 0 16px' }}>
              rock, paper, scissors — pick one.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['r', 'p', 's'].map(c => (
                <a
                  key={c}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setRound(play(c)) }}
                  style={linkStyle}
                >
                  {NAME[c]}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: TYPE.base, margin: '0 0 8px' }}>
              <span style={{ color: '#aaaaaa' }}>you played </span>
              <span style={{ color: TEAL }}>{NAME[round.choice]}</span>
              <span style={{ color: '#aaaaaa' }}> · i played </span>
              <span style={{ color: TEAL }}>{NAME[round.computer]}</span>
            </p>
            <p style={{ fontSize: TYPE.base, margin: '0 0 24px' }}>
              {round.choice === round.computer
                ? <span style={{ color: '#aaaaaa' }}>it's a tie.</span>
                : wins(round.choice, round.computer)
                  ? <span style={{ color: TEAL }}>you won.</span>
                  : <span style={{ color: '#aaaaaa' }}>you lost.</span>
              }
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setRound(null) }}
              style={linkStyle}
            >
              play again
            </a>
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: TYPE.small }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
