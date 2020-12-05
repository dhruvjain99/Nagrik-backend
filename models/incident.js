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
        type: { type: String },
        coordinates: [],
        default:[0, 0],
        required: true,
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
    is_verified: {
        type: Boolean, required: true,
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