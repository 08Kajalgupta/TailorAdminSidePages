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
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import Paper from '@material-ui/core/Paper';
import {CSVLink} from 'react-csv'
//import ArrowDownward from "@material-ui/icons/ArrowDownward";


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
    marginTop:20,
    width:1000,
    background:'#fff'
},
input: {
    display: 'none',
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Tailor(props)
{ 
  const [list, setList]=useState([])
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////

  const [categoryid,setCategoryid]=useState('')
  const [tailorid,setTailorid]=useState('')
  const [tailorname,setTailorName]=useState('')
  const [tailoraddress1,setTailorAddress1]=useState('')
  const [tailoraddress2,setTailorAddress2]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [latitude,setLatitude]=useState('')
  const [longitude,setLongitude]=useState('')
  const [description,setDescription]=useState('')
  const [url,setURL]=useState('')
  const [emailid,setEmailid]=useState('')
  const [mobileno,setMobileno]=useState('')
  const [password,setPassword]=useState('')
  const [registrationno,setRegistrationno]=useState('')
  const [photocopy,setPhotocopy]=useState({bytes:'', file:'/noimage.webp'})
  const [logo,setLogo]=useState({bytes:'', file:'/noimage.webp'})
  const [status,setStatus]=useState('')
  const [getRowData,setRowData]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listState,setListState]=useState([])
  const [listCity,setListCity]=useState([])

const [adSaveCancel,setAdSaveCancel]=useState(false)
const [logoSaveCancel,setLogoSaveCancel]=useState(false)


const fetchAllTailor = async () => {
  var result = await getData("tailor/displayAll");
  setList(result);
};



const handleLogo=(event)=>{
  setLogo({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  // setLogoSaveCancel(true)

}
const handleEditLogo=(event)=>{
  setLogo({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setLogoSaveCancel(true)

}

const handleAd=(event)=>{
  setPhotocopy({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  //setAdSaveCancel(true)

}

const handleEditAd=(event)=>{
  setPhotocopy({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setAdSaveCancel(true)

}





{/*const handleIcon=(event)=>{
  setURL({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setIconSaveCancel(true)

}*/}

const handledelete=async(tailorid)=>{
  // var tid=getRowData.tailorid
  var body = {tailorid:tailorid}
  var result = await postData('tailor/deletetailor',body);

  if(result)
  {
      swal({
          title: "Tailor Deleted Successfully",
          icon: "success",
          dangerMode: true,
          
         })
         setOpen(false)
      fetchAllTailor()
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
  setTailorid(rowData.tailorid)
  swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handledelete(tailorid)
        
      } 
    });
 }


{/*const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setURL({bytes:'',file:`${ServerURL}/images/${getRowData.url}`})
}*/}

const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setPhotocopy({bytes:'',file:`${ServerURL}/images/${getRowData.photocopy}`})
} 

const handleCancelLogo=()=>{
  setLogoSaveCancel(false)
  setLogo({bytes:'',file:`${ServerURL}/images/${getRowData.logo}`})
} 


{/*const handleClickSaveIcon=async()=>{

  var formData = new FormData()
  formData.append("tailorid",tailorid)
  formData.append("url",url.bytes)
  
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('tailor/editurl',formData, config)
  if(result)
  {
      swal({
          title: "URL Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setIconSaveCancel(false)
  }

}*/}

const handleClickSaveAd=async()=>{

  var formData = new FormData()
  formData.append("tailorid",tailorid)
  formData.append("photocopy",photocopy.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('tailor/editphotocopy',formData, config)
  if(result)
  {
      swal({
          title: "Photocopy Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setAdSaveCancel(false)
  }

}


const handleClickSaveLogo=async()=>{

  var formData = new FormData()
  formData.append("tailorid",tailorid)
  formData.append("logo",logo.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('tailor/editlogo',formData, config)
  if(result)
  {
      swal({
          title: "Logo Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setLogoSaveCancel(false)
  }

}


const handleEdit=async()=>{
  var error=false
  var msg="<div>"

  {/*if(isBlank(tailorname))
  {error=true
  msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Category Name Should Not Be Blank..</b></font><br>"}*/}

  if(isBlank(tailorname))
  {error=true
      msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
  }
  if(isBlank(tailoraddress1))
  {error=true
      msg+="<font color='#c0392b'><b>Tailor Address 1 should not be blank..</b></font><br>"
  }
  if(isBlank(tailoraddress2))
  {error=true
      msg+="<font color='#c0392b'><b>Tailor Address 2 should not be blank..</b></font><br>"
  }
  if(isBlank(state))
  {error=true
      msg+="<font color='#c0392b'><b>State should not be blank..</b></font><br>"
  }
  if(isBlank(city))
  {error=true
      msg+="<font color='#c0392b'><b>City should not be blank..</b></font><br>"
  }
  if(isBlank(latitude))
  {error=true
      msg+="<font color='#c0392b'><b>Latitude should not be blank..</b></font><br>"
  }
  if(isBlank(longitude))
  {error=true
      msg+="<font color='#c0392b'><b>Longitude should not be blank..</b></font><br>"
  }

  if(isBlank(description))
  {error=true
      msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
  }
  {/*if(isBlank(emailid))
  {error=true
      msg+="<font color='#c0392b'><b>Email Id should not be blank..</b></font><br>"
  }*/}
  if(isBlank(mobileno))
  {error=true
      msg+="<font color='#c0392b'><b>Mobile No should not be blank..</b></font><br>"
  }
  if(isBlank(registrationno))
  {error=true
      msg+="<font color='#c0392b'><b>Registration No should not be blank..</b></font><br>"
  }
  
  if(isBlank(status))
  {error=true
      msg+="<font color='#c0392b'><b>Please choose status..</b></font><br>"
  }

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
  var body={'categoryid':categoryid,'tailorid':tailorid,'tailorname':tailorname,'tailoraddress1':tailoraddress1,'tailoraddress2':tailoraddress2,'state':state,
        'city':city,'latitude':latitude,'longitude':longitude,'description':description,'url':url,'emailid':emailid,'mobileno':mobileno,'password':password,
         'registrationno':registrationno,'status':status};
  var result = await postData("tailor/edittailor", body);
  if (result) {
    swal({
      title: "Tailor Updated Successfully",
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
  FillStatebyCity(rowData.state)
  setRowData(rowData)
  setOpen(true);
  setCategoryid(rowData.categoryid);
  setTailorid(rowData.tailorid);
  setTailorName(rowData.tailorname);
  setTailorAddress1(rowData.tailoraddress1);
  setTailorAddress2(rowData.tailoraddress2);
  setState(rowData.state);
  setCity(rowData.city);
  setLatitude(rowData.latitude);
  setLongitude(rowData.longitude);
  setDescription(rowData.description)
  setURL(rowData.url);
  setEmailid(rowData.emailid);
  setMobileno(rowData.mobileno);
  setPassword(rowData.password);
  setRegistrationno(rowData.registrationno);
  setPhotocopy({bytes:"",file:`${ServerURL}/images/${rowData.photocopy}`})
  setLogo({bytes:"",file:`${ServerURL}/images/${rowData.logo}`})
  setStatus(rowData.status)

};

const handleClose = () => {
  setOpen(false);
  fetchAllTailor()
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
              Edit/Delete Tailor
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
                        Tailor Interface
                    </div>
                </Grid>

              { /* <Grid item xs={12}>
                    <TextField label="Category Id" value={categoryName} onChange={(event)=>setCategoryid(event.target.value)} variant="outlined" fullWidth/>
               </Grid>*/}

                <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={categoryid}
                  onChange={(event)=>setCategoryid(event.target.value)}
               
                  label="Category Id"
                
                  >
                  {showCategory()}
                  </Select>
                  </FormControl>
  
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Tailor Name" value={tailorname} onChange={(event)=>setTailorName(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Tailor Address 1" value={tailoraddress1} onChange={(event)=>setTailorAddress1(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Tailor Address 2" value={tailoraddress2} onChange={(event)=>setTailorAddress2(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>

                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={state}
                  onChange={(event)=>handleStateChange(event)}
               
                  label="State"
                
                  >
                 {showState()}
                  </Select>
                  </FormControl>
  
                    
                </Grid>

                <Grid item xs={12} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-city">City</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-city"
                  id="demo-simple-select-outlined-city"
                  value={city}
                  onChange={(event)=>setCity(event.target.value)}
               
                  label="City"
                
                  >
                  {showCity()}
                  </Select>
                  </FormControl>
  
                </Grid>

                <Grid xs={12} sm={3}>
                    <TextField label="Latitude" value={latitude} onChange={(event)=>setLatitude(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid xs={12} sm={3}>
                    <TextField label="Longitude" value={longitude} onChange={(event)=>setLongitude(event.target.value)} variant="outlined" fullWidth/>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="URL" value={url} onChange={(event)=>setURL(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Email Id" value={emailid} onChange={(event)=>setEmailid(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Mobile No" value={mobileno} onChange={(event)=>setMobileno(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Password" value={password} onChange={(event)=>setPassword(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Registration No" value={registrationno} onChange={(event)=>setRegistrationno(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={status}
                onChange={(event)=>setStatus(event.target.value)}
             
                label="Status"
              
                >
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Active'}>Active</MenuItem>
                </Select>
                </FormControl>

                </Grid>


                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400,marginLeft:30}}>Edit Photocopy</span>
                <input onChange={(event)=>handleEditAd(event)} accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
                <label htmlFor="icon-button-ad">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={photocopy.file} style={{width:60,height:60}}/>
                {adSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveAd()}>Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
                </Grid>

                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400,marginLeft:30}}>Edit Logo</span>
                <input onChange={(event)=>handleEditLogo(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                <label htmlFor="icon-button-logo">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={logo.file} style={{width:60,height:60}}/>
                {logoSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveLogo()}>Save</Button><Button color="secondary" onClick={()=>handleCancelLogo()}>Cancel</Button></span>:<></>}
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
    fetchAllCategory()
    fetchAllState()

  },[])

  const showCategory=()=>{
    return listCategory.map((item)=>{
      return(
         <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )

    })
  }



  const fetchAllState=async()=>{
    var result = await getData("state/displayAll") 
    setListState(result);

  }


  const showState=()=>{
    return listState.map((item)=>{
      return(
         <MenuItem value={item.stateid}>{item.statename}</MenuItem>
      )

    })
  }
  

  const handleStateChange=async(event)=>{
    setState(event.target.value)
    FillStatebyCity(event.target.value)
  }


  const FillStatebyCity=async(sid)=>{
    var body={stateid:sid}
    var result = await  postData("state/displaycitybystateid",body)
      setListCity(result)

  }

  const showCity=()=>{
    return listCity.map((item)=>{
      return(
         <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
      )

    })
  }


  const handleResetClick=()=>{
    setTailorName('')
    setTailorAddress1('')
    setTailorAddress2('')
    setState('')
    setCity('')
    setLatitude('')
    setLongitude('')
    setDescription('')
    setURL('')
    setEmailid('')
    setMobileno('')
    setPassword('')
    setRegistrationno('')
    setPhotocopy({bytes:'',file:'/noimage.JFIF'})
    setLogo({bytes:'',file:'/noimage.JFIF'})
    setStatus('')
  }
  
  const handleSubmitClick=async()=>{
    var error=false
    var msg="<div>"

    if(isBlank(tailorname))
  {error=true
      msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
  }
  if(isBlank(tailoraddress1))
  {error=true
      msg+="<font color='#c0392b'><b>Tailor Address 1 should not be blank..</b></font><br>"
  }
  if(isBlank(tailoraddress2))
  {error=true
      msg+="<font color='#c0392b'><b>Tailor Address 2 should not be blank..</b></font><br>"
  }
  if(isBlank(state))
  {error=true
      msg+="<font color='#c0392b'><b>State should not be blank..</b></font><br>"
  }
  if(isBlank(city))
  {error=true
      msg+="<font color='#c0392b'><b>City should not be blank..</b></font><br>"
  }
  if(isBlank(latitude))
  {error=true
      msg+="<font color='#c0392b'><b>Latitude should not be blank..</b></font><br>"
  }
  if(isBlank(longitude))
  {error=true
      msg+="<font color='#c0392b'><b>Longitude should not be blank..</b></font><br>"
  }

  if(isBlank(description))
  {error=true
      msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
  }
  if(isBlank(url))
  {error=true
      msg+="<font color='#c0392b'><b>URL should not be blank..</b></font><br>"
  }
  {/*if(isBlank(emailid))
  {error=true
      msg+="<font color='#c0392b'><b>Email Id should not be blank..</b></font><br>"
  }*/}
  if(isBlank(mobileno))
  {error=true
      msg+="<font color='#c0392b'><b>Mobile No should not be blank..</b></font><br>"
  }
  if(isBlank(registrationno))
  {error=true
      msg+="<font color='#c0392b'><b>Registration No should not be blank..</b></font><br>"
  }
  if(isBlank(photocopy.bytes))
  {error=true
      msg+="<font color='#c0392b'><b>Please Select Photocopy for Tailor</b></font><br>"
  }
  if(isBlank(logo.bytes))
  {error=true
      msg+="<font color='#c0392b'><b>Please Select Logo for Tailor</b></font><br>"
  }
  if(isBlank(status))
  {error=true
      msg+="<font color='#c0392b'><b>Please choose status..</b></font><br>"
  }


    {/*if(isBlank(tailorname))
    {error=true
        msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Tailor Name Should Not Be Blank..</b></font><br>"}
    if(isBlank(url.bytes))
        {error=true
            msg+="<font  fontFamily= 'Georgia,Times,Times New Roman,serif' color='#e74c3c'><b>Please select URL for Tailor..</b></font><br>"
          } */}
  
    if(error)
    {
        swalhtml(renderHTML(msg))
    }
    else{
      var formData=new FormData()
      formData.append("categoryid",categoryid)
      formData.append("tailorname",tailorname)
      formData.append("tailoraddress1",tailoraddress1)
      formData.append("tailoraddress2",tailoraddress2)
      formData.append("state",state)
      formData.append("city",city)
      formData.append("latitude",latitude)
      formData.append("longitude",longitude)
      formData.append("description",description)
      formData.append("url",url)
      formData.append("emailid",emailid)
      formData.append("mobileno",mobileno)
      formData.append("password",mobileno)
      formData.append("registrationno",registrationno)
      formData.append("photocopy",photocopy.bytes)
      formData.append("logo",logo.bytes)
      formData.append("status",status)
      var config = {headers:{"content-type":"multipart/form-data"}}
      var result = await postDataAndImage('tailor/addnewtailor',formData, config)
      if(result)
      {
          swal({
              title: "Tailor Submitted Successfully",
              icon: "success",
              dangerMode: true,
             })
      }
    }
  }
  

  const addtailor=()=>{

    return (
      <div className={classes.root}>
          <div className={classes.subdiv}>
            <Paper elevation={2} style={{padding:30, outline:'10px solid #dfe6e9'}}>
              <Grid container spacing={1} >
                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                      <div style={{display:'flex',justifyContent:'center',marginBottom:25,justifyContent:'center',alignItems:'center',width:'50%',fontSize:26,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:1, padding:10}}>
                          Tailor Interface
  
                      </div>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={status}
                 onChange={(event)=>setCategoryid(event.target.value)}
               
                  label="Category Id"
                
                  >
                    {showCategory()}
                  
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Tailor Name" onChange={(event)=>setTailorName(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Tailor Address 1" onChange={(event)=>setTailorAddress1(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Tailor Address 2" onChange={(event)=>setTailorAddress2(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-state">State</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-state"
                  id="demo-simple-select-outlined-state"
                  value={state}
                  onChange={(event)=>handleStateChange(event)}
               
                  label="State"
                
                  >
                  {showState()}
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label-city">City</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label-city"
                  id="demo-simple-select-outlined-city"
                  value={city}
                  onChange={(event)=>setCity(event.target.value)}
               
                  label="City"
                
                  >
                  {showCity()}
                  </Select>
                  </FormControl>
  
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Latitude" onChange={(event)=>setLatitude(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Longitude" onChange={(event)=>setLongitude(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
  
                  <Grid item xs={12} sm={6}>
                      <TextField label="Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField label="URL" onChange={(event)=>setURL(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Email Id" onChange={(event)=>setEmailid(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Mobile No" onChange={(event)=>setMobileno(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField label="Password" onChange={(event)=>setPassword(event.target.value)} variant="outlined" fullWidth/>
                </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Registration No" onChange={(event)=>setRegistrationno(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>

                  <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={status}
                  onChange={(event)=>setStatus(event.target.value)}
               
                  label="Status"
                
                  >
                  <MenuItem value={'Pending'}>Pending</MenuItem>
                  <MenuItem value={'Active'}>Active</MenuItem>
                  </Select>
                  </FormControl>
  
                  </Grid>

  
  
                  <Grid item xs={12} sm={6}>
                  <span style={{fontSize:15,fontWeight:400,marginLeft:30}}>Add Photocopy</span>
                  <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
                  <label htmlFor="icon-button-ad">
                  <IconButton color="primary" component="span">
                  <PhotoCamera />
                  </IconButton>
                  </label>
                  </Grid>
  
                  <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                  <Avatar variant="rounded" src={photocopy.file} style={{width:60,height:60}}/>
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                  <span style={{fontSize:15,fontWeight:400,marginLeft:30}}>Add Logo</span>
                  <input onChange={(event)=>handleLogo(event)} accept="image/*" className={classes.input} id="icon-button-logo" type="file" />
                  <label htmlFor="icon-button-logo">
                  <IconButton color="primary" component="span">
                  <PhotoCamera />
                  </IconButton>
                  </label>
                  </Grid>
  
                  <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                  <Avatar variant="rounded" src={logo.file} style={{width:60,height:60}}/>
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

  const [openTailorDialog, setOpenTailorDialog] = React.useState(false);

const handleOpenInterface = () => {
  handleResetClick();
  setOpenTailorDialog(true);
  // fetchAllCategory();
};


const handleCloseInterface = () => {
  setOpenTailorDialog(false);
  fetchAllTailor();
};
  
    

const showTailorDialog = () => {
  return (
    <div>
      <Dialog
        fullScreen
        open={openTailorDialog}
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
              Add Tailor Interface
            </Typography>
           
          </Toolbar>
        </AppBar>
        {addtailor()}
      </Dialog>
    </div>
  );
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

useEffect(function(){
    fetchAllTailor()
},[])



function displayAll() {
  return (
    <div>
    <MaterialTable
      title=""
      columns={[

       // { title: 'Tailor Id', field: 'tailorid' },
        { title: 'Category', field: 'catname' },
        { title: 'Name', field: 'tailorname' },
       // { title: 'Tailor Address1', field: 'tailoraddress1' },
       // { title: 'Tailor Address2', field: 'tailoraddress2' },
          {title:'Address',cellStyle:{
            whiteSpace:'pre'
          },
        render:rowData=>(<div>{rowData.tailoraddress1},<br/>{rowData.tailoraddress2},<br/>{rowData.cname}<br/>{rowData.sname}</div>)},
       // { title: 'State', field: 'sname' },
       // { title: 'City', field: 'cname' },
      // {title:'Location',
      //render:rowData=>(<div>{rowData.latitude},<br/>{rowData.longitude}</div>)},
       // { title: 'Latitude', field: 'latitude' },
       // { title: 'Longitude', field: 'longitude' },
       // { title: 'Description', field: 'description' },

        {title:'Contact', field:'emailid',cellStyle: {
          whiteSpace: 'pre'
         },
        render:rowData=>(<div>{rowData.mobileno}<br/>{rowData.emailid}<br/>{rowData.url}</div>)
        },

       // { title: 'URL', field: 'url' },
        //{ title: 'Email id' , field: 'emailid' },
        //{ title: 'Mobile No.', field: 'mobileno' },
        {title: 'Password', field: 'password'},
        //{ title: 'Registration No.', field: 'registrationno' },

        { title: 'Photocopy', field: 'photocopy',
          render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.photocopy}`} style={{borderRadius:'5'}} width='40' height='40' /></div>)},


       { title: 'Logo', field: 'logo' ,
          render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.logo}`} style={{borderRadius:'5'}} width='40' height='40' /></div>)},

          { title: 'Status', field: 'status' },
          
      ]}
      data={ list } 
      
      options={{
        search: true,
        searchFieldVariant:'outlined',
        searchFieldAlignment:'left',
        actionsColumnIndex:-1,
        searchFieldStyle:{borderRadius:'20px',border:'1px solid #a4b0be',width:'85%',height:40},
        headerStyle:{fontWeight:700,padding:5,},
        
       
       
      
      }}
      actions={[
        {
          icon: () =>  <span><RefreshIcon color="primary"/></span>,
         onClick: () => {
           fetchAllTailor();
         },
         isFreeAction: true,
         tooltip: 'Refresh',
       },
        {
          icon:  () =>  <span><CSVLink data={list} filename={"MYTAILOR.csv"} target="_blank" className="btn btn-primary" style={{color:'#1abc9c'}}><Button variant='contained' style={{background:'#1abc9c',color:'white'}}><GetAppSharpIcon/>Download Excel</Button></CSVLink></span>,
         
          isFreeAction: true,
        
          
        },
        {
          icon:  () =>  <span><Button variant='contained' color='primary'><LibraryAddSharpIcon/>ADD Tailor</Button></span>,
          onClick: () => {
            handleOpenInterface();
          },
          isFreeAction: true,
          tooltip: 'Add Tailor',
          
        },
        
        {
          icon: 'edit',
          //tootltip: 'Edit Tailor',
          onClick: (event, rowData) => {
          handleClickOpen(rowData);
           
            
          },
          tooltip:'Edit Tailor',
          
        },

        {
          icon: 'delete',
          //tootltip: 'Edit Tailor',
          onClick: (event, rowData) => {
            handleWarning(rowData)
         
          },
          tooltip:'Delete Tailor',
          
        },
       
      ]}
      
       
        
    />
    {showEditDialog()}
    {showTailorDialog()}
    </div>
  )
}
return (<div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>

  <div  style={{width:1400,marginTop:40,padding:3,display:'flex',backgroundColor:"#FFF",justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}>
  <div style={{justifyContent:'center', display:'flex',alignItems:'center'}}><img src='tailor.jpg' width='75px'/></div>
    <div style={{fontSize:22,fontWeight:700,fontFamily:'Georgia,Times,Times New Roman,serif', letterSpacing:2, padding:20}}>Tailor List</div>
    </div>

    
    {displayAll()}
   {/* background:'#1abc9c',color:'white' */}
    </div>

    </div>)
    
}


  