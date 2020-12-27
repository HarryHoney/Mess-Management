const exec = require('child_process').exec;
const express = require('express')
const app = express()
const axios = require('axios')
var schedule = require('node-schedule');
const port = 3030
app.get('/server',(req,res)=>{
    var roll_number = req.query.roll_number
    exec(`python pyfiie.py ${roll_number}`,function(e,stdo,stde){
        console.log(stdo);
    })
})

app.listen(port,()=>{
    console.log("Server is up on"+port)
})

var url='https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/mess_trigger'
const time_to_make_a_call =async ()=>{
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const res = await axios.get(url);
  console.log(res.data)
}
var j = schedule.scheduleJob('0 0 0 ? * * *', function(){
  time_to_make_a_call()
});