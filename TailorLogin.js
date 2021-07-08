import React, {useState} from 'react';
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
import {postData} from "./FetchNodeServices";
import { makeStyles } from '@material-ui/core/styles';

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
   // backgroundImage: 'url(https://source.unsplash.com/random)',
    //backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //backgroundSize: 'cover',
   // backgroundPosition: 'center',
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
}));

export default function TailorLogin(props) {
  const classes = useStyles();

  const [mobileno,setMobileNo]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')

  const handleClick=async()=>{
    var body={'mobileno':mobileno,'password':password}
    var result=await postData('tailor/checktailorlogin',body)
    if(result.result)
    {
      var tid=result.data[0].tailorid
      props.history.push({pathname:'/tailordashboard'},{tailorid:tid});
    }
    else
    {
      setMsg("Invalid Tailor Id/Password....")
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} ><div><img src="tailorlogin.jpg" style={{width:'900px',height:'750px'}}></img></div></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mobile no/Email Id"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setMobileNo(event.target.value)}
            />
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>handleClick()}
            >
              Sign In
            </Button>

            <Grid container justify="flex-end">
            <Grid item>
              <Link href="/tailorsignup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
            </Grid>

            <div style={{fontWeight:600,color:'red'}}>
            {msg}
            </div>
            
            <Box mt={5}>
              <Copyright />
            </Box>
  
        </div>
      </Grid>
    </Grid>
  );
}