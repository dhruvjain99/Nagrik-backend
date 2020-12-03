const incidents = require('../../models/incident');
const user = require('../../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;

module.exports.updateLocation = function(req, res) {
    var userId = req.user._id;
    var long = Number(req.query.lon);
    var latt = Number(req.query.lat);
    user.findByIdAndUpdate(ObjectId(userId),{"location":{type: "Point",coordinates: [long,latt]}}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send("Location updated");
        }
    })
    }