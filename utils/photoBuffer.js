const sharp = require('sharp');
const getBuffer = async (uri)=>{
    const buffer = await sharp(uri)
    .rotate()
    .resize(200)
    .toBuffer()
    return buffer
}

const retrive = async (Student,roll_number)=>{
    try
    {
        const data = await Student.findOne({'roll_number':roll_number})
        const inputBuffer = data.photo_buffer
        console.log(inputBuffer)
        sharp(inputBuffer)
        .resize(320, 240)
        .toFile('output.png', (err, info) => { console.log(info) });

        return {'result':'Success'}
    }
    catch(e)
    {
        return {'result':'Failure','message':e}
    }
    
}
module.exports = {
    getBuffer:getBuffer,
    retrieve_photo:retrive
}