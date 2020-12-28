const express = require('express')
const Student = require('../DB/models/student')
const sharp = require('sharp')
const {sendwecomeEmail}=require('../emails/account')
const router = new express.Router()
const multer = require('multer')

//here using multer I am fixing the kind of file i want the user to upload.
const avatar = multer({
    limits:{
        fileSize : 4000000//fixing the maximum size of the photo to 4 Mb.
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            callback(new Error('The file format is not correct!'))
        }
        callback(undefined,true)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        
        sendwecomeEmail(user.email,user.name)
        await user.save()
        //console.log(user.email)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/me', auth,async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me',auth ,async (req, res) => {
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

router.delete('/users/me',auth, async (req, res) => {
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
router.post('/users/me/avatar',auth,avatar.single('avatar'),async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',auth,async (req,res)=>{
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

module.exports = router
