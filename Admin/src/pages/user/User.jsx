import { DataGrid } from "@material-ui/data-grid";
import {
  CalendarToday,
  Email,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./user.css";

export default function User() {
  const location = useLocation();
  const history= useHistory();

  const [order,setOrders]=useState([])
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
   state.user?.allUsers.find((user) => user._id === userId)
  );

  useEffect(() => {
    const getOrders = async () => {
      try {
        console.log(userId)
        const res = await userRequest.get(`/orders/${userId}`)
        console.log(res.data)
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
              <b>Quantiny: </b>{params.row.products[0]?.quantiny}
              <b> ProducId: </b>{params.row.products[0]?.productId}
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
          <select name={params.row._id} onChange={(e) => 
              {const getOrders = async () => {
                try {
                  await userRequest.put(`/orders/${[e.target.name]}`,{ status: e.target.value})
                  history.push("/order")
                } catch {}
              };
              getOrders();}
          }>
            <option value={params.row?.status}  > {params.row?.status}</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>           
          </>
        );
      },
    },
  ];

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
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
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <Email className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phonenumber}</span>
            </div>
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
