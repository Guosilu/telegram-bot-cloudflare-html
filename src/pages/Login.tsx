import React, { useState } from 'react';
import './Login.css';
import { login } from '../services/api';
import { LoginRequest } from '../types/api';
import { handleError, validate, storage } from '../utils/helpers';

interface LoginProps {
  setToken: (token: string) => void;
  setCurrentPage: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setCurrentPage }) => {
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 验证表单
    if (!validate.username(formData.username)) {
      setError('用户名长度必须在3-20之间');
      return;
    }
    if (!validate.password(formData.password)) {
      setError('密码长度必须大于等于6');
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData);
      const token = response.data.token;
      setToken(token);
      storage.set('token', token);
      setCurrentPage('userCounts');
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>用户登录</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      <div className="register-link">
        还没有账号？<button onClick={() => setCurrentPage('register')} className="link-button">去注册</button>
      </div>
    </div>
  );
};

export default Login;
