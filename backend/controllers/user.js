// user.js

const bcrypt = require('bcrypt');
const userDB = require('../models/userDB');

const textToHash = async (text) => {		// 텍스트 값을 hash로 변환
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const hashCompare = async (inputValue, hash) => {
  try {
    const isMatch = await bcrypt.compare(inputValue, hash);
    if (isMatch) return true;
    else return false;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

exports.loginCheck = async (req, res) => {
  const { userID, userPW } = req.body;

  try {
    const getUser = await userDB.getUser(userID);
    if (!getUser.length) {
      res.status(401).json('존재하지 않는 아이디입니다.');
      return;
    }

    const dbPW = getUser[0].userPW;
    const storedHash = Buffer.isBuffer(dbPW) ? dbPW.toString() : dbPW;
    const isMatch = await hashCompare(userPW, storedHash);

    if (!isMatch) {
      res.status(401).json('비밀번호가 일치하지 않습니다.');
      return;
    }

    res.status(200).json('로그인 성공');
  } catch (err) {
    console.error('로그인 체크 에러:',err);
    res.status(500).json('서버 오류 발생');
  }
}

exports.signup = async (req, res) => {
  const { userID, userPW, userName, userGender, userBirth, userNumber} = req.body;

  try {
    const getUser = await userDB.getUser(userID);
    if (getUser.length) {
      return res.status(401).json('이미 존재하는 아이디입니다.');
    }

    const hash = await textToHash(userPW);
    const userData = [userID, hash, userName, userGender, userBirth, userNumber];

    const signUp = await userDB.signUp(userData);
    res.status(200).json('가입 성공');
  } catch (err) {
    console.error(err);
    res.status(500).json('서버 오류 발생');
  }
};

exports.checkId = async (req, res) => {
  const {userID} = req.query;

  /* 아이디 입력하지 않고 중복확인 누르는것 방지*/
  if (!userID) {
        return res.status(400).json("아이디를 입력해주세요.");
    }
  try{
    const getUser = await userDB.getUser(userID);

    if (getUser.length > 0) {
      res.status(200).json(true); // 중복됨 사용 불가
    } else {
      res.status(200).json(false); // 사용 가능
    }
  } catch (err) {
    console.error("아이디 중복확인 중 오류 발생:", err);
    res.status(500).json("서버 오류 발생");
  }
};