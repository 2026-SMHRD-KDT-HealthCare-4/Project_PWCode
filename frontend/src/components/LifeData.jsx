// src/components/LifeData.jsx
import { useState } from 'react';
import axios from 'axios';

export default function LifeData() {
  const [lifeData, setLifeData] = useState({
    sleepHours: 0,
    exerciseMinutes: 0
  });

  const submitLifeData = async () => {
    try {
      await axios.post('/api/life', lifeData);
      alert('생활 데이터가 기록되었습니다.');
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };

  return (
    <div className="life-data-container">
      <h3>생활(Life) Data 기록</h3>
      <div>
        <label>수면 시간 (시간): </label>
        <input 
          type="number" 
          value={lifeData.sleepHours} 
          onChange={(e) => setLifeData({...lifeData, sleepHours: Number(e.target.value)})} 
        />
      </div>
      <div>
        <label>운동 시간 (분): </label>
        <input 
          type="number" 
          value={lifeData.exerciseMinutes} 
          onChange={(e) => setLifeData({...lifeData, exerciseMinutes: Number(e.target.value)})} 
        />
      </div>
      <button onClick={submitLifeData}>데이터 저장</button>
    </div>
  );
}