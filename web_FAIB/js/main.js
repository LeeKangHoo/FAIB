const express = require("express");
const fileupload_router = require('./fileupload');
const analyse_router = require('./analyse');
const filedownload_router = require('./filedownload');
//const login_router = require('./login');
//const profile_router = require('./profile');
const app = express();

app.use(express.static('public'));

app.use('/upload',fileupload_router);
app.use('/analyse',analyse_router);
app.use('/download',filedownload_router);


app.listen(19132, () =>{
  console.log('@@@@@@@@  FAIB  @@@@@@@@');
  console.log('server vulnurability analys project');
  console.log('LeeKangHoo(Nine)');
  console.log('Server port 19132');
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@');
});

