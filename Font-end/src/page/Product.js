import { Add, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { publicRequest } from "../requestMethods";
import { addProduct, removeCart } from "../redux/cartReducer";
import { useDispatch } from "react-redux";

const Container = styled.div`
 background-color : lightblue;
`;
const ImgContainer = styled.div`
    flex: 1;
`;
const Image = styled.img`
    width:100% ;
    height: 100%;
    
    ${mobile({height: "40vh"})}
`;
const Warrpper = styled.div`
    display: flex;
    padding: 50px;
    ${mobile({padding: "10px",flexDirection:"column"})}
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})}
`;
const Title = styled.h2`
    font-weight: 200;
`;
const Desc = styled.h2`
    margin : 20px 0px;   
    font-weight: 200;
`;
const FilterContainer= styled.div`
    display: flex;
    width: 50%;
    margin: 30px 0px;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`;
const Filter = styled.div`
    display:flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight:200;
`;
const FilterColor = styled.div`
    width: 20px;
    height:20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px; 
    cursor: pointer;
`;
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;
const FilterSizeOption = styled.option`

`;
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width:50%;
    justify-content:space-between;
    ${mobile({width: "100%"})}
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal ;
    align-items: center;
    justify-content: center;
    display: flex;
    margin:  0xp 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 1px solid teal;
    background-color: white;
    cursor: pointer;
    opacity:0.8;
    &:hover{
        background-color: #f8f4f4;
    }
`;
const Price = styled.h2`
    font-weight: 200;
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleQuantity = (type) => {
        if (type === "down") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
      };

    const handleAdd =()=>{
        dispatch(  
            addProduct({...product,quantity})
        )
    }  
    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await publicRequest.get("products/find/"+ id);
            console.log(res)
            setProduct(res.data);
            console.log(res)
          } catch {}
        };
        getProduct();
      }, [id]);
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Warrpper>
            <ImgContainer>
                <Image src ={product?.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>Title:{product?.title} </Title>
                <Desc>Desc: {product?.desc} 
                </Desc>
                <Desc>Category: {product?.category}</Desc>

                <Price>Price: ${product?.price}</Price>
                <AddContainer>
                <AmountContainer>
                    <Remove onClick={() => handleQuantity("down")} />
                    <Amount>{quantity}</Amount>
                    <Add onClick={() => handleQuantity("up")} />
                    </AmountContainer>
                    <Link to="/cart"><Button onClick={handleAdd}>ADD TO CART</Button></Link>
            </AddContainer>
            </InfoContainer>
        </Warrpper>
        <Newsletter/>
    </Container>
  )
}

export default Product