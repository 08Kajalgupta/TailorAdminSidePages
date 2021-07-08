import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
// import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'
import swal from "sweetalert"
import {isBlank} from "./Checks"
import swalhtml from "@sweetalert/with-react"
import renderHTML from "react-render-html"
import {ServerURL,postData,postDataAndImage,getData} from "./FetchNodeServices"
import Paper from '@material-ui/core/Paper';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CSVLink } from "react-csv";



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
      height:'auto',
      width:'auto',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    
           
  },

  subdiv:{
      padding:20,
    // height:'auto',
      width:880,
      marginTop:10,
      display:'flex',
      justifyContent:'center',
    alignItems:'center',
      borderRadius:15,
    //  outline:'10px solid #dfe6e9'
      
  },

  input: {
      display: 'none',
    },

  formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 700,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Product(props)
{ const [list,setList]=useState([])
  const classes = useStyles();
  var tailorid = props.tid
// const [CategoryName,setCategoryName]=useState('')
const [CategoryId,setCategoryId]=useState('')
const [ProductId,setProductId]=useState('')
const [Icon,setIcon]=useState({bytes:'',file:'/noimage.JFIF'})
const [IconSaveCancel,setIconSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [CatList,setCatList]=useState([])
const [TailorList,setTailorList]=useState([])
const [ProductCatList,setProductCatList]=useState([])
const [TailorName,setTailorName]=useState('')
const [ProductName,setProductName]=useState('')
const [Description,setDescription]=useState('')
const [MaterialUsed,setMaterialUsed]=useState('')
const [StitchingCost,setStitchingCost]=useState('')
const [ProductCatId,setProductCatId]=useState('')
const [showTailorname,setshowTailorname]=useState('')
const [Duration,setDuration]=useState('')
const [Offer,setOffer]=useState('')

const [OfferType,setOfferType]=useState('')

            

  const fetchAllCategory = async () => {
          var result = await getData("category/displayall");
          setCatList(result);
        };
        const showCategory = () => {
            return CatList.map((item) => {
              return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
            });
          };
        // const fetchAllTailors = async () => {
        //     var result = await getData("tailor/displayall");
        //     setTailorList(result);
        //   };
        //   const showTailor= () => {
        //       return TailorList.map((item) => {
        //         return <MenuItem value={item.tailorid}>{item.tailorname}</MenuItem>;
        //       });
        //     };
            const fetchAllTailorsbyId = async () => {
                var body={tailorid:tailorid}
                var result = await postData("tailor/displaytailorbyid",body);
                setTailorList(result);
                setTailorName(result[0].tailorid)
                setshowTailorname(result[0].tailorname)
               
              
               
              };
              const showTailorbyid= () => {
                  return TailorList.map((item) => {
                    return <MenuItem value={item.tailorid}>{item.tailorname}</MenuItem>;
                  });
                };
const fetchAllProducts = async () => {
    var body = {tailorid:tailorid}
            var result = await postData("product/displayproductbytailor",body);
            setList(result);
            
          };
          // const fetchAllCategoryProducts = async () => {
          //   var result = await getData("productcategory/displayall");
          //   setProductCatList(result);
          // };
          // const showProductCategory= () => {
          //   return ProductCatList.map((item) => {
          //     return <MenuItem value={item.productcategoryid}>{item.productname}</MenuItem>;
          //   });
          // };
        
const handleIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      // setIconSaveCancel(true)
    }
    const handleEditIcon=(event)=>{
      setIcon({bytes:event.target.files[0],
          file:URL.createObjectURL(event.target.files[0])})
          setIconSaveCancel(true)
        }

const handleDelete = async () => {
  var body = {productid:ProductId}
  var result = await postData("product/deleteproduct",body)
  if (result){
    swal({
        title: "Product Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      })
      setOpen(false)
      fetchAllProducts()
}
else{
  swal({
    title: "Fail To Delete Record ",
    icon: "success",
    dangerMode: true,
  })
  }
}
const handleWarning=(rowData)=>{
  setRowData(rowData)
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDelete(getRowData)
        
      } 
    });
 }

