const express =require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const path = require('path');


dotenv.config();

    mongoose
    .connect(process.env.MongooseURl)
    .then(()=> console.log("DBconnet successful"))
    .catch((err)=>{console.log(err)
    });
    app.use(cors());
    app.use(express.json());
    app.use("/api/users",userRoute);
    app.use("/api/auth",authRoute);
    app.use("/api/products",productRoute);
    app.use("/api/carts",cartRoute);
    app.use("/api/orders",orderRoute);
    app.use("/api/checkout", stripeRoute);
 
      app.use(express.static(path.resolve(__dirname, "./admin/build")));
      ; 
      app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, './admin/build', 'index.html'));
      });
  
    app.listen(process.env.PORT|| 5000,()=> {
    console.log("Backend server oioiuis ")
});