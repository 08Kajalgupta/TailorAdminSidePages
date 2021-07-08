var express = require('express');
const pool = require('./pool');
var router = express.Router();
var jwt=require("jsonwebtoken");
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage= new LocalStorage('./scratch');


/* GET home page. */
router.post('/chackadminlogin', function(req, res, next) {
    pool.query("select * from adminlogin where emailid=? and password=?",[req.body.emailid,req.body.password],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            if(result.length==0)
            {
                res.status(200).json({result:false})
            }
            else{
                res.status(200).json({result:true,data:result})
            }
        }
        
    })
 
});

router.get('/assignToken',function(req,res){
    try{
    var token=jwt.sign({id:100},'itmuniversegwaliormadhyapradesh',{expiresIn:'120s'})
    console.log(token)
    localStorage.setItem("token",token)

    }
    catch(e){
        console.log("GET TOKEN:",e)


    }

})

router.get('/readToken',function(req,res,next){
    try{
        var v=jwt.verify(
            localStorage.getItem("token"),
            'itmuniversegwaliormadhyapradesh'
        );
        //console.log(res)
        console.log("token",v);
    }

    catch(e){
        console.log("Error",e.message);
    }
})

module.exports = router;
