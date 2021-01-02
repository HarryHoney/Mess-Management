const mess_Charges = require('../DB/models/mess_charges')

const getCurrentCharges = async ()=>{
    try{
    const data = await mess_Charges.findOne({id:1})
    if(data == null){
        const obj = {
            id : 1,
            breakfast : 30,
            lunch : 30,
            dinner : 30,
            edited_by : 'default Set'
        }
        const singleton = new mess_Charges(obj)
        await singleton.save()
        data = singleton
    }
    return data
    }
    catch(e){
        console.log(e)
        return e;
    }
}

const editCharges = async (changes)=>{

    try{
        let data = await mess_Charges.findOne({id:1})
        data.forEach(element => {
            data[element] = changes[element]
        })
        await data.save()
        return data
        }
        catch(e){
            console.log(e)
            return e
        }

}

module.exports = {
    getCurrentCharges : getCurrentCharges,
    editCharges : editCharges
}