// backend/database/db.js

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: '포트번호',
    user: 'user',
    password: '비밀번호',
    database: 'my_db'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to the database');
});

module.exports = conn;