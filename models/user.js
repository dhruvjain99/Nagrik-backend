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
}, {
    timestamps: true
});

const user = mongoose.model('User', userSchema);
module.exports = user;