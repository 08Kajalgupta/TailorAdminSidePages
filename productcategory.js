var express = require('express');
var router = express.Router();
var pool = require('./pool.js')
var upload=require('./upload')


router.post('/addnewproductcategory', upload.any(), function(req, res, next) {
    console.log("body:",req.body)
    pool.query("insert into productcategory (productname,description,icon,categoryid,productid) values (?,?,?,?,?)",
    [req.body.productname,req.body.description,
    req.files[0].originalname,req.body.categoryid,req.body.productid], function(error,result){

        if(error)
        {
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});
router.get('/displayall',function(req,res){
    pool.query("select PC.* ,(select C.categoryname from category C where C.categoryid=PC.categoryid) as cname,(select P.productname from products P where P.productid=PC.productid) as pname from productcategory PC ",function(error,result){
       
       if (error){
res.status(500).json([]);
       }
       else{
           
res.status(200).json(result);
       }
    });
});
router.post('/deleteproductcategory',function(req,res){
    pool.query("delete from productcategory where productcategoryid=?",[req.body.productcategoryid],function(error,result){
       
       if (error){
res.status(500).json({result:false});
       }
       else{
           
res.status(200).json({result:true});
       }
    });
});

router.post('/editicon', upload.single('icon'), function(req, res, next) {
    pool.query("update  productcategory set icon=? where productcategoryid=?",
    [
     req.file.originalname,
     req.body.productcategoryid],
     function(error,result){

        if(error)
        {
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});

router.post('/editproductcategory', function(req, res, next) {
    pool.query("update productcategory set  productname=?,description=? where productcategoryid=?",

    [req.body.productname,req.body.description,
      req.body.productcategoryid],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});

router.post('/displayproductcategorybycategoryid',function(req,res){

    pool.query("select * from productcategory where categoryid=?",[req.body.categoryid], function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})




module.exports = router;
