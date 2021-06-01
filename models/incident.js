const mongoose = require('mongoose');
const incidentSchema = mongoose.Schema({
    name: {
        type: String, required: true, unique: true,
    },
    description: {
        type: String, required: true,
    },
    video_url:{
        type:String, required: true,
    },
    location: {
        type: { type: String, default: 'Point', required: true },
        coordinates: [],
       },
    is_commAwareness: {
        type: Boolean, required: true,
    },
    is_neighUpdate: {
        type: Boolean, required: true,
    },
    is_emergency: {
        type: Boolean, required: true,
    },
    is_visible: {
        type: Boolean, required: true,
    },
    is_specialCovidPost: {
        type:Boolean, required: false
    },
    userCovidNeed: {
        type:Array, required: false
    },
    userCovidSupply: {
        type:Array, required: false
    },
    votes: { //Upvotes and downvotes in place of votes, threshold users to be added as well
        type: Number, required:true, default:0,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true,
    },
}, {
    timestamps: true
});

incidentSchema.index({ location: "2dsphere" });
const incident = mongoose.model('Incident', incidentSchema);
module.exports = incident;