const Incident = require('../../models/incident');
const uploadVideo = require('../../middleware/videoUpload');
var bodyParser = require('body-parser');

const io = require('../../index.js').io;
module.exports.newIncident = async function(req, res){
    try{
        let incident = await Incident.create({
            name: req.body.name,
            description: req.body.description,
            location: {
                coordinates: [Number(req.body.longitude), Number(req.body.latitude)],
                type: "Point"
            },
            votes: 0,
            is_commAwareness: req.body.is_commAwareness,
            is_neighUpdate: req.body.is_neighUpdate,
            is_emergency: req.body.is_emergency,
            is_specialCovidPost: req.body.is_specialCovidPost,
            userCovidNeed: req.body.userCovidNeed,
            userCovidSupply: req.body.userCovidSupply,
            user: req.user._id,
            video_url: ' ',
            is_visible: true,
            votes:0,
            //update the threshold_users here too
        });
        console.log("incident sucessfully saved");
        try{
            io.broadcast.emit("new notification", incident);
            console.log("Notification sent");
        }
        catch(err){
            console.log(err);
        }
        return; 
    } catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports.uploadIncidentVideo = async (req, res) => {
    try {
      await uploadVideo(req, res);
      console.log(req.file);
      if (req.file == undefined) {
        return res.status(500).json({"error": "You must select a file."});
      }
      return res.json({"success": "File has been uploaded successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({"error": `Error when trying upload image: ${error}`});
    }
  };

module.exports.findIncidents = function(req, res) {
    Incident.find({}, function(err, allIncidentsData) {
        if(err){
            console.log("Error while finding all incidents", err);
            return res.status(500).json({message: 'Internal Server Error'});
        }
        return res.json({"incidents": allIncidentsData});    
    });
};

module.exports.votes = function(req, res) {
    const action = req.body.action;
    const counter = action === 'Upvote' ? 1 : -1; //changes this
    Incident.findById(req.params.id, function(err, incident) {
        if(err){
            console.log("Couldn't update votes", err);
        }
        else {
            incident.votes += counter; // change this
            if(incident.votes < 0){ // update condition
                incident.is_visible = False;
            }
            incident.save(function(err) {
            if (err)
              console.log('Error in saving incident', err);
            else
              console.log('success');
            });
        }
      });
    
};