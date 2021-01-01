const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const connectDB = require('./DB/connection')
const {studentRouter} = require('./route/student')
const {adminRouter} = require('./route/admin')
const {complaintRouter} = require('./route/complaint')

connectDB()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json({extended:false}))
app.use('/student',studentRouter)
app.use('/admin',adminRouter)
app.use('/',complaintRouter)

const Port = 3000 || process.env.Port;

app.listen(Port,()=>console.log(`Server started at port ${Port}`))
