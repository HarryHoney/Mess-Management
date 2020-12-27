const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    userID:{
        type: Number,
        required: true,
        minlength = 8,
        maxlength = 8,
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
    mess_charges:[{
        breakfast:{
            type:Number,
            required:true,
            maxlength:3
        },
        lunch:{
            type:Number,
            required:true,
            maxlength:3
        },
        dinner:{
            type:Number,
            required:true,
            maxlength:3
        }
    }]
})

adminSchema.statics.findByCredentials = async (userID,password)=>{
    const user = await User.findOne({userID})
    
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