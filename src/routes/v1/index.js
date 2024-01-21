const express=require('express')
const router=express.Router();
const {Info}=require('../../controllers')



router.get('/info' , Info.info);



module.exports=router



