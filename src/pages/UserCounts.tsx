import React, { useState, useEffect, useCallback } from 'react';
import './UserCounts.css';
import { getUserCounts } from '../services/api';
import { handleError } from '../utils/helpers';

interface UserCountsProps {
  token: string;
}

const UserCounts: React.FC<UserCountsProps> = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [counts, setCounts] = useState({
    ai_analysis_count: 0,
    ai_detailed_analysis_count: 0,
  });

  const fetchUserCounts = useCallback(async () => {
    if (!token) {
      setError('请先登录获取Token');
      return;
    }

    setLoading(true);
    try {
      const response = await getUserCounts(token);
      setCounts(response.data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserCounts();
  }, [fetchUserCounts]);

  return (
    <div className="user-counts-container">
      <h2>获取用户次数</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="counts-card">
        <h3>用户次数统计</h3>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          <div className="counts-grid">
            <div className="count-item">
              <div className="count-label">AI分析次数</div>
              <div className="count-value">{counts.ai_analysis_count}</div>
            </div>
            <div className="count-item">
              <div className="count-label">AI详细分析次数</div>
              <div className="count-value">{counts.ai_detailed_analysis_count}</div>
            </div>
          </div>
        )}
        <button className="refresh-button" onClick={fetchUserCounts} disabled={loading}>
          {loading ? '刷新中...' : '刷新'}
        </button>
      </div>
    </div>
  );
};

export default UserCounts;
