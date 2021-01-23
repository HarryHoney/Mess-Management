const express = require('express')
const router = new express.Router()
const Complaint = require('../DB/models/complaint')
const {auth_verification,admin_verification} = require('../middleware/auth_verification')

router.get('/get_all_complaints',async (req,res)=>{
    
    try{
        const data = await Complaint.find()
        res.send(data)
    }
    catch(e)
    {
        res.status(401).send(e)
    }
})

router.get('/get_inactive_complaints',async(req,res)=>{
    try{
        const data = await Complaint.find({Status:0})
        res.send(data)
    }
    catch(e){
        res.status(401).send(e)
    }
})

router.get('/get_active_complaints',async(req,res)=>{
    try{
        const data = await Complaint.find({Status:1})
        res.send(data)
    }
    catch(e){
        res.status(401).send(e)
    }
})

router.post('/admin/change_complaint_status',admin_verification,async(req,res)=>{
    //here _id is complaint id
    const _id = req.body._id
    try{
        var data = await Complaint.findById({_id})
        if(data.Status === 2)
            res.json({
                "Result":"The issue is already resolved!"
            })
        data.Status = data.Status + 1
        await data.save()
        res.status(201).send(data)
    }
    catch(e){
        res.status(401).send(e)
    }

})
router.post('/student/add_complaint',auth_verification,async(req,res)=>{

    const data = req.body
    try{
        const newComplaint = new Complaint(data)
        await newComplaint.save()
        res.json({
            Status: "Uploaded Successfully"
        })
    }
    catch(e){
        res.status(401).send(e)
    }
})

router.delete('admin/delete_complaint',admin_verification,async(req,res)=>{
    // I am expecting _id in this route
    const _id = req.body._id
    try{
        await Complaint.remove({_id})
        res.json({
            Status: "Deleted Successfully"
        })
    }
    catch(e){
        res.status(401).send(e)
    }
})

module.exports = {
    complaintRouter : router
}