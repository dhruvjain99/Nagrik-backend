const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./../models/user');

passport.use(new googleStrategy({
    clientID: '137444265231-6hv5i4kvbbqoh7ifasas2pqrno9ao67n.apps.googleusercontent.com',
    clientSecret: '4ufQNz2IYlBItXKmawbfUX59',
    callbackURL: 'http://localhost:3000/users/auth/google/callback',
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}, function(err, user){
        if(err){
            console.log('Error in finding the user from the database.');
            return done(null, false);
        }
        console.log(profile);
        if(user){
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
            }, function(err, newUser){
                if(err){
                    console.log('Error in creating a new user(Sign up using google).');
                    return done(null, false);
                }
                return done(null, newUser);
            });
        }
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
done(null, user);
});

passport.checkAuthentication = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
};

module.exports = passport;