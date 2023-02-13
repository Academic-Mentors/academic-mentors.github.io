import { Home } from './components/Home'
import { AboutPackPoints } from './components/AboutPackPoints'
import { EventCalendar } from './components/EventCalendar'
import { LandingPage } from './components/LandingPage'

import { Routes, Route, HashRouter } from 'react-router-dom'




const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/leaderboard" element={<Home />}></Route>
          <Route path="/info" element={<AboutPackPoints />}></Route>
          <Route path="/calendar" element={<EventCalendar />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
