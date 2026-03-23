import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
      {/* 기본 홈 네비게이션 */}
      <div className='link-container'>
        <Link to="/"><img style={{width:"100px"}} src="/logo.png" /></Link>
      </div>

      {/* 핵심 비즈니스 로직 네비게이션 */}
      <div className='link-container'>
        <Link to="/diary">감정일기</Link>
      </div>

      <div className='link-container'>
        <Link to="/chat">AI 챗봇</Link>
      </div>

      <div className='link-container'>
        <Link to="/life">생활 데이터</Link>
      </div>

      <div className='link-container'>
        <Link to="/stats">통계 분석</Link>
      </div>

      {/* 사용자 인증 네비게이션 */}
      <div className='link-container'>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default Header;