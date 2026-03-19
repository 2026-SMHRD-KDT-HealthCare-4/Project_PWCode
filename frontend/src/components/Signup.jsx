// Signup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    const submitBtn = async () => {
        if (id === '' || pw === '') {
            alert("아이디 또는 비밀번호를 입력해주시기 바랍니다");
            return;
        } else {
            try {
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    body: JSON.stringify({userID: id, userPW: pw}),
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();

                alert(data);
                if (res.status === 200) {
                    navigate('/');
                } else {
                    setId('');
                    setPw('');
                    return;
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
<div className="main-container">
            <h1>회원가입</h1>
            
            <div className='account-container'>
                <div className="input-group">
                    <label>아이디</label>
                    <input 
                        type="text" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        placeholder="아이디를 입력하세요"
                    />
                </div>
                
                <div className="input-group">
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        value={pw} 
                        onChange={(e) => setPw(e.target.value)} 
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>

                <div className="button-group">
                    <button type='button' className="login-btn" onClick={submitBtn}>
                        가입하기
                    </button>
                    <button type='button' className="signup-btn" onClick={() => navigate('/login')}>
                        취소 및 로그인으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;