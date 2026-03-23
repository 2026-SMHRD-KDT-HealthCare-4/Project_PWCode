// src/components/Chatbot.jsx
import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 UI 즉시 업데이트
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      // 백엔드로 대화 내용 전송
      const response = await axios.post('/api/chat', { message: input });
      const { reply, crisis_detected } = response.data;

      // 위기 감지 시 경고 스타일 적용을 위한 상태 추가
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: reply, 
        isCrisis: crisis_detected 
      }]);

    } catch (error) {
      console.error('챗봇 통신 에러:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <h3>AI 챗봇 상담</h3>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} style={{ color: msg.isCrisis ? 'red' : 'black' }}>
            <strong>{msg.sender === 'user' ? '나: ' : 'AI: '}</strong>
            {msg.text}
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}