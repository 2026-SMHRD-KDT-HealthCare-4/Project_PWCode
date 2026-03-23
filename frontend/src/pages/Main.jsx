// src/pages/Main.jsx
import React, { useState } from 'react';
import './Main.css';

const Main = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className='main-container'>
      
      {/* 1. 미디어 영역: 비디오 또는 이미지가 렌더링되는 고정 영역 */}
      <div className='media-block'>
        {isVideoPlaying ? (
          <video 
            className="main-video"
            autoPlay 
            muted 
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/Yummy_walking.mp4" type="video/mp4" />
          </video>
        ) : (
          <img 
            className="main-image"
            src="/Yummy.jfif" 
            alt="Yummy:D 메인 화면" 
          />
        )}
      </div>

      {/* 2. 텍스트 영역: 항상 존재하여 공간을 차지하되, 상태에 따라 투명도 조절 */}
      <div className={`text-block ${isVideoPlaying ? 'hidden' : 'visible'}`}>
        <p className='main-subtitle'>오늘의 감정을 달콤한 사탕으로 기록해 보세요!</p>
      </div>

    </div>
  );
};

export default Main;