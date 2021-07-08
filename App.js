import React from 'react';
import Tailor from './Component/Tailor';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Category from './Component/Category';
import Product from './Component/Product';
import AdminLogin from './Component/AdminLogin';
import AdminDashBoard from './Component/AdminDashBoard';
import ProductCategory from './Component/ProductCategory';
import Attributes from './Component/Attributes';
import TailorSignUp from './Component/TailorSignUp';
import TailorLogin from './Component/TailorLogin';
import TailorProfile from './Component/TailorProfile';
import TailorDashBoard from './Component/TailorDashboard';




function App(props) {
  return (
    <div>
      <Router>

        <Route
        exact
        strict
        component={Category}
        path="/category"
        history={props.history}
        ></Route>

        <Route
        exact
        strict
        component={Product}
        path="/product"
        history={props.history}
        ></Route>

       

       <Route
        exact
        strict
        component={Tailor}
        path="/tailor"
        history={props.history}
        ></Route>

        <Route
        exact
        strict
        component={AdminLogin}
        path="/adminlogin"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={AdminDashBoard}
        path="/admindashboard"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={ProductCategory}
        path="/productcategory"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={Attributes}
        path="/attributes"
        history={props.history}
        ></Route>

        <Route
        exact
        strict
        component={TailorSignUp}
        path="/tailorsignup"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={TailorLogin}
        path="/tailorlogin"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={TailorProfile}
        path="/tailorprofile"
        history={props.history}
        ></Route>

       <Route
        exact
        strict
        component={TailorDashBoard}
        path="/tailordashboard"
        history={props.history}
        ></Route>

        



      </Router>
    </div>
  );
}

export default App;
