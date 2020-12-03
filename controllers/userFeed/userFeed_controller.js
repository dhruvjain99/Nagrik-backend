const incidents = require('../../models/incident');
const user = require('../../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;

module.exports.findFeed = function(req, res) {
    var userId = req.user._id;
    var maxDist = req.query.distance;
    var long ;
    var latt ;
  //  console.log(req.user);
    user.findById(ObjectId(userId))
    .then(doc => {
        var incidentData;
        long = doc.location.coordinates[0];
        latt = doc.location.coordinates[1];
        incidents.find({
            location: {
             $near: {
              $maxDistance: maxDist,
              $geometry: {
               type: "Point",
               coordinates: [long, latt]
              }
             }
            }
           }).find((error, results) => {
            if (error) console.log(error);
            incidentData = results;
            return res.send(incidentData);
           });
      })
      .catch(err => {
        console.log(err);
      });
    }