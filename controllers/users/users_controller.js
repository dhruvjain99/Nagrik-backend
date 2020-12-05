
module.exports.profile = function (req, res){
    return res.json({data: req.user});
}
