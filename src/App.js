import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageProducts from './Components/ManageProducts/ManageProducts';
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import Update from './Components/Update/Update';
import Login from './Components/Login/Login';
import React, { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProceedOrder from './Components/ProceedOrder/ProceedOrder';
import SelectedProduct from './Components/SelectedProduct/SelectedProduct';
import ContinuePage from './Components/ContinuePage/ContinuePage';
//import ClientOrders from './Components/ClientOrders/ClientOrders';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddAdmin from './Components/AddAdmin/AddAdmin';

export const UserContext = createContext('');

function App() {
  const [loggedinUser, setLoggedinUser] = useState({});
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home></Home>
          </Route>

          <PrivateRoute path="/order">
            <ProceedOrder></ProceedOrder>
          </PrivateRoute>

          <Route path="/manage">
            <ManageProducts></ManageProducts>
          </Route>

          <Route path="/addAdmin">
            <AddAdmin></AddAdmin>
          </Route>

          <PrivateRoute path="/continue">
            <ContinuePage></ContinuePage>
          </PrivateRoute>

          <PrivateRoute path="/selectedProduct/:productId">
          <SelectedProduct></SelectedProduct>
          </PrivateRoute>

          <Route path="/update">
            <Update></Update>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/">
            <Home></Home>
          </Route>

          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
