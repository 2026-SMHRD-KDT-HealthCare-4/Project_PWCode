// Signup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    /* 여기서 부터 내가 추가하는 내용들 안되면 지울 것 */
    const [confirmPw, setConfirmPw] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [number, setNumber] = useState('');
    const [isIdChecked, setIsIdChecked] = useState(false);
    const handleCheckId = async () => {
    if (id === '') {
        alert("아이디를 입력해주세요.");
        return;
    }

    try {
        // 서버에서 아이디 중복체크 (주소는 서버 설계후 변경)
        const res = await fetch(`/api/check-id?userID=${id}`);
        const isDuplicate = await res.json(); // 서버에서 true(중복임) 또는 false(사용가능)를 준다고 가정

        if (isDuplicate) {
            alert("이미 사용 중인 아이디입니다.");
            setIsIdChecked(false);
        } else {
            alert("사용 가능한 아이디입니다!");
            setIsIdChecked(true); // 여기서 'true'로 바꿔줘야 다음 단계 진입
        }
    } catch (err) {
        console.log("중복확인 에러:", err);
    }
};
    /*-------------------------------------------- */
    const navigate = useNavigate();

    const submitBtn = async () => {
        /* 모든 항목 입력 검사 */
        if (id === '' || pw === '' || confirmPw === '' || name === '' || gender === '' || birth === '' || number === '') {
            alert("모든 항목을 입력해주시기 바랍니다");
            return;
        }

        /* 아이디 중복확인 검사 */
        if(!isIdChecked) {
            alert("아이디 중복 확인을 진행해주시기 바랍니다");
            return;
        }

        /* 비밀번호 유효성 검사 */
        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/;
        if (!pwRegex.test(pw)) {
            alert("비밀번호는 8~12자의 대/소문자, 숫자 조합이어야 합니다.");
            return;
        }

        /* 비밀번호 확인 검사 */
        if (pw !== confirmPw) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }
        
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({userID: id,userPW: pw,userName:name,userGender:gender,userBirth:birth,userNumber:number}),
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

    return (
<div className="main-container">
            <h1>회원가입</h1>
            
            <div className='account-container'>
                <div className="input-group">
                    <label>아이디</label>
                    <div className="id-check-wrapper"/*중복확인 버튼과 아이디 입력창 사이즈 조절을 위한 설정*/>
                    <input 
                        type="text" 
                        value={id} 
                        onChange={(e) => {
                            setId(e.target.value);
                            setIsIdChecked(false); /* 아이디 중간에 변경시 중복확인을 무효*/
                        }} 
                        placeholder="아이디를 입력하세요"
                    />
                    <button
                        type="button"
                        onClick={handleCheckId}>중복확인</button>
                    </div>
                </div>
                
                <div className="input-group">
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        value={pw} 
                        onChange={(e) => setPw(e.target.value)} 
                        placeholder="비밀번호를 입력하세요 (8~12자 대/소문자, 숫자)"
                    />
                </div>

                <div className="input-group">
                    <label>비밀번호 확인</label>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <input 
                            type="password" 
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)} 
                            placeholder="비밀번호를 재입력하세요"
                            style={{ width: '100%' }} 
                        />
                        {pw && confirmPw && (
                            <span style={{ 
                                color: pw === confirmPw ? 'green' : 'red', 
                                fontSize: '12px',
                                marginTop: '4px' // 입력창과 약간의 간격
                            }}>
                                {pw === confirmPw ? "✔ 비밀번호가 일치합니다." : "❌ 비밀번호가 일치하지 않습니다."}
                            </span>
                        )}
                    </div>
                </div>

                <div className='input-group'>
                    <label>이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <div className='input-group'>
                    <label>성별</label>
                    <div className="radio-group-container"> {/* 👈 이 컨테이너가 반드시 있어야 합니다! */}
                        <label className="radio-label">
                            <input 
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)} /> 남성
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)} /> 여성
                        </label>
                    </div>
                </div>

                <div className='input-group'>
                    <label>생년월일</label>
                    <input
                        type="date"
                        value={birth}
                        max={new Date().toISOString().split("T")[0]} // 오늘 날짜 이후 선택 불가
                        onChange={(e) => setBirth(e.target.value)}
                    />
                </div>

                <div className='input-group'>
                    <label>전화번호</label>
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => {
                            // 입력된 값에서 숫자가 아닌 문자를 제거하고 state 저장
                            const onlyNumber = e.target.value.replace(/[^0-9]/g, '').slice(0,11);
                            setNumber(onlyNumber);
                        }}
                        placeholder=" - 없이 숫자만 입력하세요"
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