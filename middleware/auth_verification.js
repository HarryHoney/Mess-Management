const jwt = require('jsonwebtoken')
const Student = require('../DB/models/student')
const Admin = require('../DB/models/admin')
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
        res.status(401).send({error:'Please Authenticate the student',e})
    }
}

const admin_verification = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer','').toString().trim()
        const decoded = jwt.verify(token,'getting token')
        const admin = await Admin.findOne({userID:decoded.userID,'tokens.token':token})
        if(!admin){
            throw new Error()
        }
        req.curr_token = token
        req.admin = admin
        next()
    }
    catch(e){
        res.status(401).send({error:'Please Authenticate the admin',e})
    }
}

module.exports =  {
    auth_verification : auth_verification,
    admin_verification : admin_verification
}
