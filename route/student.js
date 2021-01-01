const express = require('express')
const Student = require('../DB/models/student')
const {auth_verification} = require('../middleware/auth_verification')
const mailer = require('../emails/account')
const router = new express.Router()
const {getBuffer} = require('../utils/photoBuffer')

//this function is complete only mailer is need to be added
router.post('/add_new_student', async (req, res) => {
    const data = req.body
    console.log(data)
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

router.patch('/update' ,auth_verification,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'balance','mess_detail']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update)=> req.student[update] = req.body[update])

        await req.student.save()
        
        res.send(req.student)
    } catch (e) {
        res.status(500).send(e)
    }
})

//this should be called everytime when user gets to home screen so that it
//can be checked that if it's already logged in or not
router.get('/me',auth_verification,async (req, res) => {
    res.send(req.student)
})


router.delete('/me',auth_verification,async (req, res) => {
    try {
        await req.student.remove()
        res.send(req.student)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const student = await Student.findByCredentials(req.body.roll_number,req.body.password)
        const token = await student.generateAuthToken()
        await student.save()
        res.send({student , token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/logout',auth_verification, async(req,res)=>{
    try{
        const student = req.student
        const itemToRemove = req.curr_token;
        const filteredList = student.tokens.filter((item) => item.token !== itemToRemove);
        student.tokens = filteredList
        await student.save()
        res.json({
            Status:'Done'   
        })
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/logoutAll',auth_verification,async (req,res)=>{
    try{
        req.student.tokens = []
        await req.student.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/testing_route',(req,res)=>{
    res.json({
        Test:"Success"
    });
})
module.exports = {
    studentRouter:router
}
