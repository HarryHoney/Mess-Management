const express = require('express')
const Student = require('../DB/models/student')
const {auth_verification} = require('../middleware/auth_verification')
const router = new express.Router()
const {change_Balance} = require('../utils/Account_manage')


//this should be called everytime when user gets to home screen so that it
//can be checked that if it's already logged in or not
router.get('/me',auth_verification,async (req, res) => {
    try{
        const data = await change_Balance(req.student)
        res.status(200).send(data)
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.post('/login',async (req,res)=>{
    try{
        const student = await Student.findByCredentials(req.body.roll_number,req.body.password)
        const token = await student.generateAuthToken()
        await student.save()
        const data = await change_Balance(req.student)
        res.status(200).send({data,token})
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
// mess start date is 1 jan 2021 = 1609459200
//morning breakfast is 32400 as per standard timestamp 9am
// meals removed intially = (1609459200/86400) = 18628
//lunch is 50400 as per standard timestamp 2pm
//dinner is 75600 as per standard timestamp 9pm
router.post('/mess_off', auth_verification,async (req,res)=>{
    try{
        const student = req.student
        if(student.mess_detail.start_date === undefined || student.mess_detail.end_date < Date.now())
        {
            student.mess_detail.start_date = req.body.start_date
            student.mess_detail.end_date = req.body.end_date
            await student.save()
            res.status(201).send({
                Status : 'Successful'
            })
        }
        else{
            const d1 = new Date(student.mess_detail.end_date)
            if(d1 < Date.now()){
                student.mess_detail.start_date = req.body.start_date
                student.mess_detail.end_date = req.body.end_date
                await student.save()
                res.status(201).send({
                    Status : 'Successful'
                })
            }
            else
                throw new Error('The mess is already off')
        }
    }
    catch(e)
    {
        res.status(400).send(e)
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
