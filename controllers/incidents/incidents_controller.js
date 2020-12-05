const Incident = require('../../models/incident');

module.exports.newIncident = async function(req, res){
    try{
        let incident = await Incident.create({
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
            user: req.user._id,
            video_url: ' ',
        });
        return res.json({data: incident._id});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
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