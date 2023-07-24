
import './App.css'
import "./css/MainCol.css"
import { Route, Routes, Link } from 'react-router-dom'
import Profile from './components/Profile'
import Postcontainer from './components/Postcontainer'

function App() {

  //dynamic route for profiles

  return (
    <div className="App">
      <nav className="sidebar">
        <Link to='/' className="sidebar-element">Home</Link>
        <Link to='/' className="sidebar-element">Explore</Link>
        <Link to='/profile' className="sidebar-element">Profile</Link>
        etc
      </nav>
      <main id='maincol'>
        <Routes>
          <Route path='/' element={<Postcontainer />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
