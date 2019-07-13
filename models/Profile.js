const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipcode: {
        type: String
    },
    question: {
        question1: {
            type: String,
            required: true
        },
        question2: {
            type: String,
            required: true
        },
        question3: {
            type: String,
            required: true
        },
    },
    answer: {
        answer1: {
            type: String,
            required: true
        },
        answer2: {
            type: String,
            required: true
        },
        answer3: {
            type: String,
            required: true
        },
    }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);