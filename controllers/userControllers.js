const asyncHandler=require('express-async-handler')
const users=require('../models/userModel')
const bcrypt=require('bcrypt')
const saltRound=10
const salt=bcrypt.genSaltSync(saltRound)
const jwtToken=require('jsonwebtoken')

const getUser=asyncHandler(async(req,res)=>{
    console.log("hello")
    res.status(200).json({message:"successfully connected"})
});
const postUser=asyncHandler(async(req,res)=>{
    const{uname,email,password}=req.body;
    console.log(uname,email,password)
    if(!uname||!email||!password)
    {
        res.status(400)
        throw new Error("all fileds are needed uname enmail and password")
    }
    const user_avail=await users.findOne({uname});
    if(user_avail){
        res.status(400);
        throw new Error("user already exist")
    }
    const hashedPassword= bcrypt.hashSync(password,salt)
    // console.log(hashedPassword)
    const new_user=await users.create({
        uname,
        email,
        password:hashedPassword  
    })
    res.status(200).json(new_user)
})
const gettidUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:"getting user by id",data:req.user})
})
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password)
    {
        res.status(400);
        throw new Error("enter valid email or password");
    }
    const login_user=await users.findOne({email})
    const isPasswordMatch =await bcrypt.compareSync(password, login_user.password);
    if(login_user&&isPasswordMatch){
        const accessToken=jwtToken.sign({
            user:{
                uname:login_user.uname,
                email:login_user.email,
                id:login_user.id
            }
        },process.env.SECRET_KEY,{expiresIn:"10m"})
        res.status(200).json({message:"into login user",accessToken})
    }
    else{
        res.status(400);
        throw new Error("invalid user name or password")
    }

})
module.exports={getUser,postUser,gettidUser,loginUser}