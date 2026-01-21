import React, { useState } from 'react';
import './Token.css';
import { getToken } from '../services/api';
import { TokenRequest } from '../types/api';
import { handleError, validate, storage } from '../utils/helpers';

interface TokenProps {
  setToken: (token: string) => void;
}

const Token: React.FC<TokenProps> = ({ setToken }) => {
  const [formData, setFormData] = useState<TokenRequest>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setTokenValue] = useState('');

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
    setSuccess('');
    setTokenValue('');

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
      const response = await getToken(formData);
      const token = response.data.token;
      setTokenValue(token);
      setToken(token);
      storage.set('token', token);
      setSuccess('Token生成成功！');
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setSuccess('Token已复制到剪贴板！');
    }
  };

  return (
    <div className="token-container">
      <h2>获取Token</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="token-form">
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
          {loading ? '获取中...' : '获取Token'}
        </button>
      </form>
      {token && (
        <div className="token-result">
          <h3>生成的Token</h3>
          <div className="token-value">{token}</div>
          <button className="copy-button" onClick={copyToClipboard}>
            复制到剪贴板
          </button>
        </div>
      )}
    </div>
  );
};

export default Token;
