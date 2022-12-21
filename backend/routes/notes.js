const express=require('express')  // express imported
const router=express.Router();   // importing express router 

router.get('/',(req,res)=>{ 
    res.json([]);
})
module.exports=router;