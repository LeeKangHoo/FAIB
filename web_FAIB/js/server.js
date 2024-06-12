const express = require("express");
const fileupload_router = require('./fileupload');
const analyse_router = require('./analyse');
const filedownload_router = require('./filedownload');
const login_router = require('./login');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'kanghoo!secret', // 적절한 비밀 키로 변경하세요.
    resave: false,
    saveUninitialized: true
}));

app.use('/upload', fileupload_router);
app.use('/analyse', analyse_router);
app.use('/download', filedownload_router);
app.use('/login', login_router);

app.listen(19132, () => {
    console.log('@@@@@@@@  FAIB  @@@@@@@@');
    console.log('server vulnerability analysis project');
    console.log('LeeKangHoo(Nine)');
    console.log('Server port 19132');
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
});
