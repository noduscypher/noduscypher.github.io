import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ContentPolicy from './pages/ContentPolicy'
import Library from './pages/Library'
import Network from './pages/Network'
import StartHere from './pages/StartHere'
import Contacts from './pages/Contacts'
import RockPaperScissors from './pages/RockPaperScissors'
import Minesweeper from './pages/Minesweeper'
import Pacman from './pages/Pacman'
import Crapo from './pages/Crapo'
import RnsptHub from './pages/RnsptHub'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/content-policy" element={<ContentPolicy />} />
        <Route path="/library" element={<Library />} />
        <Route path="/network" element={<Network />} />
        <Route path="/start-here" element={<StartHere />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="/minesweeper" element={<Minesweeper />} />
        <Route path="/pacman" element={<Pacman />} />
        <Route path="/crapo" element={<Crapo />} />
        <Route path="/rnspt" element={<RnsptHub />} />
        <Route path="/rnspt/recursos" element={<Navigate to="/rnspt" replace state={{ section: 'comunidade' }} />} />
        <Route path="/rnspt/aderir" element={<Navigate to="/rnspt" replace state={{ section: 'como-funciona' }} />} />
      </Routes>
    </HashRouter>
  )
}
