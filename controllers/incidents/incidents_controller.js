const Incident = require('../../models/incident');
const User =  require('../../models/user');
const uploadVideo = require('../../middleware/videoUpload');
var bodyParser = require('body-parser');

module.exports.newIncident = async function(req, res){
    User.count( {
        location: {
          $near: {
            $maxDistance: 1000,
            $geometry: {
              type: "Point",
              coordinates: [Number(req.body.longitude), Number(req.body.latitude)]
            }
          }
        }
      },async function(err, result){
        if(err){
            console.log(err); 
        } else {
           var thresholdCount = result;
            try{
                let incident = await Incident.create({
                    name: req.body.name,
                    description: req.body.description,
                    location: {
                        coordinates: [Number(req.body.longitude), Number(req.body.latitude)],
                        type: "Point"
                    },
                    is_commAwareness: req.body.is_commAwareness,
                    is_neighUpdate: req.body.is_neighUpdate,
                    is_emergency: req.body.is_emergency,
                    is_verified: true,
                    is_specialCovidPost: req.body.is_specialCovidPost,
                    userCovidNeed: req.body.userCovidNeed,
                    userCovidSupply: req.body.userCovidSupply,
                    user: req.user._id,
                    video_url: ' ',
                    is_visible: true,
                    upVotes:1,
                    downVotes:1,
                    thresholdUsers : thresholdCount
                });
                console.log("incident sucessfully saved");
                return res.json({IncidentID: incident._id});
            } catch(err){
                console.log(err);
                return res.status(500).json({message: 'Internal Server Error'});
            }
        }
    }); 
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

module.exports.updateVotes = function(req, res) {
    const action = req.body.action;
    Incident.findById(req.body.id, function(err, incident) {
        if(err){
            console.log("Couldn't update votes", err);
            return res.json("Couldn't update votes", err);
        } else if(action === undefined) {
            return res.json("Undefined action");
        } else {
            if(action === 1) {
                incident.upVotes += 1;
            } else {
                incident.downVotes += 1;
            }
            if(incident.upVotes + incident.downVotes > 0.4*incident.thresholdUsers 
                    &&  incident.upVotes/incident.downVotes < 0.6) {
                incident.is_visible = false;
            }
            incident.save(function(err) {
            if (err) {
              console.log('Error in saving incident', err);
              return res.json("Couldn't update votes", err);
            } else {
              console.log('success');
              return res.json("success");
            }
        });
    }
});    
}

 