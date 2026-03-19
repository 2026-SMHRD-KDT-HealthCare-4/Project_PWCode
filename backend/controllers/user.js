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
    return err;
  }
}

const hashCompare = async (inputValue, hash) => {
  try {
    const isMatch = await bcrypt.compare(inputValue, hash);
    if (isMatch) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return err;
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

    const blobToStr = Buffer.from(getUser[0].userPW).toString();
    const isMatch = await hashCompare(userPW, blobToStr);

    if (!isMatch) {
      res.status(401).json('비밀번호가 일치하지 않습니다.');
      return;
    }
    res.status(200).json('로그인 성공');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

exports.signup = async (req, res) => {
  const { userID, userPW } = req.body;

  try {
    const getUser = await userDB.getUser(userID);
    if (getUser.length) {
      res.status(401).json('이미 존재하는 아이디입니다.');
      return;
    }

    const hash = await textToHash(userPW);
    const signUp = await userDB.signUp([userID, hash]);
    res.status(200).json('가입 성공');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};