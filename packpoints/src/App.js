import { Home } from './components/Home'
import { AboutPackPoints } from './components/AboutPackPoints'

import { Routes, Route, BrowserRouter } from 'react-router-dom'




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/packpoints" element={<Home />}></Route>
          <Route path="/packpoints/info" element={<AboutPackPoints />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
