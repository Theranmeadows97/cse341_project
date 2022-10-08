const express = require('express');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const mongodb = require('./db/connect');
require('dotenv').config();
const port = process.env.PORT || 3000;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.CLIENT_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
  
mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
