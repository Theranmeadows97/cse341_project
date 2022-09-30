const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 1000;
const app = express();
let cors = require('cors');

require("dotenv").config();

//app.use(cors());
app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  //res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Z-Key, Content-Disposition");
  //res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
}).use('/',require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });

  
