import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const EmotionDiary = () => {
  const [content, setContent] = useState('');

  const submitDiary = async () => {
    try {
      // 1. 백엔드로 일기 데이터 전송
      const response = await axios.post('/api/diary', { text: content });
      console.log('AI 감정 분류 결과:', response.data.emotion_result);
    } catch (error) {
      console.error('기록 실패', error);
    }
  };
  return (
<div className="diary-container">
      <h3>감정일기 작성</h3>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="오늘의 감정을 기록하세요"
      />
      <button onClick={submitDiary}>분석 및 저장</button>
    </div>
  )
}

export default EmotionDiary