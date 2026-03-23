import { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from './components/Signup';
import Main from './pages/Main';
import Header from './components/Header'
import Footer from './components/Footer'
import EmotionDiary from './components/EmotionDiary';
import Chatbot from './components/Chatbot';
import LifeData from './components/LifeData';
import Statistics from './components/Statistics';

function App() {
  // 클라이언트

  useEffect(() => {
    const userId = 'user';
    const password = '1234';

    fetch('/api/userData', {
      method: 'POST',
      body: JSON.stringify({ userId: userId, password: password }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => console.log("서버 응답:", data))
      .catch(err => console.log("에러 발생:", err));
  }, []); // 빈 배열을 넣어 컴포넌트 마운트 시 1회만 실행

  return (
    <div className='container'>
      <Header /><hr />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<Main />}></Route>
        <Route path='/diary' element={<EmotionDiary />} />
        <Route path='/chat' element={<Chatbot />} />
        <Route path='/life' element={<LifeData />} />
        <Route path='/stats' element={<Statistics />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
