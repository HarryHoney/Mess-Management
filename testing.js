const Student = require('./DB/models/student')
const connectDB = require('./DB/connection')
const jwt  = require('jsonwebtoken')
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxNzEwMzAxNCIsImlhdCI6MTYwOTQ4ODI0OSwiZXhwIjoxNjA5NjYxMDQ5fQ.AMafB2csDZKKHPxU_q7WdDLFE09RXJo6RYisH737pAg'

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
// console.log( retrive(17103034))
const token2='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxNzEwMzA2NyIsImlhdCI6MTYwOTQ4NjMwMCwiZXhwIjoxNjA5NTcyNzAwfQ.tAOq41JVfhhE_oXKmcsb9HVIcOVavHxAk_4lu3X15ng'
// console.log({'result':'Success'})
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xsX251bWJlciI6IjE3MTAzMDc5IiwiaWF0IjoxNjA5NDg2NjIxLCJleHAiOjE2MDk2NTk0MjF9.Dsw7K7vmgljeL3pYKwfByeBo4oR1NUxDkOWGdpMe8Xk'
const decoded = jwt.verify(token2,'getting token')
console.log(decoded)