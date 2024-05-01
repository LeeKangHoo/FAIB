const express = require("express");
const path = require("path");
const router = express.Router();



router.get('/', (req, res, next) => {
    const filename ="FAIB.sh"
    const filePath = '../../program_FAIB/FAIB.sh';
    const absolutePath = path.resolve(__dirname, filePath);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.sendFile(absolutePath);
  });  

  module.exports = router;