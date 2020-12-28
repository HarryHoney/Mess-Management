const sharp = require('sharp');
const getBuffer = async (uri)=>{
    const buffer = await sharp(uri)
    .rotate()
    .resize(200)
    .toBuffer()
    return buffer
}

module.exports = {
    getBuffer:getBuffer
}