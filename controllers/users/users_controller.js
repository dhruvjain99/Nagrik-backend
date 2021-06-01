const Incident = require('../../models/incident');
const User =  require('../../models/user');
var bodyParser = require('body-parser');

module.exports.profile = function (req, res){
    return res.json({data: req.user});
}

module.exports.userPosts = function(req, res) {
    Incident.find({    
      user : req.user._id
      }).find((error, results) => {
        if (error){
          console.log(error);
          return res.status(500).json({message: "Internal Server Error"});
        }
        return res.json(results);
      });
}

module.exports.updatePost = async function(req, res) {
  var isDelete = req.body.isDelete;
  if(isDelete === true) {
    Incident.deleteOne({_id: req.body._id}, function(err, results) {
      if (err){
        console.log("failed deleting post");
        return res.status(500).json({message: "Internal Server Error"});
      }
      console.log("Incident deleted with id: " + req.body._id);
      return res.json("Incident deleted with id: " + req.body._id);
   });
} else {
  var id = req.body._id;
  Incident.findByIdAndUpdate(id,
  {
    "name":req.body.name,
    "description": req.body.description
  
  }, function(err, result){
    if(err){
      return res.json({"error": err})  
    }
    else {
        return res.json("Incident updated with id: " + req.body._id);
    }
})
}
}