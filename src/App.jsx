import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignalNotes from './pages/SignalNotes'
import ContentPolicy from './pages/ContentPolicy'
import Library from './pages/Library'
import Network from './pages/Network'
import StartHere from './pages/StartHere'
import Contacts from './pages/Contacts'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signal-notes" element={<SignalNotes />} />
        <Route path="/content-policy" element={<ContentPolicy />} />
        <Route path="/library" element={<Library />} />
        <Route path="/network" element={<Network />} />
        <Route path="/start-here" element={<StartHere />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </HashRouter>
  )
}
