const Incident = require('./../../models/incident');

module.exports.newIncident = async function(req, res){
    try{
        let incident = await Incident.create({
            name: req.body.name,
            description: req.body.descrption,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            is_commAwareness: req.body.is_commAwareness,
            is_neighUpdate: req.body.is_neighUpdate,
            is_emergency: req.body.is_emergency,
            is_verified: true,
            user: req.sessions.passport.user._id,
            video_url: '',
        });
        return res.json({data: incident._id});
    } catch(err){
        console.log(err);
        return res.json({data: 'failure'});
    }
};