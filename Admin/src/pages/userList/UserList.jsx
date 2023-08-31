import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlluser } from "../../redux/apiCalls";
import { format } from "timeago.js";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.allUsers);
  const { location } = useParams();

  useEffect(() => {
    getAlluser(dispatch);
  }, [dispatch]);


  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg"  
            src={ params.row?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
            {params.row?.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Date created",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="widgetLgDate">{format(params.row.createdAt)}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row?._id}>
              <button className="userListEdit">Detail</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={user}
        columns={columns}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
        checkboxSelection= {false}
      />
    </div>
  );
}
