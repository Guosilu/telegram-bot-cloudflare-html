import React from 'react';
import './Navbar.css';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const navItems = [
    { id: 'token', label: '获取Token' },
    { id: 'userCounts', label: '用户次数' },
    { id: 'aiAnalysis', label: 'AI分析' },
    { id: 'aiDetailedAnalysis', label: 'AI详细分析' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Telegram Bot API</h1>
      </div>
      <ul className="navbar-menu">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`navbar-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <button
            className="navbar-item logout-button"
            onClick={onLogout}
          >
            退出登录
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
