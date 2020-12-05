const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    friends: {
        type: Number,
        default: 0,
        required: true
    },
    communities: {
        type: Number,
        default: 0,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: [],
        default:[0, 0],
        required: true,
       },
}, {
    timestamps: true
});

userSchema.index({ location: "2dsphere" });
const user = mongoose.model('User', userSchema);
module.exports = user;