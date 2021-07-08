import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Category from './Category';
import Tailor from './Tailor';
import Product from './Product';
import ProductCategory from './ProductCategory';
import Attributes from './Attributes';

 export default function ListItems(props)
 {
     const handleClick=(v)=>{
         props.setComponent(v)
     }


     return(
         <div>
            
  <div>
 
    <ListItem button>
      <ListItemIcon>
       <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Category" onClick={()=>handleClick(<Category/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Tailor" onClick={()=>handleClick(<Tailor/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Product" onClick={()=>handleClick(<Product/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Product Category" onClick={()=>handleClick(<ProductCategory/>)} />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Attribute" onClick={()=>handleClick(<Attributes/>)} />
    </ListItem>
   
      
   </div>
</div>
);
}