const Student = require('./DB/models/student')
const connectDB = require('./DB/connection')


const sharp = require('sharp');
const savingData = async (data)=>{
    let ss = await connectDB()
    const buffer = await sharp('input.jpeg')
    .rotate()
    .resize(200)
    .toBuffer()
    data.photo_buffer = buffer
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
    balance: 23000,
    password:'honeymoney'
}

// savingData(features1).catch((err)=>{
//     console.log(err)
// })
const retrive = async (roll_number)=>{
    let ss = await connectDB()
    try
    {
        const data = await Student.findOne({'roll_number':roll_number})
        // const inputBuffer = data.photo_buffer
        // delete data.password
        console.log(typeof(data.tokens))
        // sharp(inputBuffer)
        // .resize(320, 240)
        // .toFile('output.png', (err, info) => { console.log(info) });

        return {'result':'Success'}
    }
    catch(e)
    {
        return {'result':'Failure','message':e}
    }
    
}
console.log( retrive(17103034))

console.log({'result':'Success'})