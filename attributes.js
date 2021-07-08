var express = require('express');
var router = express.Router();
var pool = require('./pool.js')
var upload=require('./upload')


router.post('/addnewattribute', upload.any(), function(req, res, next) {
    console.log("body:",req.body)
    pool.query("insert into attributes (attributename,icon,categoryid,productcategoryid) values (?,?,?,?)",
    [req.body.attributename,
    req.files[0].originalname,req.body.categoryid,req.body.productcategoryid], function(error,result){

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
    pool.query("select A.* ,(select C.categoryname from category C where C.categoryid=A.categoryid) as cname,(select PC.productname from productcategory PC where PC.productcategoryid=A.productcategoryid) as pcname from attributes A",function(error,result){
       
       if (error){
        res.status(500).json([]);
       }
       else{
           
        res.status(200).json(result);
       }
    });
});
router.post('/deleteattributes',function(req,res){
    pool.query("delete from attributes where attributeid=?",[req.body.attributeid],function(error,result){
       
       if (error){
res.status(500).json({result:false});
       }
       else{
           
res.status(200).json({result:true});
       }
    });
});

router.post('/editicon', upload.single('icon'), function(req, res, next) {
    pool.query("update  attributes set icon=? where attributeid=?",
    [
     req.file.originalname,
     req.body.attributeid],
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

router.post('/editattributes', function(req, res, next) {
    pool.query("update attributes set  attributename=? where attributeid=?",

    [req.body.attributename,
      req.body.attributeid],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});




module.exports = router;
