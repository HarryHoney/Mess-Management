
const roll_number = '17103039' 
const exec = require('child_process').exec;
exec(`python pyfiie.py ${roll_number}`,function(e,stdo,stde){
    console.log(stdo);
})