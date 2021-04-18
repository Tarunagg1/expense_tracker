const router = require('express').Router();
const expencemodel = require('../app/models/expence');
const { body, validationResult } = require('express-validator');
const {isuserlogin,whenuserlogin} = require('../app/middleware/isuserlogin')
const getuserdata = require('../app/middleware/getuserdata')


router.post('/addexpense',[
        body('amount').not().isEmpty().isNumeric(),
        body('cradittype').not().isEmpty().trim().escape(),
        body('title').not().isEmpty().trim().escape(),                
        body('desc').not().isEmpty().trim().escape(),
    ],isuserlogin,getuserdata,async (req,res)=>{
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(400).json({status:false,err:error,message:"validation error"});
          } else {
              try {
                  let newExpence = new expencemodel({
                      userid:req.userdata[0]._id,
                      email:req.userdata[0].email,
                      title:req.body.title,
                      amount:req.body.amount,
                      cradittype:req.body.cradittype,
                      desc:req.body.desc
                   });
                  const response = await newExpence.save();
                  if(response){
                    res.status(200).json({status:true,resp:response,message:"expense inserted successfully!!"});
                  }else{
                    res.status(400).json({status:false,err:error,message:"someting went wrong"});
                }
              } catch (error) {
                res.status(400).json({status:false,err:error,message:"someting went wrong try letter"});
              }
         }
})


module.exports = router;