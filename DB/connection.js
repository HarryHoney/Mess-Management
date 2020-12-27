const mongoose = require('mongoose')

const URI = 'mongodb+srv://messUser:messPassword@cluster0.flpbe.mongodb.net/messData?retryWrites=true&w=majority'
const connectDB = async ()=>{
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('Database Connected....!')
}

module.exports = connectDB