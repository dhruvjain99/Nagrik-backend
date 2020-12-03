const incident = require('../../models/incident');
const user = require('../../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;

module.exports.newIncident = async function(req, res){
    try{
        let incident = await incident.create({
            name: req.body.name,
            description: req.body.description,
            location: {
                coordinates: [req.body.longitude, req.body.latitude],
                type: "Point"
            },
            is_commAwareness: req.body.is_commAwareness,
            is_neighUpdate: req.body.is_neighUpdate,
            is_emergency: req.body.is_emergency,
            is_verified: true,
            user: req.sessions.passport.user._id,
            video_url: ' ',
        });
        return res.json({data: incident._id});
    } catch(err){
        console.log(err);
        return res.json({data: 'failure'});
    }
};

module.exports.findIncidents = function(req, res) {
    var userId = req.user._id;
    var allIncidentsData;
    incident.find({}, function(err, allIncidentsData) {
        console.log(allIncidentsData);
        res.send(allIncidentsData);  
      });
    }