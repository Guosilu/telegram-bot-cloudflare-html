import React, { useState } from 'react';
import './AiAnalysis.css';
import { getAiAnalysis } from '../services/api';
import { handleError } from '../utils/helpers';

interface AiAnalysisProps {
  token: string;
}

const AiAnalysis: React.FC<AiAnalysisProps> = ({ token }) => {
  const [cryptoType, setCryptoType] = useState('BTC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAnalysis('');

    if (!token) {
      setError('请先登录获取Token');
      return;
    }

    setLoading(true);
    try {
      const response = await getAiAnalysis(token, cryptoType);
      setAnalysis(response.data.analysis.analysis);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-analysis-container">
      <h2>AI分析</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="ai-analysis-form">
        <div className="form-group">
          <label htmlFor="crypto_type">加密货币类型</label>
          <select
            id="crypto_type"
            value={cryptoType}
            onChange={(e) => setCryptoType(e.target.value)}
            required
          >
            <option value="BTC">比特币 (BTC)</option>
            <option value="ETH">以太坊 (ETH)</option>
            <option value="BNB">币安币 (BNB)</option>
            <option value="SOL">索拉纳 (SOL)</option>
            <option value="ADA">卡尔达诺 (ADA)</option>
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? '分析中...' : '开始分析'}
        </button>
      </form>
      {analysis && (
        <div className="analysis-result">
          <h3>分析结果</h3>
          <div className="analysis-content">{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default AiAnalysis;
