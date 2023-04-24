const asyncHandler=require('express-async-handler')
const jwtTokent=require('jsonwebtoken')

const validateuserTokens=asyncHandler(async(req,res,next)=>{
    console.log("on vlidate token")
    let token;
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1]
        jwtTokent.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400);
                throw new Error("Invalid token");
            }
            else{
                console.log(decoded)
                req.user=decoded.user;
                next();
            }
        })
        
    }
    else{
        res.status(400);
        throw new Error("Invalid format da")
    }

})
module.exports=validateuserTokens