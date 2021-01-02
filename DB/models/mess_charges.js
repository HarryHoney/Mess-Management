const mongoose = require('mongoose')
const { Schema } = mongoose

const messCharges_Schema = new Schema({
    id:{
        type : Number
    },
    breakfast:{
        type:Number,
        required:true,
        maxlength:2
    },
    lunch:{
        type:Number,
        required:true,
        maxlength:2
    },
    dinner:{
        type:Number,
        required:true,
        maxlength:2
    },
    edited_by:{
        type:String,
        required:true
    }
})

const mess_Charges = mongoose.model('mess_Charges', messCharges_Schema)

module.exports = mess_Charges