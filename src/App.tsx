import MainCol from './components/MainCol'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <nav className="sidebar">
        <Link to='/' className="sidebar-element">Home</Link>
        <Link to='/' className="sidebar-element">Explore</Link>
        <Link to='/' className="sidebar-element">Profile</Link>
        etc
      </nav>
      <Routes>
        <Route path='/' element={<MainCol />} />
      </Routes>
    </div>
  )
}

export default App
