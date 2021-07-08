import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import {CSVLink} from 'react-csv'

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
      padding:30,

      width:650,
      marginTop:60,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:15,
      
  },

  input: {
      display: 'none',
    },

  formControl: {
      // margin: theme.spacing(1),
      // minWidth: 700,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductCategory(props)
{ const [list,setList]=useState([])
  const classes = useStyles();

const [categoryid,setCategoryid]=useState('')
const [productid,setProductid]=useState('')
const [productcategoryid,setProductCategoryid]=useState('')
const [productname,setName]=useState('')
const [description,setDescription]=useState('')
const [Icon,setIcon]=useState({bytes:'',file:'/noimage.JFIF'})
const [IconSaveCancel,setIconSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listCategory,setListCategory]=useState([])
const [listProduct,setListProduct]=useState([])
            

  const fetchAllProductCategory = async () => {
          var result = await getData("productcategory/displayall");
          setList(result);
        };
        
const handleIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      //setIconSaveCancel(true)
    }

    const handleEditIcon=(event)=>{
      setIcon({bytes:event.target.files[0],
          file:URL.createObjectURL(event.target.files[0])})
          setIconSaveCancel(true)
        }

const handledelete = async (productcategoryid) => {
  var body = {productcategoryid:productcategoryid}
  var result = await postData("productcategory/deleteproductcategory",body)
  if (result){
    swal({
        title: "Product Category Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      })
      setOpen(false)
      fetchAllProductCategory()
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
  setProductCategoryid(rowData.productcategoryid)
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handledelete(productcategoryid)
      } 
    });
 }

const handleCancelIcon=()=>{
  
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
  setIconSaveCancel(false)
}

const handleClickSaveIcon=async()=>{
 
  var formData= new FormData()
  formData.append("productcategoryid",productcategoryid)
  formData.append("icon",Icon.bytes)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('productcategory/editicon',formData,config)
  if(result){
      swal({
          title: "Picture Updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        setIconSaveCancel(false)
      
}
}

const handleEdit=async ()=>{
  var error=false
  var msg="<div>"
  if(isBlank(productname))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>"}

      if(isBlank(description))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Description Should Not Be Blank..</b></font><br>"}
  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
  var body={'productcategoryid':productcategoryid,'productname':productname,'description':description};
  var result = await postData("productcategory/editproductcategory", body);
  if (result) {
    swal({
      title: "Product Category Updated Successfully",
      icon: "success",
      dangerMode: true,
    });
  }}

}
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
  setCategoryid(rowData.categoryid)
  FillProductbyCategoryid(rowData.categoryid)
  setProductid(rowData.productid)
  setProductCategoryid(rowData.productcategoryid)
  setName(rowData.productname);
  setDescription(rowData.description);
  setIcon({ bytes: "", file: `${ServerURL}/images/${rowData.icon}` });
  
  
};




const fetchAllCategories=async()=>{
  var result = await getData('category/displayall')
  setListCategory(result);

}

useEffect(function(){
  fetchAllCategories()

},[])

const showCategory=()=>{
  return listCategory.map((item)=>{
    return (
      <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    )
  })
}

const handleCategoryChange=async(event)=>{
  setCategoryid(event.target.value)
  FillProductbyCategoryid(event.target.value)

}

const FillProductbyCategoryid=async(cid)=>{
  var body = {categoryid:cid}
  var result = await postData('product/displayproductbycategoryid',body)
  setListProduct(result)

}

const showProduct=()=>{
  
  return listProduct.map((item)=>{
    return (
      <MenuItem value={item.productid}>{item.productname}</MenuItem>
    )

  })
}

const handleClose = () => {
  setOpen(false);
  fetchAllProductCategory();
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
              Edit/Delete Product Category
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
    <div className={classes.subdiv} style={{padding:30,outline:'10px solid #dfe6e9'}}>    
        <Grid container spacing={2}>
            {/* Heading(Category Interface) */}
            <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                    EDIT Product Category Interface
            </Grid>
{/* <Grid item xs={12} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-category`">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={CategoryName}
          onChange={(event)=>setCategoryName(event.target.value)}
        >
          <MenuItem value='Men'>Men</MenuItem>
          <MenuItem value='Women'>Women</MenuItem>
          <MenuItem value='Kids'>Kids</MenuItem>
        </Select>
      </FormControl>
  </Grid>*/}


                  <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-category"
                  id="demo-simple-select-outlined-category"
                  value={categoryid}
                  onChange={(event)=>handleCategoryChange(event)}
               
                  label="Category"
                
                  >
                  {showCategory()}
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label-product">Product</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label-product"
                  id="demo-simple-select-outlined-product"
                  value={productid}
                  onChange={(event)=>setProductid(event.target.value)}
               
                  label="Product"
                
                  >
                  {showProduct()}
                  </Select>
                  </FormControl>
  
                  </Grid>

                   <Grid item xs={12} sm={6}>
                      <TextField label="Product Category Name" value={productname} onChange={(event)=>setName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>



            {/* Text(Upload Category Icon) */}
            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16, fontWeight:400}}>Upload Product Category Icon</span>
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
                        {IconSaveCancel ? (
                <span>
                  <Button
                    onClick={() => handleClickSaveIcon()}
                    color="secondary"
                  >
                    Save
                  </Button>{" "}
                  <Button color="secondary" onClick={() => handleCancelIcon()}>
                    Cancel
                  </Button>
                </span>
              ) : (
                <></>
              )}
                    </Grid>
                   
        </Grid>
        </div>

    
</div>

)
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const handleResetClick=()=>{
  setName('')
  setDescription('')
  setIcon({bytes:'',file:'/noimage.JFIF'})
}

