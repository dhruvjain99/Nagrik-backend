const express = require('express');
const db = require('./config/mongoose');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const jwtStrategy = require('./config/passport-jwt-strategy');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server...", error);
        return;
    }
    console.log(`API server running at port ${port}.`);
});