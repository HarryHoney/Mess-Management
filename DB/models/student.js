const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose
const studentSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    roll_number:{
        type: Number,
        required: true,
        minlength = 8,
        maxlength = 8,
        trim: true,
        unique: true
    },
    room_number:{
        type:Number,
        required: true,
        trim: true
    },
    photo_url:{
        type:String
    },
    balance:{
        type:Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    mess_detail:[{
    mess_off:{
        type: Boolean
    },
    start_data:{
        type:Date
    },
    end_data:{
        type:Date
    }
    }]
})

studentSchema.statics.findByCredentials = async (roll_number,password)=>{
    const user = await User.findOne({roll_number})
    
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    //console.log(password)
    if(!isMatch)
    throw new Error('Unable to login')
    return user
}
//Hashing plain text before saving
studentSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
        //console.log(user.password)
    }
    next()
})

//now let us suppose administration want the data of student. so it's easy for us to send that data in 
//in form of an object which is already present in the database. but there password is also is saved and that
//should not be shared. so we will override the toJSON method of this schema and remove password from it before
//sending
studentSchema.methods.toJSON = function() {
    const student = this
    const studentObject = student.toObject()
    delete studentObject.password

    return studentObject
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student