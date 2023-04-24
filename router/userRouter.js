const express=require('express')
const router=express.Router();
const validateuserTokens=require('../middleware/validateToken')
const {getUser,postUser,gettidUser,loginUser}=require('../controllers/userControllers')
router.route('/').get(getUser).post(postUser);
router.route('/current').post(validateuserTokens,gettidUser)
router.route('/login').post(loginUser)
module.exports=router