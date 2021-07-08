var express = require('express');
var pool = require('./pool.js');
var upload = require('./upload.js');
var router = express.Router();

/* GET home page. */
router.post('/addnewproduct', upload.any(), function(req, res, next) {
   console.log("Body",req.body)
    pool.query("insert into products (categoryid,tailorid,productname,description,materialused,stichingcost,timeduration,offer,offertype,picture,productcatid) values(?,?,?,?,?,?,?,?,?,?,?)", 
    [req.body.categoryid,req.body.tailorid,req.body.productname,req.body.description,req.body.materialused,req.body.stichingcost,req.body.timeduration,req.body.offer,
        req.body.offertype,req.files[0].originalname,req.body.productcatid], function(error,result){

    if(error)
    {console.log(error)
        res.status(500).json({result:false})
    }
    else
    {
        res.status(200).json({result:true})
    }

});
  
});

router.get('/displayAll',function(req,res){

    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as cname, (select T.tailorname from tailor T where T.tailorid=P.tailorid) as tname from products P", function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.post('/deleteproduct',function(req,res){
    pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
       
       if (error){
            res.status(500).json({result:false});
       }
       else{
           
             res.status(200).json({result:true});
       }
    });
});

router.post('/editpicture', upload.single('picture'), function(req, res, next) {
    console.log("Body", req.body)
    pool.query("update products set picture=? where productid=?", [req.file.originalname, req.body.productid],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});



router.post('/editproduct', function(req, res, next) {
    pool.query("update products set categoryid=?,tailorid=?,productname=?,description=?,materialused=?,stichingcost=?,timeduration=?,offer=?,offertype=?,productcatid=? where productid=?",

    [req.body.categoryid,req.body.tailorid,req.body.productname,req.body.description,req.body.materialused,req.body.stichingcost,req.body.timeduration,
        req.body.offer,req.body.offertype,req.body.productcatid, req.body.productid],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});

router.post('/displayproductbycategoryid',function(req,res){

    pool.query("select * from products where categoryid=?",[req.body.categoryid], function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.post('/displayproductbytailor',function(req,res){
    console.log(req.body.tailorid)
    pool.query("select  P.*,(select R.productname from productcategory R where R.productcategoryid=P.productcatid) as pname,(select C.categoryname from category C where C.categoryid=P.categoryid) as catname,(select T.tailorname from tailor T where T.tailorid=P.tailorid) as tname from products P where tailorid=?",
    [req.body.tailorid],function(error,result){
        if(error)
        { console.log(error)
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })

})



module.exports = router;
