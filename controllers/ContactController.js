//creating an pulbic contact for get request
const asyncHandler=require('express-async-handler')
const Contact=require('../models/contctModel')
const getContact=asyncHandler(async(req,res)=>{
    const data=await Contact.find({user_id:req.user.id});
    if(!data)
    {
        res.status(404);
        throw new Error("user not found")
    }
    // res.status(200).json({message:"hello to my site"})
    res.status(200).json(data)
});

const postContact=asyncHandler(async(req,res)=>{
    console.log("the data from user is",req.body)
    const{name,email,phone}=req.body;
    if(!name || !email ||!phone)
    {
        res.status(404);
        throw new Error("all fields are mandtory")
    }
    const user=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    //for else section
    // res.status(201).json({message:"contact created succesfully "})
    if(user)
    {
        res.status(201).json(user)
    }
    else{
        res.status(400);
        throw new Error("something went wrong")
    }
});
const putidContact=asyncHandler(async(req,res)=>{
    console.log("on put user")
    const user=await Contact.findById(req.params.id);
    if(!user)
    {
        res.status(404);
        throw new Error("user not found and update not done")
    }
    // console.log(typeof(user.user_id)) 
    if(user.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("user dont have any permission to update")
    }
    const getUser=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({message:`updated user ${req.params.id}`,getUser})
});
const getidContact=asyncHandler(async(req,res)=>{
    console.log("in get user by id")
    const user=await Contact.findById(req.params.id);
    if(!user)
    {
        res.status(404);
        throw new Error("user is not found")
    }
    res.status(200).json({message:`returning data of user ${req.params.id}`,user})
});
const deleteidContact=asyncHandler(async(req,res)=>{
    // console.log("on delete user")
    const user=await Contact.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("cant find the user")
    }
    if(user.user_id.toString()!==req.user.id){
        res.status(404);
        throw new Error("invalid access to the user")
    }
    const deleteUser=await Contact.deleteOne({_id:req.params.id});
    console.log(deleteUser)
    if(!deleteUser)
    {
        res.status(404);
        throw new Error("cant delete or user not found")
    }
    res.status(200).json({message:`delteting the details of user ${req.params.id}`})
});
module.exports={getContact,postContact,putidContact,getidContact,deleteidContact}