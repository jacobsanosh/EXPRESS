const express=require('express')
const router=express.Router()
const {getContact,postContact,putidContact,getidContact,deleteidContact}=require('../controllers/ContactController');
const validateuserTokens = require('../middleware/validateToken');
// router.route('/').get((req,res)=>{
//     res.status(200).json({message:"successfully connected"})
// });
// router.route('/').post((req,res)=>{
//     res.status(200).json({message:"created contact"})
// });
// router.route('/:id').get((req,res)=>{
//     res.status(200).json({message:`get contact${req.params.id}`})
// });
// router.route('/:id').put((req,res)=>{
//     res.status(200).json({message:`update contact${req.params.id}`})
// });
// router.route('/:id').delete((req,res)=>{
//     res.status(200).json({message:`delete contact${req.params.id}`})
// });
//this is using controllers//
router.use(validateuserTokens)
router.route('/').get(getContact).post(postContact)
router.route('/:id').get(getidContact).put(putidContact).delete(deleteidContact);
module.exports=router