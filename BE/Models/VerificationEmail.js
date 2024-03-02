const mongoose = require('mongoose');
const configs = require('../ServerConfigs/ServerConfigs.json');
const schema = new mongoose.Schema({
    userTo: {
        type: mongoose.Schema.ObjectId,
        unique: true,
        required: [true, "User ID must be provided !"]
    },
    code: {
        type: String,
        required: [true, "Code must be provided !"]
    },
    resendTrails: {
        default: configs.defaultSendTrails + 1,
        type: Number,
    },
    mistakeTrails: {
        default: configs.defaultSendMistakes,
        type: Number,
    },
}, { timestamps: true, });


module.exports = mongoose.models.VerificationEmail ||
 mongoose.model('VerificationEmail', schema);