const express=require('express')  // express imported
const router=express.Router();   // importing express router 

router.get('/',(req,res)=>{ 
    let obj={
        a:'nikhil',
        number:125
    }
    res.json(obj);
})
module.exports=router;