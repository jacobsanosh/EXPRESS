// console.log("hello im in express js")
const express=require('express')
const dotenev=require('dotenv').config()
const app=express();
const port=process.env.PORT||3000;
app.use(express.json())//middle ware for parsing the data from user
const ContactRouter=require('./router/ContactRouter');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbconnection');
const UserRouter=require('./router/userRouter')
connectDb();
// app.get('/',(req,res)=>{
//     // res.send("hello")
//     res.status(200).json({message:"hello"})
// })
app.use('/api/contact',ContactRouter);
app.use('/api/users',UserRouter);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`listening on ${port}`)
})