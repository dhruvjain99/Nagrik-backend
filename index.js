const express = require('express');
const db = require('./config/mongoose');
const google_auth = require('./config/passport-google-oauth')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const passport = require('passport');
const { urlencoded } = require('express');
const mongoStore = require('connect-mongo')(session);
require('dotenv').config()

app.use(urlencoded());
app.use(cookieParser());
app.use(session({secret: "nagrik", resave: false, saveUninitialized: false, store: new mongoStore({mongooseConnection: db})}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
done(null, user);
});

passport.checkAuthentication = function(req, res, done){
    if(req.isAuthenticated()){
        done();
    } else {
        res.redirect('/');
    }
};

app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log("Error starting the server...", error);
        return;
    }
    console.log(`API server running at port ${port}.`);
});