const events = require('../../models/events');
const user = require('../../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;

module.exports.events = function(req, res) {
    var userId = req.user._id;
    var allEventsData;
    events.find({}, function(err, allEventsData) {
      //  console.log(allEventsData);
        res.send(allEventsData);  
      });
    }