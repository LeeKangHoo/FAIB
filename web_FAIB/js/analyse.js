const express = require("express");
const router = express.Router();

router.get('/',(req,res) => {
    res.sendfile("../public/analyse.html");

});

module.exports = router;