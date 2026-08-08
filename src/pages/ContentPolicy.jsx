import { Link } from 'react-router-dom'
import { TEAL, MUTED, pageWrap, inner } from '../styles'

const sections = [
  {
    title: 'what is here',
    body: 'rawmesh hosts two kinds of material: work made here, and work mirrored from elsewhere. They are licensed differently. This page says which is which, so anything you take from this node can be reused without guessing.\n\nThe collection is interdisciplinary — sciences, medicine, reference, practical knowledge. It is an archive, not a curriculum and not a clinic. Read the next section before you act on anything in it.',
  },
  {
    title: 'use and limits',
    body: 'This node archives knowledge. It does not give advice.\n\nMaterial here — medical, scientific, technical or otherwise — is provided for reference, study and preservation. It is not professional advice.\n\n· Nothing here replaces a clinician who can examine you.\n· Mirrors are snapshots. Check the mirror date before relying on anything time-sensitive, especially drugs, doses and protocols.\n· Inclusion is not endorsement.\n· Scientific material here has not been peer reviewed by me.\n· In an emergency, seek help by the fastest means available.\n\nYou are an adult on a mesh network. What you do with an archive is yours to decide, and yours to carry.',
  },
  {
    title: 'my own work',
    body: 'Pages, notes, writing and documentation made on this node are released under Creative Commons BY-SA 4.0.\n\nYou may copy, mirror, translate, remix and build on it, commercially or not. Credit rawmesh and release derivative work under the same licence.\n\nfull text: creativecommons.org/licenses/by-sa/4.0\ncode — per-repository licence: github.com/noduscypher\nmusic — per-release terms: bandcamp.com/noduscypher',
  },
  {
    title: 'mirrored work',
    body: 'Nothing mirrored here is mine, and nothing mirrored here is relicensed. Each item keeps the licence it arrived with.\n\nMaterial here arrives under a range of terms, among them:\n· Creative Commons licences\n· public domain and expired copyright\n· GNU FDL and other free documentation licences\n· open textbook and open access licences',
  },
  {
    title: 'what this node keeps',
    body: '· no analytics, no trackers, no cookies, no third parties\n· no accounts, no profiles, no reading history\n· LXMF messages you send me are stored locally and read by me. Ask and I delete them.',
  },
  {
    title: 'mirroring rawmesh',
    body: 'Copying this node is the point, not a favour.\n· mirror freely, in whole or in part — no permission needed\n· keep the licences and attribution attached to each item\n· carry this policy, or write your own honest one\n· date your mirror',
  },
  {
    title: 'corrections and removals',
    body: 'If something here is misattributed, mislicensed, or hosted against the wishes of whoever holds the rights — tell me.\n\nWrite to the LXMF address on the index page. Rights holders: say what you hold and I will take it down.',
  },
]

export default function ContentPolicy() {
  return (
    <div style={pageWrap}>
      <div style={inner}>

        <p style={{ color: MUTED, fontSize: 13, marginBottom: 32 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none' }}>rawmesh</Link>
          <span style={{ color: MUTED }}> · content policy</span>
        </p>

        <h1 style={{ color: '#cccccc', fontSize: 18, fontWeight: 'normal', margin: '0 0 40px', letterSpacing: 1 }}>
          content policy
        </h1>

        {sections.map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <p style={{ color: TEAL, fontSize: 13, margin: '0 0 6px' }}>{title}</p>
            <p style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>{body}</p>
          </div>
        ))}

        <div style={{ marginTop: 40 }}>
          <Link to="/" style={{ color: TEAL, textDecoration: 'none', fontSize: 13 }}>← back</Link>
        </div>

      </div>
    </div>
  )
}
