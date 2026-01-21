import React, { useState } from 'react';
import './AiDetailedAnalysis.css';
import { getAiDetailedAnalysis } from '../services/api';
import { handleError } from '../utils/helpers';

interface AiDetailedAnalysisProps {
  token: string;
}

const AiDetailedAnalysis: React.FC<AiDetailedAnalysisProps> = ({ token }) => {
  const [cryptoType, setCryptoType] = useState('BTC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailedAnalysis, setDetailedAnalysis] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDetailedAnalysis('');

    if (!token) {
      setError('请先登录获取Token');
      return;
    }

    setLoading(true);
    try {
      const response = await getAiDetailedAnalysis(token, cryptoType);
      setDetailedAnalysis(response.data.analysis.detailed_analysis);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-detailed-analysis-container">
      <h2>AI详细分析</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="ai-detailed-analysis-form">
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
          {loading ? '分析中...' : '开始详细分析'}
        </button>
      </form>
      {detailedAnalysis && (
        <div className="detailed-analysis-result">
          <h3>详细分析结果</h3>
          <div className="detailed-analysis-content">{detailedAnalysis}</div>
        </div>
      )}
    </div>
  );
};

export default AiDetailedAnalysis;
