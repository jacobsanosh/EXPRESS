const mongoose=require('mongoose')
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please enter an name"]
    },
    email:{
        type:String,
        required:[true,"enter an email"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"enter an phone number"]
    },
    timestamp: {
        type: Date,
        default: Date.now
      }

});
const contact=mongoose.model('Contact',contactSchema)
module.exports=contact