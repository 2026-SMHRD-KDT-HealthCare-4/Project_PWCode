// controllers/chat.js
const axios = require('axios');
const ML_SERVER_URL = process.env.ML_SERVER_URL || 'http://localhost:8000';

exports.processChat = async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "메시지가 누락되었습니다." });
    }

    try {
        const mlResponse = await axios.post(`${ML_SERVER_URL}/ml/chat`, { message });
        
        // 위기 감지 플래그가 True일 경우 시스템 개입 로직 실행
        if (mlResponse.data.crisis_detected) {
            console.warn("위기 상황 감지: 긴급 알림 발송 로직 트리거");
            // TODO: 보호자 알림 등 추가 비즈니스 로직 구현 위치
        }

        return res.status(200).json(mlResponse.data);
    } catch (error) {
        console.error("Chat Controller Error:", error.message);
        return res.status(500).json({ error: "챗봇 서버 응답 지연" });
    }
};