const handleSubmitClick=async()=>{
  var error=false
  var msg="<div>"
  if(isBlank(productname))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>"}
      if(isBlank(description))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Description Should Not Be Blank..</b></font><br>"}
  if(isBlank(Icon.bytes))
      {error=true
          msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select icon for category..</b></font><br>"
        } 

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
    var formData=new FormData()
    formData.append("categoryid",categoryid)
    formData.append("productid",productid)
    formData.append("productname",productname)
    formData.append("description",description)
    
    formData.append("icon",Icon.bytes)
  
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('productcategory/addnewproductcategory',formData,config)
    if(result)
    {
      swal({
        title: "Product Category Submitted Successfully",
        icon: "success",
        dangerMode: true,
      })
    }
    }
}
 const addcategory=()=>{
  return(<div className={classes.root}>
    <div className={classes.subdiv} style={{padding:30,outline:'10px solid #dfe6e9'}}>    
        <Grid container spacing={2}>
            {/* Heading(Category Interface) */}
            <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                    Product Category Interface
            </Grid>
           {/*} <Grid item xs={12} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-category`">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={CategoryName}
          onChange={(event)=>setCategoryName(event.target.value)}
        >
          <MenuItem value='Men'>Men</MenuItem>
          <MenuItem value='Women'>Women</MenuItem>
          <MenuItem value='Kids'>Kids</MenuItem>
        </Select>
      </FormControl>
  </Grid>*/}

            {/* Text(Upload Category Icon) */}

            <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-category"
                  id="demo-simple-select-outlined-category"
                  //value={categoryid}
                  onChange={(event)=>handleCategoryChange(event)}
               
                  label="Category Id"
                
                  >
                  {showCategory()}
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label-product">Product</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label-product"
                  id="demo-simple-select-outlined-product"
                  //value={productid}
                  onChange={(event)=>setProductid(event.target.value)}
               
                  label="Product Id"
                
                  >
                  {showProduct()}
                  </Select>
                  </FormControl>
  
                  </Grid>

                <Grid item xs={12} sm={6}>
                      <TextField label="Product Category Name" onChange={(event)=>setName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField label=" Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16, fontWeight:400}}>Upload Product Category Icon</span>
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
                        <Button style={{width:200}} onClick={()=>handleSubmitClick()}  variant="contained" color="primary">Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:200}} onClick={()=>handleResetClick()} variant="contained" color="primary">Reset</Button>
                    </Grid>
        </Grid>
        </div>

    
</div>

)
}


const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);

const handleOpenInterface = () => {
  handleResetClick();
  setOpenCategoryDialog(true);
  // fetchAllCategory();
};


const handleCloseInterface = () => {
  setOpenCategoryDialog(false);
  fetchAllProductCategory();
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
              Add Product CategoryInterface
            </Typography>
           
          </Toolbar>
        </AppBar>
        {addcategory()}
      </Dialog>
    </div>
  );
};


// //////////////////////////////////////////////////////////////////////////////////




useEffect(function(){
    fetchAllProductCategory()
},[])
// React.useEffect(() => {

//   // removing the class 'MuiIconButton-root' from parent of parent of our ref node.

//   myTextIcon.current.parentNode.parentNode.classList.remove('MuiIconButton-root');

// }, []);
function displayAll() {
    return (
      <div>
      <MaterialTable
       title=""
        columns={[
        //  { title: 'Id', field: 'productcategoryid' },
          { title: 'Category', field: 'cname' },
          { title: 'Product', field: 'pname' },
          { title: 'Product Name', field: 'productname' },
          { title: 'Description', field: 'description' },
         
          { title: 'Picture', field: 'icon',
            render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:'5'}} width='40' height='40' /></div>)}

        ]}
        data={ list } 
        
        options={{
          search: true,
          searchFieldVariant:'outlined',
          searchFieldAlignment:'left',
          actionsColumnIndex:-1,
          searchFieldStyle:{borderRadius:'20px',border:'1px solid #a4b0be',width:'85%',height:40},
          headerStyle:{fontWeight:700,padding:5},
        }}
        actions={[
            {
                icon: () =>  <span><RefreshIcon color="primary"/></span>,
               onClick: () => {
                 fetchAllProductCategory();
               },
               isFreeAction: true,
               tooltip: 'Refresh',
             },
             {
              icon:  () =>  <span><CSVLink data={list} filename={"MYProductCategory.csv"} target="_blank" className="btn btn-primary" 
              style={{color:'#1abc9c'}}><Button variant='contained' style={{background:'#1abc9c',color:'white'}}>
                <GetAppSharpIcon/>Download Excel</Button></CSVLink></span>,
             
              isFreeAction: true,
            
              
            },

            {
              icon:  () =>  <span><Button variant='contained' color='primary'><LibraryAddSharpIcon/>ADD PRODUCT CATEGORY</Button></span>,
              onClick: () => {
                handleOpenInterface();
              },
              isFreeAction: true,
              tooltip: 'Add Product Category',
              
          },
          
          {
            icon: 'edit',
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
            },
            tooltip: 'Edit Product Category',
            
          },

          {
            icon: 'delete',
            //tootltip: 'Edit Tailor',
            onClick: (event, rowData) => {
              handleWarning(rowData)
           
            },
            tooltip:'Delete Product Category',
            
          },
         
        ]}
        
         
          
      />
      {showEditDialog()}
      {showCategoryDialog()}
      </div>
    )
  }
  return (<div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
       <div  style={{width:1000,marginTop:40,padding:3,display:'flex',backgroundColor:"#FFF",justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}><img src='tailor.jpg' width='75px'/></div>
    <div style={{fontSize: 22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2, padding:20}}>Product Category List</div>
    </div>

    
      {displayAll()}
      
      
      </div>
      </div>)
      }