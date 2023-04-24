const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    uname:{
        type:String,
        required:[true,"please add uname"]
    },
    email:{
        type:String,
        required:[true,"please add email"],
        unique:[true,"email already exist"]
    },
    password:
    {
        type:String,
        required:[true,"enter the password"]
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
})
const users=mongoose.model('Users',userSchema);
module.exports=users