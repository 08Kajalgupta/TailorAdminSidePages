var express = require('express');
var pool = require('./pool.js');
var upload = require('./upload.js');
var router = express.Router();

/* GET home page. */
// router.post('/addnewtailor', upload.any(), function(req, res, next) {
//    console.log("body",req.query)
//     pool.query("insert into tailor (categoryid,tailorname,tailoraddress1,tailoraddress2,state,city,latitude,longitude,description,url,emailid,mobileno,registrationno,photocopy,logo,status,password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 

//     [req.body.categoryid,req.body.tailorname,req.body.tailoraddress1,req.body.tailoraddress2,req.body.state,req.body.city,req.body.latitude,
//     req.body.longitude,req.body.description,req.body.url,req.body.emailid,req.body.mobileno,req.body.registrationno,
//     req.files[0].originalname,req.files[1].originalname,req.body.status,req.body.password], function(error,result){

//     if(error)
//     {console.log(error)
//         res.status(500).json({result:false})
//     }
//     else
//     {
//         res.status(200).json({result:true})
//     }

// });
  
// });

router.post('/addnewtailor',function(req,res){
    const qry="insert into tailor set ?";
    const body=req.body
    pool.query(qry,body,function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})




router.get('/displayAll',function(req,res){

    pool.query("select T.*,(select ct.categoryname from category ct where ct.categoryid=T.categoryid) as catname,(select S.statename from states S where S.stateid=T.state)as sname,(select C.cityname from city C where C.cityid=T.city) as cname from tailor T", function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.post('/deletetailor',function(req,res){
    pool.query("delete from tailor where tailorid=?",[req.body.tailorid],function(error,result){
       
       if (error){
            res.status(500).json({result:false});
       }
       else{
           
             res.status(200).json({result:true});
       }
    });
});

{/*router.post('/editurl', upload.single('url'), function(req, res, next) {
    pool.query("update  tailor set url=? where tailorid=?", [req.file.originalname, req.body.tailorid],function(error,result){

        if(error)
        {
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});*/}


router.post('/editphotocopy', upload.single('photocopy'), function(req, res, next) {
    pool.query("update  tailor set photocopy=? where tailorid=?", [req.file.originalname, req.body.tailorid],function(error,result){

        if(error)
        {
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});


router.post('/editlogo', upload.single('logo'), function(req, res, next) {
    pool.query("update  tailor set logo=? where tailorid=?", [req.file.originalname, req.body.tailorid],function(error,result){

        if(error)
        {
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});

router.post('/edittailor', function(req, res, next) {
    pool.query("update tailor set categoryid=?,tailorname=?,tailoraddress1=?,tailoraddress2=?,state=?,city=?,latitude=?,longitude=?,description=?,url=?,emailid=?,mobileno=?,registrationno=?,status=?,password=? where tailorid=?",

    [req.body.categoryid,req.body.tailorname, req.body.tailoraddress1, req.body.tailoraddress2, req.body.state, req.body.city,
        req.body.latitude,req.body.longitude,req.body.description,req.body.url,req.body.emailid,req.body.mobileno,req.body.registrationno,
        req.body.status,req.body.password, req.body.tailorid],function(error,result){

        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }

        else{
            res.status(200).json({result:true})
        }

    })

});

router.post('/displaytailorbycategoryid',function(req,res){

    pool.query("select * from tailor where categoryid=?",[req.body.categoryid], function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})



router.post('/checktailorlogin', function(req, res, next) {
    pool.query("select * from tailor where mobileno=? and password=?",[req.body.mobileno,req.body.password],function(error,result){

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

router.post('/displaytailorbyid',function(req,res){
    pool.query("select * from tailor where tailorid=?",[req.body.tailorid],function(error,result){
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
