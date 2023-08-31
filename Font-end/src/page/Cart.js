
import { Add, Delete, DeleteForeverOutlined, Remove } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { addProduct, removeCart, removeProduct } from "../redux/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate  } from "react-router";
import { userRequest } from '../requestMethods'
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";


const Container = styled.div`
    margin-top: 10px;
     background-color : lightblue;

`;
const Wrapper=styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`;
const Title=styled.h1`
    font-weight: 300;
    text-align: center;
`;
const TopButton =styled.button`
    padding: 10px;
    font-weight: 580;
    cursor: pointer;
    border: ${(props)=>props.type ==="filled"&& "none"};
    background-color: ${(props)=>props.type ==="filled"? "black" : "transparent"};
    color: ${(props)=>props.type ==="filled"&& "white"};
`;
const Top=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopTexts=styled.div`
    ${mobile({display: "none"})}
`;
const TopText=styled.span`
    text-decoration: underline;
    cursor:pointer;
    margin: 0px 10px;
`;
const Bottom=styled.div`
    display: flex;
    justify-content:space-between;
    ${mobile({flexDirection: "column"})}
`;
const Summary=styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;
const Info=styled.div`
   flex: 3;
`;
const Product=styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
    margin-bottom: 15px;
`;
const ProductDetail=styled.div`
    flex:2;
    display: flex;
`;
const ProductColor=styled.div`
    width:20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props)=>props.color};
`;
const ProductId=styled.span`
    
`;
const ProductName=styled.span`
    
`;

const Image=styled.img`
    width: 200px;
`;
const Details=styled.div`
    padding: 20px;
    flex-direction: column;
    display: flex;
    justify-content:space-around;
`;
const PriceDetail=styled.div`
    flex:1;
    display: flex;
    align-items: center;
    flex-direction:column;
    justify-content: center;
`;
const ProductAmountContainer =styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const ProductAmount =styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})}
`;
const ProductPrice =styled.div`
    font-size: 22px;
    font-weight: 200;
    ${mobile({marginBottom: " 16px"})}
`;

const Hr =styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin-bottom:15px;
`;
const SummaryTitle =styled.h1`
    font-weight:200;
`;
const SummaryItem =styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props)=>props.type ==="total"&&"500"};
    font-size: ${(props)=>props.type ==="total"&&"24px"};

`;
const SummaryItemText =styled.span`

`;
const SummaryItemPrice =styled.span`

`;
const SummaryButton= styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;

`;
const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;      
    transform: scale(1.1);
  }
  ${mobile({ display: "none" })}
`;

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.currentUser.user);
    const key = "pk_test_51LiCEuKsJjO4hFICzJ4U5dXkX6yragcBJcjvZM554XAhvqO3dCUruT4SejsI3sXfLYqfZzk6feQxaGtY53oZWV0M00dnXiIkj5";




    const onToken =async (token) => {
        setStripeToken(token);
        navigate("/success/"+ token.card.address_line1);
    };
  
    const remove =()=>{
        if(window.confirm('Are you sure you want to remove this product'))
        dispatch(removeCart({}))
    };
    const handleQuantity = (type, id) => {
        const quantity = 1;
   
        const product = cart.products.find((element) => element?._id === id);
        if (type === "up") {
          dispatch(addProduct({ ...product, quantity }));
        }
        if (type === "down") {
          dispatch(removeProduct({ ...product, quantity }));
        }
      };
    
    const removeFromCart = (id) => {
        const product = cart.products.find((element) => element?._id === id);
        const quantity = product.quantity;
        if(window.confirm('Are you sure you want to remove this product'))
        dispatch(removeProduct({ ...product, quantity }));
    };



  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopButton><Link to="/products" style={{ textDecoration: 'none'}}>CONTINUE SHOPPING</Link></TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishist(0)</TopText>
                </TopTexts>
                <TopButton type="filled" onClick={()=> remove()} ><Delete style={{height:"18px"}}/></TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product =>(
                        <div>
                         <Product>
                         <ProductDetail>
                             <Image src={product?.img}/>
                             <Details>
                                 <ProductName><b>Product: </b> {product?.title}</ProductName>
                                 <ProductPrice><b>Price: </b> {product?.price}</ProductPrice>
                             </Details>
                         </ProductDetail>
                         <PriceDetail>
                             <ProductAmountContainer>
                                 <Add onClick={()=>handleQuantity("up",product?._id)} />
                                 <ProductAmount> {product?.quantity}</ProductAmount>
                                 <Remove onClick={()=>handleQuantity("down",product?._id)} />
                                 <DeleteButton onClick={()=>removeFromCart(product?._id)}>
                                        <DeleteForeverOutlined color="error" />
                                </DeleteButton>
                             </ProductAmountContainer>
                             <ProductPrice><b>Total price:</b> ${product?.price*product?.quantity}</ProductPrice>
                         </PriceDetail>
                     </Product>
                        <Hr/>
                     </div>
                    ))}
                       
                </Info>
                <Summary> 
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$  {cart?.total}</SummaryItemPrice>
                    </SummaryItem>
    
                    <SummaryItem type="toal">
                        <SummaryItemText > Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                        name="Hommee Shop"
                        image={user?.img|| 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'}
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={"pk_test_51LiCEuKsJjO4hFICzJ4U5dXkX6yragcBJcjvZM554XAhvqO3dCUruT4SejsI3sXfLYqfZzk6feQxaGtY53oZWV0M00dnXiIkj5"}
                    >
                        <SummaryButton>CHECKOUT NOW</SummaryButton>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart