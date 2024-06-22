const express=require('express')
const morgan=require('morgan')
const cors= require('cors')

const app=express()
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use('/auth',require('./routes/register'))//need to pass username,email,password
app.use('/auth',require('./routes/login'))//useremail and password
app.use('/auth',require('./routes/verify'))
app.use('/dashboard',require('./routes/dashboard'))

app.listen(8000,(req,res)=>{
    console.log("server is running on port 8000")
})