import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Product from './Product';
import ProductByTailor from  './ProductsByTailor'
import Category from './Category'
import TailorProfile from './TailorProfile'
// import Tailor from './Tailor';



export default function ListItems(props) {
    const handleClick = (v) => {
      props.setComponent(v);
    };
    // const handleLogout = (props) => {
    //     props.history.push({pathname:'/adminlogin'});
    //   };
    return(
  <div>
      <div>
   
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon onClick={() => handleClick(<ProductByTailor tid={props.tailorid}/>)} />
      </ListItemIcon>
      <ListItemText primary="Products"
            onClick={() => handleClick(<ProductByTailor tid={props.tailorid} />)}/>
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
      <ShoppingCartIcon onClick={() => handleClick(<TailorProfile tid={props.tailorid} />)} />
      </ListItemIcon>
      <ListItemText  primary="Edit Profile"
            onClick={() => handleClick(<TailorProfile tid={props.tailorid} />)}
            />
    </ListItem> */}
    
    
   
  </div>


  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
)}