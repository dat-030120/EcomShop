import "./Order.css";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { userRows } from "../../dummyData";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getOrder } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";
import Button from '@mui/material/Button';
import { ArrowDropDown } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Menu, MenuItem, Slide, styled } from "@material-ui/core";
import { alpha } from "@mui/material";
import {format} from "timeago.js"


export default function Order() {
  const [order,setOrders]=useState([])

  const history= useHistory();



  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const columns = [
    {
      field: "userId",
      headerName: "User",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
    },
    { field: "amount", headerName: "Amount", width: 120 },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Date created",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="widgetLgDate">{format(params.row.createdAt)}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
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
                  await userRequest.put(`/orders/${[e.target.name]}`,{ status: e.target.value, email:params.row.email})
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
    <div className="userList">
      <DataGrid
        rows={order}
        columns={columns}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
        checkboxSelection= {false}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
