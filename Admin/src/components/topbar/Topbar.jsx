import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ArrowDropDownCircleOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { alpha, Button, Menu, MenuItem, styled } from "@mui/material";
import { Divider, IconButton } from "@material-ui/core";
import { logout } from "../../redux/userRedux";
import { logoutProduct } from "../../redux/productRedux";
import { Link, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useRef } from "react";
import { useEffect } from "react";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function Topbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const  socketRef= useRef()
  const admin = useSelector((state) => state.user.currentUser?.user?.img);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    socketRef.current = socketIOClient.connect('https://socket-1o57.onrender.com/')
    socketRef.current.emit('join_room', {})
    socketRef.current.on('receive_message', dataGot => {
      setCount(count=>count+1)
      console.log(dataGot)
      }) 
  },[])
  const gooder = () => {
    setCount(0);
    history.push("/order")
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
      dispatch(logout());
      dispatch(logoutProduct());
      history.push("/login")
    setAnchorEl(null);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Homme</span>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer" >
            <NotificationsNone  onClick={gooder}/>
            <span className="topIconBadge">{count || "!"}</span>
          </div>
              <div>
              <IconButton
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
              >
                 <img src={ admin ||"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="topAvatar" />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={Logout} disableRipple>
                  Logout
                </MenuItem>
              </StyledMenu>
    </div>
         
        </div>
      </div>
    </div>
  );
}
