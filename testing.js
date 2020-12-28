const Student = require('./DB/models/student')
const connectDB = require('./DB/connection')


const sharp = require('sharp');
const savingData = async (data)=>{
    let ss = await connectDB()
    const buffer = await sharp('input.jpeg')
    .rotate()
    .resize(200)
    .toBuffer()
    data.photo_url = buffer
    const user = new Student(data)
    console.log(user)
    const res = await user.save()
    console.log(res)
}

const features1 ={
    name:'money',
    email:'money@gmail.com',
    roll_number:17103034,
    room_number:209,
    photo_url:'kdsgfhksljsd',
    balance: 23000,
    password:'honeymoney'
}

// savingData(features1).catch((err)=>{
//     console.log(err)
// })
const retrive = async ()=>{
    let ss = await connectDB()
    const data = await Student.findById('5fe9bbff9cdc69655d07263c')
    const inputBuffer = data.photo_url
    sharp(inputBuffer)
    .resize(320, 240)
    .toFile('output.webp', (err, info) => { console.log(info) });
}
// retrive()

