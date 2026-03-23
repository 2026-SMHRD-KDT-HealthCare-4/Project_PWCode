// src/components/Statistics.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Statistics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 통계 데이터 요청
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('통계 데이터 로드 실패:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>데이터 분석 중...</div>;

  return (
    <div className="statistics-container">
      <h3>통계 및 AI 인사이트</h3>
      <p><strong>수면-감정 상관계수:</strong> {stats.correlation_coefficient}</p>
      <div className="insight-box">
        <strong>AI 인사이트:</strong>
        <p>{stats.insight}</p>
      </div>
    </div>
  );
}