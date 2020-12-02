var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const eventSchema = mongoose.Schema({
    creatorEmail: {
        type: String,
        required: true,
        unique: true
    },
    eventMessage: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: []
       },
},
 {
    timestamps: true
 });

eventSchema.index({ location: "2dsphere" });
var events = mongoose.model("events", eventSchema);
module.exports = events;