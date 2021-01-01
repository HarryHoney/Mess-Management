const express = require('express')
const router = new express.Router()
const Complaint = require('../DB/models/complaint')
const {auth_verification,admin_verification} = require('../middleware/auth_verification')

router.post('/get_complaints',async (req,res)=>{

})

router.post('/add_complaint',auth_verification,async(req,res)=>{

})

router.delete('/delete_complaint',admin_verification,async(req,res)=>{

})