const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    spending: [
        {
            paidBy:{
                type: String,
                required: true
            },
            item:{
                type: String,
                required: true
            },
            category:{
                type: String,
                required: true
            },
            location:{
                type: String,
            },
            price:{
                type: String,
                required: true
            },
            media:{
                type: String
            },
            description:{
                type: String,
            },
            purchaseDate:{
                type: Date
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]

})

module.exports = Item = mongoose.model('item', ItemSchema)