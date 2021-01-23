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

        data.last_checkin = 'Fri Jan 01 2021'
        const student = new Student(data)
        const token = await student.generateAuthToken()
        student.history = {}
        student.history.extra_history = []
        student.history.mess_history = []
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

route.get('/students_off',admin_verification,async(req,res)=>{

    try{
        let now = new Date
        const data = await Student.find()
        let student_list = []
        data.forEach((curr_student)=>{
            if(curr_student.mess_detail.start_date !== undefined)
            {

                const left = new Date(curr_student.mess_detail.start_date)
                const right = new Date(curr_student.mess_detail.end_date)
                if(left<=now && right>=now){
                    student_list.concat(curr_student)
                }
            }
        })
        res.status(201).json(
            {
                "Status":"Successful",
                "list":student_list
            })
    }
    catch(e){
        res.status(401).send(e)
    }

})

route.post('/impose_charges',admin_verification,async(req,res)=>{

    const description = req.body.description
    const cost = req.body.cost
    const roll_number = req.body.roll_number
    try
    {
        let data = await Student.findOne({roll_number:roll_number})
        data.balance = data.balance - cost
        data.history.extra_history = data.history.extra_history.concat({"description":description,"cost":cost})
        await data.save()
        res.send({"Status":"Successfull"});
    }
    catch(e)
    {
        res.status(401).send(e)
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