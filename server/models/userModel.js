const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    twitterId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    displayName: String,
    profileImageUrl: {
        type: String,
        required: false
    },
    referrer: {
        type: String,
        required: false
    },
    points: {
        type: Number,
        required: false
    },
    referral_points: {
        type: Number,
        required: false
    },
    boosters: {
        type: Number,
        required: false
    },
    lastClaim: {
        type: Date,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);