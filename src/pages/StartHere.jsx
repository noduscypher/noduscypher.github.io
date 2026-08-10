import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

const APP_NAME = { color: '#cccccc' }

export default function StartHere() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 16, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · start here</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 22, fontWeight: 'normal', margin: '0 0 6px', letterSpacing: 1 }}>
          start here
        </h1>
        <p style={{ color: '#555', fontSize: 15, margin: '0 0 48px', letterSpacing: '0.05em' }}>
          new to this? good place to be.
        </p>

        {/* what is reticulum */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: TEAL, fontSize: 16, margin: '0 0 8px' }}>what is reticulum?</p>
          <p style={{ color: '#aaaaaa', fontSize: 17, lineHeight: 1.75, margin: '0 0 10px', whiteSpace: 'pre-line' }}>
            {'most networks you use daily — the internet, mobile data, messaging apps — run through servers owned by companies. those companies can see who you talk to, slow your traffic, shut down, or simply disappear.\n\nreticulum works differently. it is a way for devices to communicate directly and privately, with no company in the middle, no phone number, no sign-up required. it runs over the internet, but also over radio, wi-fi, and other physical links — so it keeps working when ordinary networks fail or are cut off.\n\nevery message is encrypted automatically, end-to-end. you are identified by a cryptographic key that only you hold. not a username. not an account. a key.'}
          </p>
        </div>

        {/* what is this node */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: TEAL, fontSize: 16, margin: '0 0 8px' }}>what is this node, for you?</p>
          <p style={{ color: '#aaaaaa', fontSize: 17, lineHeight: 1.75, margin: '0 0 8px' }}>
            rawmesh is a node that is always on. it does two things:
          </p>
          {[
            { label: 'meeting point.', desc: 'point your app at this node and you can reach people and pages across the network through it.' },
            { label: 'mailbox.', desc: 'if someone sends you a message while your device is off or out of range, this node holds it and delivers it when you are back.' },
          ].map(({ label, desc }) => (
            <div key={label} style={{ marginBottom: 6, paddingLeft: 12, fontSize: 17, color: '#aaaaaa', lineHeight: 1.75 }}>
              <span style={{ color: '#555' }}>— </span>
              <span style={APP_NAME}>{label}</span>
              {' '}{desc}
            </div>
          ))}
        </div>

        {/* what do i need */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: TEAL, fontSize: 16, margin: '0 0 8px' }}>what do i need?</p>
          <p style={{ color: '#aaaaaa', fontSize: 17, lineHeight: 1.75, margin: '0 0 8px' }}>
            just an app on your phone or computer:
          </p>
          {[
            { label: 'sideband', desc: 'android, ios, and desktop. the simplest starting point.', guide: 'https://github.com/noduscypher/sideband-setup' },
            { label: 'columba', desc: 'native android app (ios in development). messaging and voice calls over bluetooth, wi-fi, or lora.', guide: 'https://github.com/noduscypher/columba-manual' },
            { label: 'meshchatx', desc: 'desktop client with messaging and a page browser.' },
            { label: 'nomadnet', desc: 'terminal interface, for those comfortable with a command line.' },
          ].map(({ label, desc, guide }) => (
            <div key={label} style={{ marginBottom: 6, paddingLeft: 12, fontSize: 17, color: '#aaaaaa', lineHeight: 1.75 }}>
              <span style={{ color: '#555' }}>— </span>
              <span style={APP_NAME}>{label}</span>
              {' · '}{desc}
              {guide && <><span style={{ color: '#444' }}> · </span><a href={guide} target="_blank" rel="noopener noreferrer" style={{ color: TEAL, textDecoration: 'none' }}>guide</a></>}
            </div>
          ))}
          <p style={{ color: '#aaaaaa', fontSize: 17, lineHeight: 1.75, margin: '10px 0 0' }}>
            install any one of them. your identity is created automatically the first time it starts. no registration, no email.
          </p>
        </div>

        {/* first three steps */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: TEAL, fontSize: 16, margin: '0 0 8px' }}>first three steps</p>
          {[
            'install a reticulum app. it creates your identity on first launch.',
            'add this node so your app connects through it.',
            'browse back to this page from inside your app, or send a message. you are on the network.',
          ].map((step, i) => (
            <div key={i} style={{ marginBottom: 8, paddingLeft: 20, fontSize: 17, color: '#aaaaaa', lineHeight: 1.75, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: '#444' }}>{i + 1}.</span>
              {step}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 16 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
