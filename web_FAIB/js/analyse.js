const express = require("express");
const router = express.Router();
const path = require("path");
const chart = require("chart.js");
const fs = require("fs");

function checkSession(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}


router.get('/',checkSession,(req,res) => {
    //const filepath = path.join(__dirname + "/../public/analyse.html");
    //res.sendFile(filepath);
    const jsonFile = fs.readFileSync('uploads/FAIB_result.json', 'utf-8');
    const jsonData = JSON.parse(jsonFile);
    
    var number = [0,0,0,0,0];




    jsonData.forEach(item => {
        if (/^A/.test(item.vul_code)) {
            number[0]++;
        } else if (/^FnD/.test(item.vul_code)) {
            number[1]++;
        } else if (/^S/.test(item.vul_code)) {
            number[2]++;
        } else if (/^F/.test(item.vul_code)) {
            number[3]++;
        } else if (/^L/.test(item.vul_code)) {
            number[4]++;
        }
    });
    
    console.log(number);
    var total = 0;
    for (i = 0;i< 5;i++){
        total += number[i];
    }



    var chart_data = number[0]+","+number[1]+","+number[2]+","+number[3]+","+number[4];

    var output = `<!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
        <link rel="stylesheet" href="css/analyse.css">
        <title>FAIB</title>
    </head>
    <body>
        <div class="first">
            <div class="logo"></div>
            
            <div class="user">
                <button id="sign_in">sign in</button>
                <button id="sign_up">sign up</button>
                <button id="profile"></div>
    
            </div>
        </div>
        <div class="second">
            <div class="second2">
                <div class="score">${total}/100</div><br>
            <div class="score2">
                <div class="account">계정 관리 ${number[0]}/15</div>
                <div class="fnd">파일 및 디렉터리 관리 ${number[1]}/15</div>
                <div class="service">서비스 관리 ${number[2]}/15</div>
                <div class="fatch">패치 관리 ${number[3]}/15</div>
                <div class="log">로그 관리 ${number[4]}/15</div>
            </div>
            </div>
            <canvas id="myChart" width="500" height="500">
                <script>let myCt = document.getElementById('myChart');
    
                    let myChart = new Chart(myCt, {
                      type: 'pie',
                      data: {
                        labels: ['Acount', 'FnD', 'F', 'S','L'],
                        datasets: [
                          {
                            label: 'Dataset',
                            data: [${chart_data}],
                          }
                        ]
                      },
                      options: {
                responsive: false, 
                maintainAspectRatio: false 
            }
                    });</script>
            </canvas>
        </div>
    </body>
    </html>`;
    res.send(output)
    
});

module.exports = router;