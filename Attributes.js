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

      width:720,
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

export default function Attributes(props)
{ const [list,setList]=useState([])
  const classes = useStyles();

const [attributeid,setAttributeid]=useState('')
const [categoryid,setCategoryid]=useState('')
const [productcategoryid,setProductCategoryid]=useState('')
const [attributename,setAttributeName]=useState('')
const [Icon,setIcon]=useState({bytes:'',file:'/noimage.JFIF'})
const [IconSaveCancel,setIconSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listCategory,setListCategory]=useState([])
const [listProductCategory,setListProductCategory]=useState([])
            

  const fetchAllAttributes = async () => {
          var result = await getData("attributes/displayall");
          setList(result);
        };
        
const handleIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      //setIconSaveCancel(true)
    }

const handledelete = async (attributeid) => {
  var body = {attributeid:attributeid}
  var result = await postData("attributes/deleteattributes",body)
  if (result){
    swal({
        title: "Attributes Deleted Successfully ",
        icon: "success",
        dangerMode: true,
      })
      setOpen(false)
      fetchAllAttributes()
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
  setAttributeid(rowData.attributeid)
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handledelete(attributeid)
      } 
    });
 }


 const handleEditIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])})
      setIconSaveCancel(true)
    }


const handleCancelIcon=()=>{
  
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
  setIconSaveCancel(false)
}

const handleClickSaveIcon=async()=>{
 
  var formData= new FormData()
  formData.append("attributeid",attributeid)
  formData.append("icon",Icon.bytes)

  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('attributes/editicon',formData,config)
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
  if(isBlank(attributename))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Attribute Name Should Not Be Blank..</b></font><br>"}

    {/*  if(isBlank(Icon.bytes))
  {error=true
  msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select the Icon for Attribute..</b></font><br>"
  }*/}
  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
  var body={'attributeid':attributeid,'attributename':attributename};
  var result = await postData("attributes/editattributes", body);
  if (result) {
    swal({
      title: "Attributes Updated Successfully",
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
  FillProductCategorybyCategoryid(rowData.categoryid)
  setProductCategoryid(rowData.productcategoryid)
  setAttributeid(rowData.attributeid)
  setAttributeName(rowData.attributename);
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
  FillProductCategorybyCategoryid(event.target.value)

}

const FillProductCategorybyCategoryid=async(cid)=>{
  var body = {categoryid:cid}
  var result = await postData('productcategory/displayproductcategorybycategoryid',body)
  setListProductCategory(result)

}

const showProductCategory=()=>{
  
  return listProductCategory.map((item)=>{
    return (
      <MenuItem value={item.productcategoryid}>{item.productname}</MenuItem>
    )

  })
}

const handleClose = () => {
  setOpen(false);
  fetchAllAttributes();
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
              Edit/Delete Attributes
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
                    EDIT Attribute Interface
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


                  <Grid item xs={12} sm={4}>
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
  
                  <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label-productcategory">Product Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label-productcategory"
                  id="demo-simple-select-outlined-productcategory"
                  value={productcategoryid}
                  onChange={(event)=>setProductCategoryid(event.target.value)}
               
                  label="Product Category"
                
                  >
                  {showProductCategory()}
                  </Select>
                  </FormControl>
  
                  </Grid>

                   <Grid item xs={12} sm={4}>
                      <TextField label="Attribute Name" value={attributename} onChange={(event)=>setAttributeName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                 {/*<Grid item xs={12} sm={6}>
                      <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>*/}



            {/* Text(Upload Category Icon) */}
            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16, fontWeight:400}}>Upload Attribute Icon</span>
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
  setAttributeName('')
 // setDescription('')
  setIcon({bytes:'',file:'/noimage.JFIF'})
}

const handleSubmitClick=async()=>{
  var error=false
  var msg="<div>"
  if(isBlank(attributename))
  {error=true
      msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Attribute Name Should Not Be Blank..</b></font><br>"}

  if(isBlank(Icon.bytes))
      {error=true
          msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select icon for Attributes..</b></font><br>"
        } 

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
    var formData=new FormData()
    formData.append("categoryid",categoryid)
    formData.append("productcategoryid",productcategoryid)
    formData.append("attributename",attributename)
    formData.append("icon",Icon.bytes)
  
    var config={headers:{"content-type":"multipart/form-data"}}
    var result= await postDataAndImage('attributes/addnewattribute',formData,config)
    if(result)
    {
      swal({
        title: "Attribute Submitted Successfully",
        icon: "success",
        dangerMode: true,
      })
    }
    }
}
 const addAttribute=()=>{
  return(<div className={classes.root}>
    <div className={classes.subdiv} style={{padding:30,outline:'10px solid #dfe6e9'}}>    
        <Grid container spacing={2}>
            {/* Heading(Category Interface) */}
            <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                    Attribute Interface
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

            <Grid item xs={12} sm={4}>
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
  
                  <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label-productcategory">Product Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label-productcategory"
                  id="demo-simple-select-outlined-productcategory"
                  //value={productid}
                  onChange={(event)=>setProductCategoryid(event.target.value)}
               
                  label="Product Category Id"
                
                  >
                  {showProductCategory()}
                  </Select>
                  </FormControl>
  
                  </Grid>

                <Grid item xs={12} sm={4}>
                      <TextField label="Attribute Name" onChange={(event)=>setAttributeName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>


            <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{fontSize:16, fontWeight:400}}>Upload Attribute Icon</span>
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
                        <Button style={{width:200}} onClick={()=>handleSubmitClick()}  variant="contained" color="primary" style={{width:200}}  fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:200}} onClick={()=>handleResetClick()} variant="contained" color="primary" style={{width:200}} fullWidth>Reset</Button>
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
  fetchAllAttributes();
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
              Add Attribute Interface
            </Typography>
           
          </Toolbar>
        </AppBar>
        {addAttribute()}
      </Dialog>
    </div>
  );
};


// //////////////////////////////////////////////////////////////////////////////////




useEffect(function(){
    fetchAllAttributes()
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
        //  { title: 'Id', field: 'attributeid' },
          { title: 'Category', field: 'cname' },
          { title: 'Product Category', field: 'pcname' },
          { title: 'Attribute Name', field: 'attributename' },
        
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
                 fetchAllAttributes();
               },
               isFreeAction: true,
               tooltip: 'Refresh',
             },
             {
              icon:  () =>  <span><CSVLink data={list} filename={"MYATTRIBUTES.csv"} target="_blank" className="btn btn-primary" 
              style={{color:'#1abc9c'}}><Button variant='contained' style={{background:'#1abc9c',color:'white'}}>
                <GetAppSharpIcon/>Download Excel</Button></CSVLink></span>,
             
              isFreeAction: true,
            
              
            },

            {
              icon:  () =>  <span><Button variant='contained' color='primary'><LibraryAddSharpIcon/>ADD Attribute</Button></span>,
              onClick: () => {
                handleOpenInterface();
              },
              isFreeAction: true,
              tooltip: 'Add Attribute',
              
          },
          
          {
            icon: 'edit',
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
            },
            tooltip: 'Edit Attribute',
            
          },

          {
            icon: 'delete',
            //tootltip: 'Edit Tailor',
            onClick: (event, rowData) => {
              handleWarning(rowData)
           
            },
            tooltip:'Delete Attributes',
            
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
    <div style={{fontSize: 22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2, padding:20}}>Attribute List</div>
    </div>

    
      {displayAll()}
      
      
      </div>
      </div>)
      }