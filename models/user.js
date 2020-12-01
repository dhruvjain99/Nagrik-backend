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
}, {
    timestamps: true
});

const user = mongoose.model('User', userSchema);
module.exports = user;