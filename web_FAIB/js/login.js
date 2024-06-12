const express = require("express");
const router = express.Router();
const path = require("path");

router.get('/',(req,res) => {
    //const filepath = path.join(__dirname + "/../public/analyse.html");
    //res.sendFile(filepath);
    const filepath = path.join(__dirname, '../public/login.html');
    res.sendFile(filepath);
    console.log("test");
});

module.exports = router;