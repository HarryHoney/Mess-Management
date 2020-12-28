const express = require('express')
const Student = require('../DB/models/student')
const sharp = require('sharp')
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
        console.log(student)
        await student.save()
        // mailer.sendwecomeEmail(data.email,data.name)
        
        res.status(201).send(student)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/students/me',async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me' ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        updates.forEach((update)=> req.user[update] = req.body[update])

        await req.user.save()
        
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    }catch(e){
        res.status(400).send(e)
    }
})
//                    these are middlewares          
router.post('/users/me/avatar',async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',async (req,res)=>{
    try{
        req.user.avatar=undefined
        await req.user.save()
        res.send('Removed')
    }catch(e){
        res.status(500).send(e)
    }
})
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error('could not find')
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/testing_route',(req,res)=>{
    res.json({
        Test:"Success"
    });
})
module.exports = router
