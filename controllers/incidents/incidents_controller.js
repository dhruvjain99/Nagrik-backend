const Incident = require('../../models/incident');
const uploadVideo = require('../../middleware/videoUpload');
var bodyParser = require('body-parser');

module.exports.newIncident = async function(req, res){
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
        });
        console.log("incident sucessfully saved");
        return res.json({IncidentID: incident._id});
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
        return res.send(`You must select a file.`);
      }
      return res.send(`File has been uploaded.`);
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload image: ${error}`);
    }
  };

module.exports.findIncidents = function(req, res) {
    Incident.find({}, function(err, allIncidentsData) {
        if(err){
            console.log("Error while finding all incidents", err);
            return res.status(500).json({message: 'Internal Server Error'});
        }
        console.log(allIncidentsData);
        res.send(allIncidentsData);  
    });
};