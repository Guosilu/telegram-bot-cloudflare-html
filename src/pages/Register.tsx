import React, { useState } from 'react';
import './Register.css';
import { register } from '../services/api';
import { RegisterRequest } from '../types/api';
import { handleError, validate } from '../utils/helpers';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    bot_user_id: 0,
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 验证表单
    if (!validate.username(formData.username)) {
      setError('用户名长度必须在3-20之间');
      return;
    }
    if (!validate.password(formData.password)) {
      setError('密码长度必须大于等于6');
      return;
    }
    if (!validate.botUserId(formData.bot_user_id)) {
      setError('Bot用户ID必须大于0');
      return;
    }

    setLoading(true);
    try {
      const response = await register(formData);
      setSuccess('注册成功！');
      console.log('注册成功:', response);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>用户注册</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="bot_user_id">Bot用户ID</label>
          <input
            type="number"
            id="bot_user_id"
            name="bot_user_id"
            value={formData.bot_user_id}
            onChange={handleChange}
            required
          />
        </div>
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
          {loading ? '注册中...' : '注册'}
        </button>
      </form>
    </div>
  );
};

export default Register;
