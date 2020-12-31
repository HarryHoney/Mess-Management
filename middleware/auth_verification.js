const jwt = require('jsonwebtoken')
const Student = require('../DB/models/student')

const auth_verification = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'getting token')
        const student = await Student.findOne({roll_number: decoded.roll_number,'tokens.token':token
    })
        if(!student)
        {
            throw new Error()
        }
        req.curr_token = token
        req.student = student
        next()
    }catch(e){
        res.status(401).send({error:'Please Authenticate',e})
    }
}

module.exports =  auth_verification
