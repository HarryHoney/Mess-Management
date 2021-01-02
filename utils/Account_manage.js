//This file contains the logic/Algorithm of charge formation
const mess_Charges  = require('../DB/models/mess_charges')
const change_Balance = async (student)=>{
    if(student.mess_detail.start_date === undefined)
        return student
    try{
        const start = new Date(student.mess_detail.start_date)
        const end = new Date(student.mess_detail.end_date)
        const current  = new Date(Date.now().toString.slice(0,15))//today's starting ie all meals of today are not counted
        const last_checkin = new Date(student.last_checkin)
        student.last_checkin = current.toString
        let total_days = (current - last_checkin)/(86400000)
        let leaving_dates = 0
        const charges = mess_Charges.findOne({id:1})
        if(total_days <= 0)
            return student
        if(current<start){
            //do nothing as all days are paid
        }
        else if(current>=start && current<=end)
        {
            if(last_checkin >= start)
            {
                leaving_dates = total_days
            }
            else{
                leaving_dates = (current - start)/86400000
            }
        }
        else{
            //here all leave days are gone
            if(last_checkin >= start )
            {
                start = last_checkin
            }
            leaving_dates = (end - start)/86400000
            student.mess_detail = {}
        }
        const total_cost = (total_days-leaving_dates) * (charges.lunch + charges.dinner + charges.breakfast)
        student.balance = student.balance - total_cost 
        await student.save()
        return student
    }
    catch(e){
        return new Error(e)
    }
    
}

module.exports = {
    change_Balance
}