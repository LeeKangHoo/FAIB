const mysql = require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    user:'kkanghoo',
    password:'kkanghoo!@#0828',
    database:'client'
});
//id : lkh, pw : test
db.connect();
module.exports = db;

/*module.exports = {
    init: function () {
        return mysql.createConnection(db);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql 연결 에러 : ' + err);
            else console.log('mysql 연결 성공');
        });
    }
};*/
