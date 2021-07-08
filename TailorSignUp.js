import React, {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {postData,postDataAndImage,getData} from "./FetchNodeServices";
import { makeStyles } from '@material-ui/core/styles';
import swal from "sweetalert";
import swalhtml from "@sweetalert/with-react"
import renderHTML from "react-render-html"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.numericinfosystems.in/">
        Numeric Infosystem Pvt. Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
   //backgroundImage: 'url(https://source.unsplash.com/random)',
    //backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //backgroundSize: 'cover',
    //backgroundPosition: 'center',
    
   
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pass:{
    marginTop:16,
    width:284,
  },
}));

export default function TailorSignUp(props) {
  const classes = useStyles();

  const [categoryid,setCategoryId]=useState('')
  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [mobileno,setMobileNo]=useState('')
  const [emailAddress,setEmailAddress]=useState('')
  const [password,setPassword]=useState('')
  const [confirmpassword,setConfirmPassword]=useState('')
  const [valuepassword,setvaluepassword]=useState('')
  const [listCategory,setListCategory]=useState([])

  //const [valueconfirmpassword,setValueConfirmPassword]=useState('')
  const [msg,setMsg]=useState('')


  const fetchAllCategory=async()=>{
    var result = await getData("category/displayall") 
    setListCategory(result);

  }

  useEffect(function() {
    
    fetchAllCategory()

   

  },[])

  const showCategory=()=>{
    return listCategory.map((item)=>{
      return(
         <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )

    })
  }

  const handleconfirmpassword=(event)=>{
    if(event.target.value===password || event.target.value.length===0){
        setvaluepassword(false)
        setConfirmPassword(event.target.value)
    }
    else{
        setvaluepassword(true)
    }

}
  
  {/*const handleClick=async()=>{
    var body={'emailid':emailAddress,'password':password}
    var result=await postData('admin/chackadminlogin',body)
    if(result.result)
    {
      props.history.push({pathname:'/product'})
    }
    else
    {
      setMsg("Invalid AdminId/Password....")
    }
  }*/}

  var name = firstname+" "+lastname

  const handleClick=async()=>{

      var body={'categoryid':categoryid,'tailorname':name,'mobileno':mobileno,'emailid':emailAddress,'password':password}
      var result= await postData('tailor/addnewtailor',body)
    if(result)
    {
        swal({
            title: "Sign Up Successfully",
            icon: "success",
            dangerMode: true,
          })
          props.history.push({'pathname':'/tailorlogin'})
    }
  }

  {/*const confirm=async()=>{
    if((setValueConfirmPassword===setPassword)||(setValueConfirmPassword===0))
    {
     valueconfirmpassword(false)
    }
  }*/}


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}><div><img src='tailorsignup.jpg' style={{width:'900px',height:'750px'}}></img></div></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          
          <Grid container spacing={1}>

          <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Categoryid</InputLabel>
                  <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={categoryid}
                  onChange={(event)=>setCategoryId(event.target.value)}
               
                  label="Category Id"
                
                  >
                  {showCategory()}
                  </Select>
                  </FormControl>
            </Grid>
            
          <Grid item xs={12} sm={6}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoComplete="fname"
              autoFocus
              onChange={(event)=>setFirstName(event.target.value)}
            />
            </Grid>
           

            <Grid item xs={12} sm={6}>
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              name="lname"
              autoComplete="lname"
              autoFocus
              onChange={(event)=>setLastName(event.target.value)}
            />
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobileno"
              label="Mobile No."
              name="mobileno"
              autoComplete="mobileno"
              autoFocus
              onChange={(event)=>setMobileNo(event.target.value)}
            />
            </Grid>
            
            <Grid item xs={12} sm={6}>
             <TextField
              variant="outlined"
              margin="normal"
             // required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setEmailAddress(event.target.value)}
            />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>setPassword(event.target.value)}
            />
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={valuepassword}
              id="confirm_password"
              label="Confirm password"
              name="confirm_password"
              type="password"
              autoComplete="confirm-password"
              autoFocus
              
            onChange={(event)=>handleconfirmpassword(event)}
            />
            </Grid>


           
           {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
           />*/}

             <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
             onClick={()=>handleClick()}
            >
                
              Sign Up
            </Button>
            </Grid>

            <Grid container justify="flex-end">
            <Grid item>
              <Link href="/tailorlogin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          
            </Grid>

           {/* <div style={{fontWeight:600,color:'red'}}>
            {msg}
        </div>*/}
            
            <Box mt={5}>
              <Copyright />
            </Box>
  
        </div>
      </Grid>
    </Grid>
  );
}