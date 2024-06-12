const mysql = require('mysql2');
const dbInfo = mysql.createConnection({
    host:'localhost',
    user:'kkanghoo',
    password:'kkanghoo!@#0828',
    port:3306,
    database:'client'
});
//id : lkh, pw : test

module.exports = {
    init: function () {
        return mysql.createConnection(dbInfo);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql 연결 에러 : ' + err);
            else console.log('mysql 연결 성공');
        });
    }
};
