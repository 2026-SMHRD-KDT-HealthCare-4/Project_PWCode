// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diary');

// POST /api/diary/ 요청 시 컨트롤러의 createDiary 실행
router.post('/', diaryController.createDiary);

module.exports = router;