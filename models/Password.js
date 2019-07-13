const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
    user : {
        type: String,
        require: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    valid : {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default : new Date
    }
})

module.exports = Password = mongoose.model("password", PasswordSchema);