const express = require('express')
const route = new express.Router()
const Admin = require('../DB/models/admin')
const {admin_verification} = require('../middleware/auth_verification')
const {getCurrentCharges,editCharges} = require('../utils/messCharges')
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

route.get('/logout',admin_verification,async (req,res)=>{
    const token = req.curr_token
    try{
    let remaining = []
    req.admin.tokens.forEach(element => {
        if(element.token !== token)
        {
            remaining.push(element)
        }
    })
    req.admin.tokens = remaining
    await req.admin.save()
    res.json({
        Status:'Done'
    })
    }
    catch(e){
        res.status(401).send(e)
    }
})

route.get('/logoutAll',admin_verification,async (req,res)=>{
    try
    {
    let remaining = []
    req.admin.tokens = remaining
    await req.admin.save()
    res.json({
        Status:'Done'
    })
    }
    catch(e){
        res.status(401).send(e)
    }
})

route.get('getCurrentCharges',admin_verification,async (req,res)=>{
    try{
    const data = await getCurrentCharges()
    res.status(201).send(data)
    }
    catch(e){
        res.status(401).send(e)
    }
})

route.post('/editCharges',admin_verification,async (req,res)=>{
    const changes = req.body
    changes.edited_by = req.admin.Name
    try{
    const data = await editCharges(changes)
    res.status(201).send(data)
    }
    catch(e){
        res.status(401).send(e)
    }
})

module.exports={
    adminRouter: route
}