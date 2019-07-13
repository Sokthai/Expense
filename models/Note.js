const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    note:[
        {
            subject: {
                type: String,
                required: true
            },
            note:{
                type: String,
                required: true
            },
            Date:{
                type: Date,
                default: Date.now
            }
        }
    ] 
})

module.exports = Note = mongoose.model("note", NoteSchema);