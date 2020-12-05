const passport = require('passport');
const passportJWTStrategy = require('passport-jwt').Strategy;
const jwtExtractor = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const constants = require('./../controllers/commons/constants');

const options = {
    jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET_KEY,
};

passport.use(new passportJWTStrategy(options, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log('Error in Token ', err);
            return done(null, false);
        }

        if(user){
            return done(null, user);
        } else{
            return done(null, false);
        }
    });
}));

module.exports = passport;