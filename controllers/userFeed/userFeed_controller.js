const Incident = require('../../models/incident');
const User =  require('../../models/user');

module.exports.findFeed = function(req, res) {
  let long = Number(req.user.location.coordinates[0]);
  let latt = Number(req.user.location.coordinates[1]);
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
    return res.json(results);
  });
}

module.exports.countUsers = function(req, res) {
  let long = Number(req.user.location.coordinates[0]);
  let latt = Number(req.user.location.coordinates[1]);
  let maxDist = req.query.distance;
  User.count( {
    location: {
      $near: {
        $maxDistance: maxDist,
        $geometry: {
          type: "Point",
          coordinates: [long, latt]
        }
      }
    }
  }, function(err, result){
    if(err){
        res.send(err)
    } else {
        userCount = result;
        res.json(result);
    }
})
}