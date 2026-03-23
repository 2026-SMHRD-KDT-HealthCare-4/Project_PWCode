// models/diaryDB.js
const db = require('../database/db'); // DB 커넥션 객체 임포트

exports.saveDiaryData = async (text, emotionLabel) => {
    // 핵심 개념: DB 쿼리 로직 캡슐화
    // const query = 'INSERT INTO diaries (content, emotion) VALUES (?, ?)';
    // const result = await db.execute(query, [text, emotionLabel]);
    // return result;
    
    console.log(`[DB Mock] 저장 완료: ${text} / 감정: ${emotionLabel}`);
    return true;
};