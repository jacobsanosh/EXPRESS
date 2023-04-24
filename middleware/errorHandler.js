const {constants}=require('../constants')
console.log(constants)
const errorHandler=(err,req,res,next)=>{
    const status=res.statusCode ? res.statusCode:500;
    
    switch(status){
        case constants.VALIDATION_ERROR:
            console.log("validation error")
            res.json({title:"validation error",message:err.message,stackTrace:err.stack});
            break;
        case constants.UNAUTHERIZER:
            res.status(status).json({title:"unautherizer access",message:err.message,stackTrace:err.stack});
        case constants.FOHBIDEN:
            res.status(status).json({title:"forbiden error",message:err.message,stackTrace:err.stack});
        case constants.NOT_FOUND:
            res.status(status).json({title:"forbiden access",message:err.message,stackTrace:err.stack});
        case constants.SERVER_ERROR:
            res.status(status).json({title:"server error",message:err.message,stackTrace:err.stack});

    }
    res.status(500).json({title:"not found",message:err.message,stackTrace:err.stack})
}
module.exports=errorHandler;