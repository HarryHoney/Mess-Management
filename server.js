const express = require('express')
const app = express();
const connectDB = require('./DB/connection')

connectDB()
app.use(express.json({extended:false}))
const Port = 3000 || process.env.Port;

app.listen(Port,()=>console.log('Server started'))
