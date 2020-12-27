const mongoose = require('mongoose')
const { Schema } = mongoose

const complaintSchema = new Schema({
    Category:{
        type:String,
        required: true
    },
    Status:{
        type:Boolean
    },
    Detail:{
        type:String
    }
})

const Complaint = mongoose.model('Complaint', complaintSchema)

module.exports = Complaint