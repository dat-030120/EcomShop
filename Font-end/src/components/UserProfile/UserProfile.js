import { DataGrid } from "@mui/x-data-grid";
import {
  CalendarToday,
  Email,
  PhoneAndroid,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./userProfile.css";
import { Button } from "@mui/material";

export default function UserProfile() {
  const location = useLocation();
  const [order,setOrders]=useState([])
  const user = useSelector((state) =>state.user.currentUser?.user)
  const history = useNavigate ();

  

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/${user._id}`)
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  const columns = [
    { field: "amount", headerName: "Amount", width: 140 },
    {
      field: "products",
      headerName: "Products",
      width: 350,
      
      renderCell: (params) => {
        return (
          <div>
              <b>Quantiny: </b>{params.row.products[0].quantiny}
              <b> ProducId: </b>{params.row.products[0].productId}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: " Status",
      width: 150,
      renderCell: (params) => {
        return (
          <>    
          <button className={"widgetLgButton " + params.row.status}>{params.row?.status}</button>
          </>
        );
      },
    },
  ];

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Account</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={ user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phonenumber}</span>
            </div>
            <Button className="button" variant="contained" ><Link style={{textDecoration: 'none', color: "white" }} to="/resetpass">Reset password </Link></Button>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Order List</span>
          <DataGrid
              rows={order}
              columns={columns}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
              checkboxSelection= {false}
            />
        </div>
      </div>
    </div>
  );
}
