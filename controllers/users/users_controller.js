const User = require('./../../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


module.exports.createSession = function(req, res){
    return res.json({data: 'success'});
};


module.exports.destroySession = function (req, res){
    req.logout();
    return res.json({data: 'success'});
}

module.exports.profile = function (req, res){
    //console.log(req);
    return res.json({name: req.session.passport.user.name, 
                    email: req.session.passport.user.email, 
                    friends: req.session.passport.user.friends,
                    communities: req.session.passport.user.communities,
                });
}