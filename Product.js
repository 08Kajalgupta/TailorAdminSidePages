import React,{useState, useEffect} from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import Paper from '@material-ui/core/Paper';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import {CSVLink} from 'react-csv'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
   
  },
  subdiv:{
      padding:20,
      marginTop:50,
      width:900,
      background:'#fff'
  },
  input: {
      display: 'none',
    },
  
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  export default function Product(props)
{ 
  const [list, setList]=useState([])
  const classes = useStyles();


  const [categoryid,setCategoryid]=useState('')
  const [tailorid,setTailorid]=useState('')
  const [productid,setProductid]=useState('')
  const [productname,setProductName]=useState('')
  const [description,setDescription]=useState('')
  const [materialused,setMaterialused]=useState('')
  const [stichingcost,setStichingcost]=useState('')
  const [timeduration,setTimeduration]=useState('')
  const [offer,setOffer]=useState('')
  const [offertype,setOffertype]=useState('')
  const [picture,setPicture]=useState({bytes:'',file:'/noimage.jpg'})

  const [getRowData,setRowData]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listtailor,setListTailor]=useState([])
 
  const [iconSaveCancel,setIconSaveCancel]=useState(false)


const handleCategoryChange=async(event)=>{
  setCategoryid(event.target.value)
  fillTailorByCategoryId(event.target.value)

}

const fillTailorByCategoryId=async(cid)=>{
  var body = {categoryid:cid}
    var result = await postData('tailor/displaytailorbycategoryid',body)
    setListTailor(result);
}


  const fetchAllProduct = async () => {
    var result = await getData("product/displayAll")
    setList(result);
  };
  


  const handleIcon=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    //setIconSaveCancel(true)
  
  }

  const handleEditIcon=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setIconSaveCancel(true)
  
  }
  
  const handledelete=async(productid)=>{
    var body = {productid:productid}
    var result = await postData('product/deleteproduct',body);
  
    if(result)
    {
        swal({
            title: "product Deleted Successfully",
            icon: "success",
            dangerMode: true,
           })
           setOpen(false)
        fetchAllProduct()
    }
    else
    {
      swal({
        title: "Fail to Delete Record",
        icon: "success",
        dangerMode: true,
       })
    }
  }

  const handleWarning=(rowData)=>{
    setProductid(rowData.productid)
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          handledelete(productid)
          
        } 
      });
   }
  
  
  const handleCancelIcon=()=>{
    setIconSaveCancel(false)
    setPicture({bytes:'',file:`${ServerURL}/images/${getRowData.picture}`})
  }
  

  const handleClickSaveIcon=async()=>{

    var formData = new FormData()
    formData.append("productid",productid)
    formData.append("picture",picture.bytes)
    
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('product/editpicture',formData, config)
    if(result)
    {
        swal({
            title: "Picture Upadated Successfully",
            icon: "success",
            dangerMode: true,
           });
           setIconSaveCancel(false)
    }
  
  }


  const handleEdit=async()=>{
    var error=false
    var msg="<div>"
  
   
    if(isBlank(productname))
    {error=true
        msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
    }
    if(isBlank(description))
    {error=true
        msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>"
    }
    if(isBlank(materialused))
    {error=true
        msg+="<font color='#c0392b'><b>Material Used should not be blank..</b></font><br>"
    }
    if(isBlank(stichingcost))
    {error=true
        msg+="<font color='#c0392b'><b>Stiching Cost should not be blank..</b></font><br>"
    }
    if(isBlank(timeduration))
    {error=true
        msg+="<font color='#c0392b'><b>Time Duration should not be blank..</b></font><br>"
    }
    if(isBlank(offer))
    {error=true
        msg+="<font color='#c0392b'><b>Offer should not be blank..</b></font><br>"
    }
    if(isBlank(offertype))
    {error=true
        msg+="<font color='#c0392b'><b>Offer Type should not be blank..</b></font><br>"
    }
  
   {/* if(isBlank(picture.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Select the Icon for Picture</b></font><br>" 
    }*/}
  
    if(error)
    {
        swalhtml(renderHTML(msg))
    }
    else{
    var body={'categoryid':categoryid,'tailorid':tailorid,'productid':productid,'productname':productname,
          'description':description,'materialused':materialused,'stichingcost':stichingcost,
           'timeduration':timeduration,'offer':offer,'offertype':offertype};
    var result = await postData("product/editproduct", body);
    if (result) {
      swal({
        title: "Product Updated Successfully",
        icon: "success",
        dangerMode: true,
      });
    }}
  
  }

  
