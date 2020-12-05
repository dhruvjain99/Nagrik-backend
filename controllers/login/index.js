const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const constants = require('../commons/constants.js');
const client = new OAuth2Client([constants.EXPO_ANDROID_CLIENT_ID, constants.EXPO_IOS_CLIENT_ID]);
const User = require('./../../models/user');

//Action to create session for API request to return JSON web token
module.exports.createToken = async function(req, res){
    try{
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: [constants.EXPO_ANDROID_CLIENT_ID, constants.EXPO_IOS_CLIENT_ID],
        });
        let payload = ticket.getPayload();
        let user = await User.findOne({email: payload.email});
        if(!user){
            user = await User.create({
                name: payload.name,
                email: payload.email,
            });
        }
        return res.json(200, {
            message: 'Signed In successfully, keep the token safe.',
            data: {
                token: jwt.sign(user.toJSON(), constants.JWT_SECRET_KEY)
            }
        });
    }catch(err){
        console.log('****************** Error ', err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}


module.exports.destroyToken = function (req, res){
    req.logout();
    return res.json({data: 'success'});
}
