import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Token from './pages/Token'
import UserCounts from './pages/UserCounts'
import AiAnalysis from './pages/AiAnalysis'
import AiDetailedAnalysis from './pages/AiDetailedAnalysis'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [token, setToken] = useState<string>('')

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container">
        {currentPage === 'register' && <Register />}
        {currentPage === 'login' && <Login setToken={setToken} setCurrentPage={setCurrentPage} />}
        {currentPage === 'token' && <Token setToken={setToken} />}
        {currentPage === 'userCounts' && <UserCounts token={token} />}
        {currentPage === 'aiAnalysis' && <AiAnalysis token={token} />}
        {currentPage === 'aiDetailedAnalysis' && <AiDetailedAnalysis token={token} />}
      </div>
    </div>
  )
}

export default App
