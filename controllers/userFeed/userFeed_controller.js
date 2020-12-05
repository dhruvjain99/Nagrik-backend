const Incident = require('../../models/incident');

module.exports.findFeed = function(req, res) {
  let long = req.user.location.coordinates[0];
  let latt = req.user.location.coordinates[1];
  let maxDist = req.query.distance;
  Incident.find({
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
    if (error){
      console.log(error);
      return res.status(500).json({message: "Internal Server Error"});
    }
    return res.send(results);
  });
}