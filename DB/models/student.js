const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        type: String,
        required: true,
        minlength : 8,
        maxlength : 8,
        trim: true,
        unique: true
    },
    room_number:{
        type:Number,
        required: true,
        trim: true
    },
    photo_buffer:{
        type:Buffer
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
    }],
    // we are having tokens here because login can be from multiple 
    // devices
    tokens:[{
        token:{
            type:String,
            require: true
        }
    }]
})

studentSchema.statics.findByCredentials = async (roll_number,password)=>{
    const student = await Student.findOne({roll_number})
    
    if(!student){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,student.password)
    //console.log(password)
    if(!isMatch)
    throw new Error('Unable to login')
    return student
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

studentSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({roll_number:user.roll_number.toString()},'getting token',{expiresIn:'2 days'})
    user.tokens = user.tokens.concat({token})
    
    if(user.tokens.length>5){
        let remaining_token = []
        user.tokens.forEach(element => {
            const {exp} = jwt.decode(element.token,'getting token')
            if (Date.now() <= exp * 1000) {// valid
                remaining_token.push(element)
              }
        })
        user.tokens = remaining_token
        await user.save()
    }

    return token
}

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