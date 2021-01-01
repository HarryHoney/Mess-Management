const express = require('express')
const route = new express.Router()
const Admin = require('../DB/models/admin')
const {admin_verification} = require('../middleware/auth_verification')

route.get('/me',admin_verification,async(req,res)=>{
    res.send(req.admin)
})

route.post('/add_admin',async (req,res)=>{
    const data = req.body
    try{
        const admin = new Admin(data)
        const curr_token = await admin.generateAuthToken()
        admin.save()
        res.json({
            'admin':admin,
            'token':curr_token
        })
    }
    catch(e)
    {
        res.status(401).send(e)
    }
    
})

route.post('/login',async (req,res)=>{
    
    const userID = req.body.userID
    const password = req.body.password
    try{
    const admin = await Admin.findByCredentials(userID,password)
    const token = await admin.generateAuthToken()
    admin.save()
    res.send({
        admin,
        token
    })
    }
    catch(e)
    {
        res.status(401).json(e)
    }
})

module.exports={
    adminRouter: route
}