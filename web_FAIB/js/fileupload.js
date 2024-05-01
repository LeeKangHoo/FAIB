const express = require('express');
const multer  = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded');
});

app.listen(19132, () => {
    console.log('@@@@@@@@  FAIB  @@@@@@@@');
    console.log('server vulnurability analys project');
    console.log('LeeKangHoo(Nine)');
    console.log('Server port 19132');
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
});


