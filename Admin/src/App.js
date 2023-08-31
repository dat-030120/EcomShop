import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import EditProduct from "./pages/editProduct/EditProduct";
import { useSelector } from "react-redux";
import Order from "./pages/order/Order";
import Analytics from "./pages/analytics/analytics";


  

function App() {
  const admin = useSelector((state) => state.user.currentUser?.user?.isAdmin);
  return (
    <Router>
      <Switch>
      <Route path="/login">{admin ==null|| admin===false ? <Login/> : <Redirect to="/" />}</Route>
          <>
          {}
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route exact path="/">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<Home />}   
                </Route>
                <Route path="/users">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<UserList />}   
                </Route>
                <Route path="/user/:userId">
                {admin ==null|| admin===false  ?<Redirect to="/login" /> :<User />}  
                </Route>
                <Route path="/products">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<ProductList />} 
                </Route>
                <Route path="/product/:productId">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<Product />}  
                </Route>
                <Route path="/editproduct/:productId">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<EditProduct/>}  
                </Route>
                <Route path="/newproduct">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<NewProduct />}  
                </Route>
                <Route path="/newuser">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<NewUser/>}  
                </Route>
                <Route path="/order">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<Order/>}  
                </Route> 
                <Route path="/analytics">
                {admin ==null|| admin===false ? <Redirect to="/login" /> :<Analytics/>}  
                </Route>       
              </Switch>
            </div>
          </>
      </Switch>
    </Router>
  );
}

export default App;
