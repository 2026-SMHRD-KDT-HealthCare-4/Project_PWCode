// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

// HTTP POST 요청이 들어오면 chatController의 processChat 함수 실행
router.post('/', chatController.processChat);

module.exports = router;