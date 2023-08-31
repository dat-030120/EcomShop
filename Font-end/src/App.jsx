import Home from "./page/Home";
import ProductList from "./page/ProductList";
import Product from "./page/Product";
import Login from "./page/Login";
import Register from "./page/Register/Dangky";

import Cart from "./page/Cart";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import Success from "./page/Success";
import Account from "./page/Account";
import ResetPass from "./page/ResetPass";
import ForgotPass from "./page/ForgotPass";
import Virifi from "./page/Virifi";

const App = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const verif = useSelector((state) => state.user?.currentUser?.user.verif);

  return (
  <Router>
    <Switch>
      <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<ProductList/>}/>
        <Route exact path="/products/:category" element={<ProductList/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>
        <Route exact path="/forgotpass" element={<ForgotPass/>}/>
       {verif ? (<Route exact path="/cart" element={
          !user ?  <Login />: < Cart/>
        }/>):(<Route exact path="/cart" element={
          !user ?  <Login />: < Virifi/>
        }/>)
        } 
        {user && (
          <Route exact path="/success/:id" element={<Success/>}/>)}
        <Route exact path="/login" element={
          user ? <Navigate to={-1} /> : <Login/>
        }/>
         <Route exact path="/register" element={
          user ? <Navigate to={-1} /> : <Register/>
        }/>
        <Route exact path="/account" element={
          user ? < Account/> : <Login />
        }/>
        <Route exact path="/resetpass" element={
          user ? < ResetPass/> : <Login />
        }/>
        
    </Switch>
  </Router>
   ) ; 

};

export default App;