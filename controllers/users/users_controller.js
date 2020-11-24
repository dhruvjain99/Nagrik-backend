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
};
module.exports.user_info = function (req, res){
    console.log(req);
    return res.json({name: req.user});
}