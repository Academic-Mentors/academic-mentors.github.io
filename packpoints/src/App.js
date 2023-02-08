import { Home } from './components/Home'
import { AboutPackPoints } from './components/AboutPackPoints'
import { EventCalendar } from './components/EventCalendar'

import { Routes, Route, HashRouter } from 'react-router-dom'




const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/info" element={<AboutPackPoints />}></Route>
          <Route path="/calendar" element={<EventCalendar />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