const handleCancelIcon=()=>{
  
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`})
  setIconSaveCancel(false)
}

const handleClickSaveIcon=async()=>{
 
  var formData= new FormData()
  
  formData.append("picture",Icon.bytes)
  formData.append("productid",ProductId)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('product/editpicture',formData,config)
  if(result){
      swal({
          title: "Picture Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        // setIcon({bytes:"",file:`${ServerURL}/images/${Icon.file}`})
        setIconSaveCancel(false)
      
}
}

const handleEdit=async ()=>{
    var error=false
    var msg="<div>"
    if(isBlank(CategoryId))
    {error=true
        msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>"
      }
  if(isBlank(TailorName))
        {error=true
            msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Tailor Name Should Not Be Blank..</b></font><br>"
          }
      if(isBlank(ProductName))
          {error=true
              msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Product Name Should Not Be Blank..</b></font><br>"
            } 
      if(isBlank(MaterialUsed))
            {error=true
                msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please fill the material used..</b></font><br>"
              }
      if(isBlank(StitchingCost))
              {error=true
                  msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select cost of stitching..</b></font><br>"
                } 
      if(isBlank(Duration))
                {error=true
                    msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select time duration..</b></font><br>"
                  }  
  
    if(error)
    {
        swalhtml(renderHTML(msg))
    }
  else{
  var body={tailorid:TailorName,categoryid:CategoryId,productname:ProductName,description:Description,materialused:MaterialUsed,stichingcost:StitchingCost,timeduration:Duration,offer:Offer,offertype:OfferType,productcatid:ProductCatId,productid:ProductId};
  var result = await postData("product/editproduct", body);
  if (result) {
    swal({
      title: "Product Updated Successfully",
      icon: "success",
      dangerMode: true,
    });
  }}

}

useEffect(function(){
    fetchAllProducts();
    fetchAllCategory();
    fetchAllTailorsbyId();
    // fetchAllCategoryProducts();
},[])


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////////Edit Dialoge////////////////////////////////////////////////


const [open, setOpen] = React.useState(false);
const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setProductId(rowData.productid)
  setCategoryId(rowData.categoryid);
  setTailorName(rowData.tailorid)
  setProductCatId(rowData.productcategoryid)
  setProductName(rowData.productname)
  setDescription(rowData.description)
  setMaterialUsed(rowData.materialused)
  setStitchingCost(rowData.stichingcost)
  setDuration(rowData.timeduration)
  setOffer(rowData.offer)
  setOfferType(rowData.offertype)
  setIcon({ bytes: "", file: `${ServerURL}/images/${rowData.picture}` });
  FillProductbyCategory(rowData.categoryid)
  
  
};

const handleClose = () => {
  setOpen(false);
  fetchAllProducts();
};

const showEditDialog=()=>{
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Product
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleEdit()}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={()=>handleWarning(getRowData)}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormView()}
      </Dialog>
    </div>
  );


}


const editFormView=()=>{
    return(<div className={classes.root}>
        <div className={classes.subdiv}>
            <Paper elevation={2} style={{padding:30, outline:'10px solid #dfe6e9'}}>
              <Grid container spacing={1} >
                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <div style={{fontSize:23, fontFamily:'Georgia,Times,Times New Roman,serif',fontWeight:650, letterSpacing:2, padding:18}}>
                          Edit Product Interface
                          </div>
                  </Grid>
                <Grid item xs={12} sm={4}>
                    
                <TextField value= {showTailorname}  label="Tailor Name" variant="outlined" fullWidth />
                {/* <FormControl
                  variant="outlined"
                 fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-category`">
                    Tailor Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-category"
                    id="demo-simple-select-outlined-category"
                    value={TailorName}
                    onChange={(event)=>setTailorName(event.target.value)}
                    label="Tailor Name"
                  >
                      
                    {showTailorbyid()}
                  </Select>
                </FormControl> */}
              </Grid>
                <Grid item xs={12} sm={4}>
                <FormControl
                  variant="outlined"
                 fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-category`">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-category"
                    id="demo-simple-select-outlined-category"
                    value={CategoryId}
                    onChange={(event)=>handleCategoryChange(event)}
                    label="Category"
                  >
                    {showCategory()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
             fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-category`">
                Product Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                value={ProductCatId}
                onChange={(event)=>setProductCatId(event.target.value)}
                label="Category"
              >
                {showProductCategory()}
              </Select>
            </FormControl>
          </Grid>
              <Grid item xs={12} sm={6} >
                    <TextField value={ProductName} onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <TextField value={Description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={4} >
                <FormControl className={classes.formControl}  variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined">Material-Used</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="demo-simple-select-outlined"
              value={MaterialUsed}
              onChange={(event)=>setMaterialUsed(event.target.value)}
            >
              <MenuItem value='Linen'>Linen</MenuItem>
              <MenuItem value='Chiffon'>Chiffon</MenuItem>
              <MenuItem value='Cotton'>Cotton</MenuItem>
              <MenuItem value='Polyester'>Polyester</MenuItem>
              <MenuItem value='Wool'>Wool</MenuItem>
              <MenuItem value='Silk'>Silk</MenuItem>
              <MenuItem value='Velvet'>Velvet</MenuItem>
            </Select>
          </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField value={StitchingCost}  onChange={(event)=>setStitchingCost(event.target.value)} label="Stitching Cost" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField value={Duration} onChange={(event)=>setDuration(event.target.value)} label="Time Duration(Days)" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField value={Offer} fullWidth onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-category`">Offer Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={OfferType}
          onChange={(event)=>setOfferType(event.target.value)}
        >
          <MenuItem value='Discount'>Discount</MenuItem>
          <MenuItem value='Festival'>Festival</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
         
        </Select>
      </FormControl>
            </Grid>
    
                {/* Text(Upload Category Icon) */}
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <span style={{fontSize:16, fontWeight:400}}>Upload Product Icon</span>
                        <input onChange={(event)=>handleEditIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            {/* Upload Button */}
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                            </IconButton>
                            </label>
                        </Grid>
    
                        {/* Image Frame */}
                        <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Avatar variant="rounded" src={Icon.file} style={{width:60, height:60}}/>

                            {IconSaveCancel ? (<span><Button onClick={() => handleClickSaveIcon()}color="secondary">Save</Button>{" "}
                            <Button color="secondary" onClick={() => handleCancelIcon()}>Cancel</Button></span>) : (<></>)}

                        </Grid>
                        
            </Grid>
            </Paper>
    
        
    </div>
    </div>
    
    )
}

////////////////////////////////////////////////////////////////////////jsx-javascript xml =<></>
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////PRODUCT//////////////////////////////////////////////
const handleCategoryChange=async(event)=>{
  //   alert(event.target.value)
  setCategoryId(event.target.value)
  // alert(state)
  FillProductbyCategory(event.target.value)
}


const FillProductbyCategory=async(cid)=>{
  var body={categoryid:cid}
  var result = await  postData("product/displayproductbycategoryid",body)
  // alert(result)
    setProductCatList(result)
}

const showProductCategory=()=>{
  return ProductCatList.map((item)=>{
    return(
       <MenuItem value={item.productid}>{item.productname}</MenuItem>
    )

  })
}


const handleResetClick=()=>{
 
  setCategoryId('')
  setProductCatId('')
  setProductName('')
  setProductCatId('')
  setDescription('')
  setMaterialUsed('')
  setStitchingCost('')
  setDuration('')
  setOffer('')
  setOfferType('')
setIcon({bytes:'',file:'/noimage.JFIF'})
}

const handleSubmitClick=async()=>{
  var error=false
  var msg="<div>"
  if(isBlank(CategoryId))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>"
    }
if(isBlank(TailorName))
      {error=true
          msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Tailor Name Should Not Be Blank..</b></font><br>"
        }
        if(isBlank(ProductCatId))
      {error=true
          msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Tailor Name Should Not Be Blank..</b></font><br>"
        }
    if(isBlank(ProductName))
        {error=true
            msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Product Name Should Not Be Blank..</b></font><br>"
          } 
    if(isBlank(MaterialUsed))
          {error=true
              msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please fill the material used..</b></font><br>"
            }
    if(isBlank(StitchingCost))
            {error=true
                msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select cost of stitching..</b></font><br>"
              } 
    if(isBlank(Duration))
              {error=true
                  msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select time duration..</b></font><br>"
                }  
    if(isBlank(Icon.bytes))
                {error=true
                    msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Select Picture of product</b></font><br>"
                  }        

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
    var formData=new FormData()
    
    formData.append("tailorid",TailorName)
    formData.append("categoryid",CategoryId)
    formData.append("productname",ProductName)
    formData.append("description",Description)
    formData.append("materialused",MaterialUsed)
    formData.append("stichingcost",StitchingCost)
    formData.append("timeduration",Duration)
    formData.append("offer",Offer)
    formData.append("offertype",OfferType)
    
    
    formData.append("picture",Icon.bytes)
    formData.append("productcatid",ProductCatId)
  
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('product/addnewproduct',formData,config)
    if(result)
    {
      swal({
        title: "Product Submitted Successfully",
        icon: "success",
        dangerMode: true,
      })
      fetchAllProducts()
    }
    }
}
 const addcategory=()=>{
  return(<div className={classes.root}>
    <div className={classes.subdiv}>
            <Paper elevation={2} style={{padding:30, outline:'10px solid #dfe6e9'}}>
              <Grid container spacing={1} >
                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <div style={{fontSize:23, fontFamily:'Georgia,Times,Times New Roman,serif',fontWeight:650, letterSpacing:2, padding:18}}>
                          Product Interface
                          </div>
                  </Grid>
            <Grid item xs={12} sm={4}>
            
                <TextField value= {showTailorname}  label="Tailor Name" variant="outlined" fullWidth />
          
                {/* <FormControl
                  variant="outlined"
                 fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-category`">
                    Tailor Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-category"
                    id="demo-simple-select-outlined-category"
                    value={TailorName}
                    onChange={(event)=>setTailorName(event.target.value)}
                    label="Tailor Name"
                  >
                      
                    {showTailorbyid()}
                  </Select>
                </FormControl> */}
              </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
             fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-category`">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                value={CategoryId}
                onChange={(event)=>handleCategoryChange(event)}
                label="Category"
              >
                {showCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              variant="outlined"
             fullWidth
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-category`">
                Product Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-category"
                id="demo-simple-select-outlined-category"
                value={ProductCatId}
                onChange={(event)=>setProductCatId(event.target.value)}
                label="Category"
              >
                {showProductCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} >
                <TextField value={ProductName} onChange={(event)=>setProductName(event.target.value)} label="Product Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} >
                <TextField value={Description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={4} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-category`">Material-Used</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={MaterialUsed}
          onChange={(event)=>setMaterialUsed(event.target.value)}
        >
          <MenuItem value='Linen'>Linen</MenuItem>
          <MenuItem value='Chiffon'>Chiffon</MenuItem>
          <MenuItem value='Cotton'>Cotton</MenuItem>
          <MenuItem value='Polyester'>Polyester</MenuItem>
          <MenuItem value='Wool'>Wool</MenuItem>
          <MenuItem value='Silk'>Silk</MenuItem>
          <MenuItem value='Velvet'>Velvet</MenuItem>
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField value={StitchingCost}  onChange={(event)=>setStitchingCost(event.target.value)} label="Stitching Cost" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField value={Duration} onChange={(event)=>setDuration(event.target.value)} label="Time Duration(Days)" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField value={Offer} fullWidth onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-category`">Offer Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={OfferType}
          onChange={(event)=>setOfferType(event.target.value)}
        >
          <MenuItem value='Discount'>Discount</MenuItem>
          <MenuItem value='Festival'>Festival</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
         
        </Select>
      </FormControl>
            </Grid>

            {/* Text(Upload Category Icon) */}
            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16, fontWeight:400}}>Upload Product Icon</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        {/* Upload Button */}
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                        </label>
                    </Grid>

                    {/* Image Frame */}
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Avatar variant="rounded" src={Icon.file} style={{width:60, height:60}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:280}} onClick={()=>handleSubmitClick()}  variant="contained" color="primary">Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:280}} onClick={()=>handleResetClick()} variant="contained" color="primary">Reset</Button>
                    </Grid>
        </Grid>
        </Paper>
        </div>

    
