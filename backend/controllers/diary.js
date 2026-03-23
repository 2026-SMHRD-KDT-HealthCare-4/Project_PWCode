// controllers/diary.js
const axios = require('axios');
// 환경변수 사용 권장, 없을 시 기본값 localhost:8000 사용
const ML_SERVER_URL = process.env.ML_SERVER_URL || 'http://localhost:8000';

exports.createDiary = async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: "일기 내용이 누락되었습니다." });
    }

    try {
        // ML 서버에 KcELECTRA 분석 요청
        const mlResponse = await axios.post(`${ML_SERVER_URL}/ml/emotion`, { text });
        const emotionData = mlResponse.data;

        // TODO: database/db.js 및 models/diaryDB.js 연동 로직 추가 위치

        return res.status(200).json({ 
            message: "일기가 저장되었습니다.", 
            emotion_result: emotionData 
        });
    } catch (error) {
        console.error("Diary Controller Error:", error.message);
        return res.status(500).json({ error: "ML 연산 서버 통신 실패" });
    }
};