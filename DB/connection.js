const mongoose = require('mongoose')
const { db } = require('./models/student')

//Global
const URI = 'mongodb+srv://messUser:messPassword@cluster0.flpbe.mongodb.net/messData?retryWrites=true&w=majority'
//Local
const URI_Local = 'mongodb://localhost:27017/messData'
const connectDB = async ()=>{
    const res = await mongoose.connect(URI || URI_Local,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('Database Connected....!')
    return 'Success'
}

module.exports = connectDB