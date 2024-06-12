const express = require("express");
const router = express.Router();
const path = require("path");
const db = require('./db');

// 로그인 페이지를 렌더링하는 라우터
router.get('/', (req, res) => {
    const filepath = path.join(__dirname, '../public/login.html');
    res.sendFile(filepath);
    console.log("로그인 페이지 로드");
});

// 로그인 요청을 처리하는 라우터
router.post('/login_process', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('MySQL 에러: ', err);
            res.status(500).send('서버 에러');
        } else if (results.length === 0) {
            res.status(401).send('유효하지 않은 사용자 이름');
        } else {
            const user = results[0];
            if (password === user.password) {
                req.session.user = user;
                res.send('로그인 성공');
                req.session.user = {
                    user: username,
                    auth: true
                };
            } else {
                res.status(401).send('유효하지 않은 비밀번호');
            }
        }
    });
});

module.exports = router;