////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////Edit Dialog/////////////////////

const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setCategoryid(rowData.categoryid);
  setTailorid(rowData.tailorid);
  setProductid(rowData.productid);
  setProductName(rowData.productname);
  setDescription(rowData.description);
  setMaterialused(rowData.materialused);
  setStichingcost(rowData.stichingcost);
  setTimeduration(rowData.timeduration);
  setOffer(rowData.offer);
  setOffertype(rowData.offertype)
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
  
};

const handleClose = () => {
  setOpen(false);
  fetchAllProduct()
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
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
          <Paper elevation={2} style={{padding:30,outline:'10px solid #dfe6e9'}}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

                    <div style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:26,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                        Product Interface
                    </div>
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-category"
                  id="demo-simple-select-outlined-category"
                  value={categoryid}
                  onChange={(event)=>handleCategoryChange(event)}
               
                  label="Category Id"
                
                  >
                  {showCategory()}
                  </Select>
                  </FormControl>
  
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-tailor">Tailor</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-tailor"
                  id="demo-simple-select-outlined-tailor"
                  value={tailorid}
                  onChange={(event)=>setTailorid(event.target.value)}
               
                  label="Tailor Id"
                
                  >
                   {showTailor()}
                  </Select>
                  </FormControl>
  
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Product Name" value={productname} onChange={(event)=>setProductName(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Material Used" value={materialused} onChange={(event)=>setMaterialused(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Stiching Cost" value={stichingcost} onChange={(event)=>setStichingcost(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Time Duration" value={timeduration} onChange={(event)=>setTimeduration(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Offer" value={offer} onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                {/*<Grid item xs={12}>
                    <TextField label="Offer Type" value={offertype} onChange={(event)=>setOffertype(event.target.value)} variant="outlined" fullWidth/>
                </Grid>*/}

                <Grid item xs={12} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-offertype`">offertype</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-offertype"
          id="demo-simple-select-outlined-offertype"
          value={offertype}
          onChange={(event)=>setOffertype(event.target.value)}
        >
          <MenuItem value='Discount'>Discount</MenuItem>
          <MenuItem value='Festival'>Festival</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
            </Grid>
  


                



                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Picture</span>
                <input onChange={(event)=>handleEditIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={picture.file} style={{width:60,height:60}}/>
                {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
                </Grid>
                

            </Grid>
            </Paper>
        </div>

    </div>

)

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////Add Dialog////////////////////////////////////////////////////////////

  const fetchAllCategory=async()=>{
    var result = await getData("category/displayall") 
    setListCategory(result);

  }

  useEffect(function() {
    fetchAllCategory();
    fetchAllTailor();
   
  },[])

  const showCategory=()=>{
    return listCategory.map((item)=>{
      return(
         <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )

    })
  }


  const fetchAllTailor=async()=>{
    var result = await getData("tailor/displayAll") 
    setListTailor(result);

  }


  const showTailor=()=>{
    return listtailor.map((item)=>{
      return(
         <MenuItem value={item.tailorid}>{item.tailorname}</MenuItem>
      )

    })
  }
  
  const handleResetClick=()=>{
    setProductName('')
    setDescription('')
    setMaterialused('')
    setStichingcost('')
    setTimeduration('')
    setOffer('')
    setOffertype('')
    setPicture({bytes:'',file:'/noimage.jpg'})
  }
  
  const handleSubmitClick=async()=>{
    var error=false
    var msg="<div>"

    if(isBlank(productname))
  {error=true
      msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
  }
  if(isBlank(description))
  {error=true
      msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>"
  }
  if(isBlank(materialused))
  {error=true
      msg+="<font color='#c0392b'><b>Material Used should not be blank..</b></font><br>"
  }
  if(isBlank(stichingcost))
  {error=true
      msg+="<font color='#c0392b'><b>Stiching Cost should not be blank..</b></font><br>"
  }
  if(isBlank(timeduration))
  {error=true
      msg+="<font color='#c0392b'><b>Time Duration should not be blank..</b></font><br>"
  }

  if(isBlank(offer))
  {error=true
      msg+="<font color='#c0392b'><b>Offer should not be blank..</b></font><br>" 
  }
  if(isBlank(offertype))
  {error=true
      msg+="<font color='#c0392b'><b>Offer Type should not be blank..</b></font><br>" 
  }
  if(isBlank(picture.bytes))
  {error=true
      msg+="<font color='#c0392b'><b>Please Select Picture for Product</b></font><br>"
  }
  
  
    if(error)
    {
        swalhtml(renderHTML(msg))
    }
    else{
      var formData=new FormData()
      formData.append("categoryid",categoryid)
      formData.append("tailorid",tailorid)
      formData.append("productname",productname)
      formData.append("description",description)
      formData.append("materialused",materialused)
      formData.append("stichingcost",stichingcost)
      formData.append("timeduration",timeduration)
      formData.append("offer",offer)
      formData.append("offertype",offertype)
      formData.append("picutre",picture.bytes)
      var config = {headers:{"content-type":"multipart/form-data"}}
      var result = await postDataAndImage('product/addnewproduct',formData, config)
      if(result)
      {
          swal({
              title: "Product Submitted Successfully",
              icon: "success",
              dangerMode: true,
             })
      }
    }
  }

  const addProduct=()=>{

    return (
      <div className={classes.root}>
          <div className={classes.subdiv}>
            <Paper elevation={2} style={{padding:30, outline:'10px solid #dfe6e9'}}>
              <Grid container spacing={1} >
                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <div style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:26,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                          Product Interface
  
                      </div>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-category"
                  id="demo-simple-select-outlined-category"
                  //value={status}
                 onChange={(event)=>setCategoryid(event.target.value)}
               
                  label="Category Id"
                
                  >
                    {showCategory()}
                  
                  </Select>
                  </FormControl>
  
                  </Grid>

                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-tailor">Tailor</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-tailor"
                  id="demo-simple-select-outlined-tailor"
                  //value={status}
                 onChange={(event)=>setTailorid(event.target.value)}
               
                  label="Tailor Id"
                
                  >
                   {showTailor()}
                  
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Product Name" onChange={(event)=>setProductName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Material Used" onChange={(event)=>setMaterialused(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
    
                  <Grid item xs={12} sm={3}>
                      <TextField label="Stiching Cost" onChange={(event)=>setStichingcost(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                      <TextField label="Time Duration" onChange={(event)=>setTimeduration(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Offer" onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                 {/* <Grid item xs={12}>
                      <TextField label="Offer Type" onChange={(event)=>setOffertype(event.target.value)} variant="outlined" fullWidth/>
                 </Grid>*/}

                  <Grid item xs={12} >
            <FormControl className={classes.formControl}  variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-offertype`">offertype</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-offertype"
          id="demo-simple-select-outlined-offertype"
          //value={CategoryName}
          onChange={(event)=>setOffertype(event.target.value)}
        >
          <MenuItem value='Discount'>Discount</MenuItem>
          <MenuItem value='Festival'>Festival</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
            </Grid>
  
  
                  <Grid item xs={12} sm={6}>
                  <span style={{fontSize:15,fontWeight:400}}>Add Picture</span>
                  <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                  <label htmlFor="icon-button-file">
                  <IconButton color="primary" component="span">
                  <PhotoCamera />
                  </IconButton>
                  </label>
                  </Grid>
  
                  <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                  <Avatar variant="rounded" src={picture.file} style={{width:60,height:60}}/>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:200}} onClick={()=>handleSubmitClick()}  variant="contained" color="primary" fullWidth>Save</Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button style={{width:200}} onClick={()=>handleResetClick()} variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
  
              </Grid>
              </Paper>
          </div>
      </div>
  
  )
  
  }

  const [openProductDialog, setOpenProductDialog] = React.useState(false);

