// server.js
const express = require('express');
const db = require('./database/db');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;	// server 포트

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/api', userRoutes);  // user 라우트 연결
app.post('/api/userData', (req, res) => {
    console.log(req.body);
    res.json('Data received');  // json 형태로 응답을 보냄
});

// DB 데이터 읽기
app.get('/', (req, res) => {
    db.query('SELECT * FROM table_name', function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});







app.listen(port, () => {		// 3000번 포트로 서버 실행
    console.log("서버 실행")
});