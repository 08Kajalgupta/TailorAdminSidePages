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
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import Paper from '@material-ui/core/Paper';
// import { CSVLink} from "react-csv";

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
    // marginTop:5,
    width:800,
    background:'#fff'
},
input: {
    display: 'none',
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function TailorProfile(props)
{ 
  const [list, setList]=useState([])
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////
var tailorid=props.tailorid
  const [categoryid,setCategoryid]=useState('')
  const [Tailorid,setTailorid]=useState('')
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
  const [registrationno,setRegistrationno]=useState('')
  const [photocopy,setPhotocopy]=useState({bytes:'', file:'/noimage.jfif'})
  const [logo,setLogo]=useState({bytes:'', file:'/noimage.jfif'})
  const [status,setStatus]=useState('')
  const [getRowData,setRowData]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listState,setListState]=useState([])
  const [listCity,setListCity]=useState([])


// const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [adSaveCancel,setAdSaveCancel]=useState(false)
const [logoSaveCancel,setLogoSaveCancel]=useState(false)


const fetchAllTailor = async () => {
    var body={tailorid:tailorid}
  var result = await postData("tailor/displaytailorbyid",body);
  setList(result);
  setTailorid(tailorid)
  handleClickOpen(result[0])
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
  // setAdSaveCancel(true)

}
const handleEditAd=(event)=>{
  setPhotocopy({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setAdSaveCancel(true)

}






const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setPhotocopy({bytes:'',file:`${ServerURL}/images/${getRowData.photocopy}`})
} 

const handleCancelLogo=()=>{
  setLogoSaveCancel(false)
  setLogo({bytes:'',file:`${ServerURL}/images/${getRowData.logo}`})
} 




const handleClickSaveAd=async()=>{

  var formData = new FormData()
  formData.append("tailorid",Tailorid)
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
  formData.append("tailorid",Tailorid)
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


//   if(isBlank(tailorname))
//   {error=true
//       msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
//   }
//   if(isBlank(tailoraddress1))
//   {error=true
//       msg+="<font color='#c0392b'><b>Tailor Address 1 should not be blank..</b></font><br>"
//   }
//   if(isBlank(tailoraddress2))
//   {error=true
//       msg+="<font color='#c0392b'><b>Tailor Address 2 should not be blank..</b></font><br>"
//   }
//   if(isBlank(state))
//   {error=true
//       msg+="<font color='#c0392b'><b>State should not be blank..</b></font><br>"
//   }
//   if(isBlank(city))
//   {error=true
//       msg+="<font color='#c0392b'><b>City should not be blank..</b></font><br>"
//   }
//   if(isBlank(latitude))
//   {error=true
//       msg+="<font color='#c0392b'><b>Latitude should not be blank..</b></font><br>"
//   }
//   if(isBlank(longitude))
//   {error=true
//       msg+="<font color='#c0392b'><b>Longitude should not be blank..</b></font><br>"
//   }

//   if(isBlank(description))
//   {error=true
//       msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
//   }
//   if(isBlank(emailid))
//   {error=true
//       msg+="<font color='#c0392b'><b>Email Id should not be blank..</b></font><br>"
//   }
//   if(isBlank(mobileno))
//   {error=true
//       msg+="<font color='#c0392b'><b>Mobile No should not be blank..</b></font><br>"
//   }
//   if(isBlank(registrationno))
//   {error=true
//       msg+="<font color='#c0392b'><b>Registration No should not be blank..</b></font><br>"
//   }
  
//   if(isBlank(status))
//   {error=true
//       msg+="<font color='#c0392b'><b>Please choose status..</b></font><br>"
//   }

//   if(error)
//   {
//       swalhtml(renderHTML(msg))
//   }

  var body={'categoryid':categoryid,'tailorid':tailorid,'tailorname':tailorname,'tailoraddress1':tailoraddress1,'tailoraddress2':tailoraddress2,'state':state,
        'city':city,'latitude':latitude,'longitude':longitude,'description':description,'emailid':emailid,'mobileno':mobileno,
         'registrationnumber':registrationno,'url':url,'status':status};
  var result = await postData("tailor/edittailor", body);
  if (result) {
    swal({
      title: "Tailor Updated Successfully",
      icon: "success",
      dangerMode: true,
    });
  }

}

////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////Edit Dialog/////////////////////



const handleClickOpen = (rowData) => {
  setRowData(rowData)
//   setOpen(true);
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
  setURL(rowData.url)
  setEmailid(rowData.emailid);
  setMobileno(rowData.mobileno);
  setRegistrationno(rowData.registrationnumber);
  setPhotocopy({bytes:"",file:`${ServerURL}/images/${rowData.photocopy}`})
  setLogo({bytes:"",file:`${ServerURL}/images/${rowData.logo}`})
  if(rowData.status !=null){
  setStatus(rowData.status)}
  else{
      setStatus("Pending")
  }
  FillStatebyCity(rowData.state)

};







//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////Add Dialog////////////////////////////////////////////////////////////

  const fetchAllCategory=async()=>{
    var result = await getData("category/displayall") 
    setListCategory(result);

  }

  useEffect(function() {
    fetchAllTailor()
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
    //   alert(event.target.value)
    setState(event.target.value)
    // alert(state)
    FillStatebyCity(event.target.value)
  }


  const FillStatebyCity=async(sid)=>{
    var body={stateid:sid}
    var result = await  postData("state/displaycitybystateid",body)
    // alert(result)
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
    setCategoryid('')
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
    setRegistrationno('')
    setPhotocopy({bytes:'',file:'/noimage.JFIF'})
    setLogo({bytes:'',file:'/noimage.JFIF'})
    setStatus('')
  }
  
 

    
  
    
  const addtailor=()=>{

    return (
      <div className={classes.root}>
          <div className={classes.subdiv}>
            <Paper elevation={2} style={{padding:30, outline:'10px solid #dfe6e9'}}>
              <Grid container spacing={1} >
                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <div><img src='newww.jpg' width='95px' alt="" ></img></div>
                      <div style={{fontSize:23, fontFamily:'Georgia,Times,Times New Roman,serif',fontWeight:650, letterSpacing:2, padding:18}}>
                          EDIT Profile
                          </div>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Category Id</InputLabel>
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
  
                  <Grid item  xs={12} sm={3}>
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
                      <TextField label="Latitude" value={latitude} onChange={(event)=>setLatitude(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Longitude" value={longitude} onChange={(event)=>setLongitude(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Description" value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  

                 <Grid item  xs={12} sm={3}>
                      <TextField label="Email Id" value={emailid} onChange={(event)=>setEmailid(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Mobile No" value={mobileno} onChange={(event)=>setMobileno(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>
                      <TextField label="Registration No" value={registrationno} onChange={(event)=>setRegistrationno(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>
  
  
                  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <span style={{fontSize:15,fontWeight:400}}>Add Photocopy</span>
                  <input onChange={(event)=>handleEditAd(event)} accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
                  <label htmlFor="icon-button-ad">
                  <IconButton color="primary" component="span">
                  <PhotoCamera />
                  </IconButton>
                  </label>
                  </Grid>
  
                  <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Avatar variant="rounded" src={photocopy.file} style={{width:60,height:60}}/>
                  {adSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveAd()}>Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
                  </Grid>
  
                  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <span style={{fontSize:15,fontWeight:400}}>Add Logo</span>
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
                  <Grid item xs={12} sm={8} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                  <TextField label="Website" value={url} onChange={(event)=>setURL(event.target.value)} variant="outlined" fullWidth/>
                 </Grid>
                  <Grid item xs={12} sm={4}>
                    
                  <TextField label="Status" value={status} variant="outlined" fullWidth/>
                  {/* <FormControl variant="outlined" fullWidth>
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
                  </FormControl> */}
  
                  </Grid>

                  <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                        <Button style={{width:200}} onClick={()=>handleEdit()}  variant="contained" color="primary" fullWidth>Update</Button>
                    </Grid>
                   
  
              </Grid>
              </Paper>
          </div>
      </div>
  
  )
  
  }

  const [openTailorDialog, setOpenTailorDialog] = React.useState(true);





    


// //////////////////////////////////////////////////////////////////////////////////

return (<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<div style={{width:1600,padding:3,display:'flex',justifyContent:'center',alignContent:'center',alignItem:'center',flexDirection:'column'}}>

    {addtailor()}
    </div>
    </div>)
    }


  