const handleOpenInterface = () => {
  handleResetClick();
  setOpenProductDialog(true);
  // fetchAllCategory();
};


const handleCloseInterface = () => {
  setOpenProductDialog(false);
  fetchAllProduct();
};
  
    

const showProductDialog = () => {
  return (
    <div>
      <Dialog
        fullScreen
        open={openProductDialog}
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
              Add Product Interface
            </Typography>
           
          </Toolbar>
        </AppBar>
        {addProduct()}
      </Dialog>
    </div>
  );
};


// //////////////////////////////////////////////////////////////////////////////////

useEffect(function(){
    fetchAllProduct()
},[])



function displayAll() {
  return (
    <div>
    <MaterialTable
     title=""
      columns={[

       // { title: 'Id', field: 'productid' },
        { title: "Category" , field: 'cname' },
        { title: 'Tailor', field: 'tname' },
        { title: 'Name', field: 'productname' },
        //{ title: 'Description', field: 'description' },
        { title: 'Material', field: 'materialused' },
        { title: 'Cost', field: 'stichingcost' },
        { title: 'Time', field: 'timeduration' },
        { title: 'Offer', field: 'offer' },
        { title: 'Offer Type', field: 'offertype' },
       
        { title: 'Picture', field: 'picture',
          render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:'5'}} width='40' height='40' /></div>)},

      
      ]}
      data={ list } 
      
      options={{
        search: true,
        searchFieldAlignment:'left',
        searchFieldVariant:'outlined',
        searchFieldStyle:{borderRadius:'20px',border:'1px solid #a4b0be',width:'85%',height:40},
        actionsColumnIndex:-1,
        headerStyle:{fontWeight:700,padding:5,},
      }}
      actions={[
        {
          icon: () =>  <span><RefreshIcon color="primary"/></span>,
         onClick: () => {
           fetchAllProduct();
         },
         isFreeAction: true,
         tooltip: 'Refresh',
       },
       {
        icon:  () =>  <span><CSVLink data={list} filename={"MYPRODUCT.csv"} target="_blank" className="btn btn-primary"
         style={{color:'#1abc9c'}}><Button variant='contained' style={{background:'#1abc9c',color:'white'}}>
           <GetAppSharpIcon/>Download Excel</Button></CSVLink></span>,
       
        isFreeAction: true,
      
        
      },

        {
          
          icon: () => <span><Button variant='contained' color='primary'><LibraryAddSharpIcon/>Add Product</Button></span>,
          onClick: () => {
            handleOpenInterface();
          },
          isFreeAction: true,
          tooltip: 'Add Product',
          
        },
        {
         
          icon: 'edit',
          //tootltip: 'Edit Product',
          onClick: (event, rowData) => {
            handleClickOpen(rowData);
            
          },
          tooltip:'Edit Product'
          
        },

        {
          icon: 'delete',
          //tootltip: 'Edit Tailor',
          onClick: (event, rowData) => {
            handleWarning(rowData)
         
          },
          tooltip:'Delete Product',
          
        },

       
      ]}
      
       
        
    />
    {showEditDialog()}
    {showProductDialog()}
    </div>
  )
}
return (<div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>

  <div  style={{width:1400,marginTop:40,padding:3,display:'flex',backgroundColor:"#FFF",justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}><img src='tailor.jpg' width='75px'/></div>
    <div style={{fontSize: 22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2, padding:20}}>Product List</div>
    </div>

    {displayAll()}
    </div>
    </div>)
 
    }

  





