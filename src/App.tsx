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

  // 未登录状态下只能访问登录和注册页面
  if (!token && currentPage !== 'login' && currentPage !== 'register') {
    setCurrentPage('login')
  }

  return (
    <div className="App">
      {/* 只有登录后才显示导航栏 */}
      {token && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <div className="container">
        {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <Login setToken={setToken} setCurrentPage={setCurrentPage} />}
        {token && currentPage === 'token' && <Token setToken={setToken} />}
        {token && currentPage === 'userCounts' && <UserCounts token={token} />}
        {token && currentPage === 'aiAnalysis' && <AiAnalysis token={token} />}
        {token && currentPage === 'aiDetailedAnalysis' && <AiDetailedAnalysis token={token} />}
      </div>
    </div>
  )
}

export default App
