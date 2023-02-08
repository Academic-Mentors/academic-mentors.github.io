import { Home } from './components/Home'
import { AboutPackPoints } from './components/AboutPackPoints'

import { Routes, Route, HashRouter } from 'react-router-dom'




const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/info" element={<AboutPackPoints />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
