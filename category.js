var express = require('express');
var router = express.Router();
var pool = require('./pool.js')
var upload=require('./upload')


router.post('/addnewcategory', upload.any(), function(req, res, next) {
    pool.query("insert into category ( categoryname,categoryicon) values (?,?)",
    [req.body.categoryname,
    req.files[0].originalname,
    ],function(error,result){

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
    pool.query("select * from category ",function(error,result){
       
       if (error){
res.status(500).json([]);
       }
       else{
           
res.status(200).json(result);
       }
    });
});
router.post('/deletecategory',function(req,res){
    pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
       
       if (error){
res.status(500).json({result:false});
       }
       else{
           
res.status(200).json({result:true});
       }
    });
});

router.post('/editicon', upload.single('categoryicon'), function(req, res, next) {
    pool.query("update  category set categoryicon=? where categoryid=?",
    [
     req.file.originalname,
     req.body.categoryid],
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

router.post('/editcategory', function(req, res, next) {
    pool.query("update category set  categoryname=? where categoryid=?",

    [req.body.categoryname,
     
     
      req.body.categoryid,],function(error,result){

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
