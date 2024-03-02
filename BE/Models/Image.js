const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: [true, "Admin Id is required !"],
    },
    mealId: {
        type: mongoose.Schema.ObjectId,
        ref: "Meal",
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    url: {
        type: String,
        required: [true, "url is required"],
    },
    path: {
        type: String,
        required: [true, "path is required"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    type: {
        type: String,
        enum: ["thumbnail", 'image', "profileImage"],
        required: [true, 'type is required'],
    },


}, { timestamps: true, });

module.exports = mongoose.model('Image', schema);