</div>

)
}


const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);

const handleOpenInterface = () => {
    handleResetClick()
  setOpenCategoryDialog(true);
  // fetchAllCategory();
};


const handleCloseInterface = () => {
  setOpenCategoryDialog(false);
  fetchAllCategory();
};

const showCategoryDialog = () => {
  return (
    <div>
      <Dialog
        fullScreen
        open={openCategoryDialog}
        onClose={handleCloseInterface}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseInterface}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Products Interface
            </Typography>
           
          </Toolbar>
        </AppBar>
        {addcategory()}
      </Dialog>
    </div>
  );
};


// //////////////////////////////////////////////////////////////////////////////////





// React.useEffect(() => {

//   // removing the class 'MuiIconButton-root' from parent of parent of our ref node.

//   myTextIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');

// }, []);
function displayAll() {
    return (
        
      <div >
          
      <MaterialTable
        title=""
        columns={[
          { title: 'Tailor', field: 'tname', 
          // render:rowData =>(<div style={{ display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}}>{rowData.tname}</div>)
        },
          { title: 'Category ', field: 'catname' },
          { title: 'Product ', field: 'pname' },
          { title: ' Name ', field: 'productname' },
          // { title: 'Description ', field: 'description' },
          { title: 'Material', field: 'materialused' },
          { title: ' Cost ', field: 'stichingcost', },
        //   { title: 'Duration ', field: 'timeduration' },
          { title: 'Offer', field: 'offer' },
          { title: 'Type ', field: 'offertype' },
          
         
          { title: 'Picture', field: 'picture',
            render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.picture}`} alt="" style={{borderRadius:'5'}}  width='50' height='50' /></div>)}

        ]}
        // backgroundColor: '#01579b'
        data={ list } 
        options={{
            search: true,
            searchFieldAlignment:'left',
            actionsColumnIndex: -1,
            headerStyle:{fontWeight:800,padding:10,fontSize:14,color:'black'},
            sortingFieldStyle:{visible:true},
            searchFieldVariant:"outlined",
            searchFieldStyle:{borderRadius:'50px',borderColor:' #a4b0be',height:'40px',width:'85%',}
           
          }}
        //   components={{
        //     Actions: (props) => {
        //       return(
        //         <Button
        //           onClick={() => console.log('click')}
        //         >Hello World</Button>
        //       );8800438892:
        //     }
        //   }}
          actions={[
            {
                icon: () =>  <span><RefreshIcon color="primary"/></span>,
               onClick: () => {
                 fetchAllProducts();
               },
               isFreeAction: true,
               tooltip: 'Refresh',
             },
           {
                icon: () =>  <span><CSVLink
                data={list}
                filename={"my-fileProduct.csv"}
                className="btn btn-primary"
                target="_blank"
                style={{color:'#1abc9c'
                }}><Button variant='contained' style={{background:'#1abc9c',color:'white'}}><GetAppSharpIcon></GetAppSharpIcon>DOWNLOAD EXCEL</Button></CSVLink></span>,
               
               isFreeAction: true,
               tooltip: 'Download ExcelSheet',
             }, {
                icon: () =>  <span><Button variant='contained' color='primary'><LibraryAddSharpIcon/> ADD PRODUCT</Button></span>,
               onClick: () => {
                 handleOpenInterface();
               },
               isFreeAction: true,
               tooltip: 'Add Product',
             },
            {
                    icon: 'edit',
                    onClick: (event, rowData) => {
                      handleClickOpen(rowData);
                    },
                    
                }
          ]}
        
        
         
          
      />
      {showEditDialog()}
      {showCategoryDialog()}
      </div>
    )
  }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{width:1000,marginTop:40,padding:3,display:'flex',justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}} >
        <div><img src='newww.jpg' width='95px' alt="" ></img></div>
          <div style={{fontSize:25,fontWeight:800,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2, padding:20}}>Product List</div></div>
         
      {displayAll()}
      
      
      </div>
      </div>
   
  )}