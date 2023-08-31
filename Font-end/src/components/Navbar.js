import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined} from '@material-ui/icons'
import {mobile} from '../responsive'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logoutProduct } from '../redux/productRedux';
import { logout } from '../redux/userRedux';
import { Badge } from '@material-ui/core';
import { removeCart } from '../redux/cartReducer';
import { Autocomplete, Box, Stack, TextField } from '@mui/material';

const Conteiner = styled.div` 
    height: 70px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
    ${mobile({height: "50px"})}
`;
const Wrapper= styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding: "10px 0px"})}
`;
const Left = styled.div`
    flex:1;
    display:flex;
    align-items: center;
`;
const Lenguage = styled.span`
    font-size: 14px;
    margin-right:15px;
    cursor: pointer;
    ${mobile({display: "none"})}
`;
const SearchContainer = styled.div`
   border: 0.5px solid lightgray;
   display: flex;
   align-items: center;
   margin-left: 25px;
   padding: 5px;
`;
const Input = styled.input`
    border: none;
    outline:none;
    ${mobile({width: "50px"})}
`;
const Center = styled.div`
    flex:1;
    text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "10px" })}
`;

const Right = styled.div`
  margin-right: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  ${mobile({ flex: 1, justifyContent: "center", marginRight: "0px"})}
`;
const Img =styled.img`
 width:30px;
 height: 30px;
 vertical-align: middle;
 border-radius: 50%;
`

const MenuItem = styled.div`
  display: flex;
  color: black;
  ${'' /* justify-content: center; */}
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  ${'' /* margin-left: 25px; */}
  margin: 10px;
  transition: all 0.5s ease;
 
  ${mobile({
    fontSize: "8px",
    margin: "10=px",
    justifyContent: "flex-start",
    alignItems: "center",
  })}
`;
const Button =styled.button`
    border: none;
    background-color:white;
    cursor: pointer;
 ` 
  
const Label = styled.label`
display: none;
font-size: 12px;
margin-right: 15px;
${mobile({ display: "block" })}
`;

const Navbar = () => {
    const inputRef = useRef();

    const history = useNavigate ();
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.cart?.quantity);
    const user = useSelector((state) => state.user?.currentUser?.user);
    const product = useSelector((state) => state.product?.products);

    const out=()=>{
        dispatch(logout());
        dispatch(removeCart({}));
        history('/')
    }
    const handle=()=>{
        history('/account')
    }

  

  return (
    <Conteiner>
        <Wrapper>  
           <Left>
              <Lenguage>EN</Lenguage>
                <Label>Search:</Label>
                    <Autocomplete
                      id="search-products"
                      sx={ window.innerWidth < 500 ? { width: "100%",  } : { width: "70%", }}
                      options={product}
                      autoHighlight
                      getOptionLabel={(option) => option.title}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <Link
                            to={`/product/${option._id}`}
                            className="link"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              loading="lazy"
                              height={
                                window.innerWidth > 700
                                  ? window.innerWidth / 10 + "px"
                                  : window.innerWidth / 4 + "px"
                              }
                              src={option.img}
                              alt=""
                              style={{ flex: "1" }}
                            />
                            <div style={{ flex: "1", marginLeft: "10px" }}>
                              {option.title}
                              <br />
                              {option.price} &#8363;
                            </div>
                          </Link>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                        />
                      )}
                    />

           </Left>
           <Link to="/" style={{ textDecoration: 'none' }}><Center ><Logo> Homme Shop! </Logo></Center></Link>
           <Right> 
                {!user ? <Link to="/register" style={{ textDecoration: 'none' }}><MenuItem> Register</MenuItem> </Link>:  <Button onClick={handle}> <Img  src={ user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}/> </Button>}
                {!user ? <Link to="/login" style={{ textDecoration: 'none' }}><MenuItem> Login</MenuItem> </Link> :  <Button onClick={out}><MenuItem> Log Out</MenuItem> </Button>
               }
               <Link to="/cart">
               <MenuItem>
                 <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined/>
                 </Badge>
               </MenuItem> 
               </Link>
           </Right>
        </Wrapper>
    </Conteiner>
  )
}

export default Navbar