const express = require("express");
const app = express();
//const mysql = require('mysql');
const cors = require("cors");
/*const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  database : 'socialmedia'
});*/

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/User')
app.use('/user', userRoute);

app.listen(3001, (req, res) => {
    console.log("Server Running...");
});