import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { removeCart } from "../redux/cartReducer";
import { userRequest } from "../requestMethods";
import socketIOClient from "socket.io-client";

const Success = () => {
  const location = useLocation();
  const data = location.pathname.split("/")[2];
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user?.currentUser.user);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const  socketRef= useRef()
  
  useEffect(() => {
    socketRef.current = socketIOClient.connect('https://socket-1o57.onrender.com/')
    socketRef.current.emit('join_room', {})
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          email: currentUser.email,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantiny: item.quantity,
          })),
          amount: cart.total,
          address: data,
        });
        console.log("asas")
        socketRef.current.emit('send_message', {test:"ok"})
        dispatch(removeCart({}));

      } catch {}
    };
    if(data !==null && cart.products?.length >0 ){ createOrder();}
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue"
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/cart" style={{ padding: 10, marginTop: 20 }}>Go to Homepage</Link>
    </div>
  );
};

export default Success;