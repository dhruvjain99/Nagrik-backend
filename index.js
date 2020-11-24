const express = require('express');
const db = require('./config/mongoose');
const google_auth = require('./config/passport-google-oauth')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const passport = require('passport');

app.use(cookieParser());
app.use(session({secret: "nagrik", resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server...", error);
        return;
    }
    console.log(`API server running at port ${port}.`);
});