const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const adminSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    userID:{
        type: Number,
        required: true,
        minlength : 8,
        maxlength : 8,
        trim: true,
        unique: true
    },
    password:{
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
    // we are having tokens here because login can be from multiple 
    // devices
    tokens:[{
        token:{
            type:String,
            require: true
        }
    }]
})

adminSchema.statics.findByCredentials = async (userID,password)=>{
    const user = await Admin.findOne({userID})
    if(!user){
        throw new Error('Admin Does not exist')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    throw new Error('password is wrong')
    return user
}

adminSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({userID:user.userID.toString()},'getting token',{expiresIn:'2 days'})
    user.tokens = user.tokens.concat({token})
    
    if(user.tokens.length>3){
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

//Hashing plain text before saving
adminSchema.pre('save',async function(next){
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
adminSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password

    return userObject
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin