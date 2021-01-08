const express = require('express')
const route = new express.Router()
const Student = require('../DB/models/student')
const Admin = require('../DB/models/admin')
const mailer = require('../emails/account')
const {getBuffer} = require('../utils/photoBuffer')
const {admin_verification} = require('../middleware/auth_verification')
const {getCurrentCharges,editCharges} = require('../utils/messCharges')


route.get('/me',admin_verification, async(req,res)=>{
    res.send(req.admin)
})

//this function is complete only mailer is need to be added
route.post('/add_new_student', admin_verification,async (req, res) => {
    const data = req.body
    try {
        if(data.photo_buffer != null)
        {
            //ashu will make sure that the user will select image file only
            buffer = await getBuffer(data.photo_buffer)
            data.photo_buffer = buffer
        }
        const student = new Student(data)
        const token = await student.generateAuthToken()
        await student.save()
        // mailer.sendwecomeEmail(data.email,data.name)
        
        res.status(201).send({student,token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

route.patch('/update_student' ,admin_verification,async (req, res) => {
    // Ashu has to pass me name, roll number, password, email of student
    const roll_number = req.body.roll_number
    const arr = ['email','password','name']
    try {
        const student = Student.findOne({roll_number})
        arr.forEach((ele)=>{
            student[ele] = req.body[ele]
        })
        await student.save()
        
        res.send(student)
    } catch (e) {
        res.status(500).send(e)
    }
})

route.delete('/delete_student',admin_verification,async (req, res) => {
    try {
        const student = Student.findOne({roll_number:req.body.roll_number})
        await student.remove()
        res.send(student)
    } catch (e) {
        res.status(500).send(e)
    }
})

route.post('/add_admin',async (req,res)=>{
    const data = req.body
    console.log(data);
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

route.get('/getCurrentCharges',admin_verification,async (req,res)=>{
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