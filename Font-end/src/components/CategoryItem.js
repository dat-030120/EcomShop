import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../responsive';

const Container = styled.div`
  width: 24.5%;
  margin-bottom:10px;
  height: 360px;
  position: relative;
  border: 10px;
  ${mobile({ flex:"1", width:"100%",})}
`;
const Imge =styled.img`
  width:100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "30vh"})}
`;
const Info = styled.div`
  position: absolute;
  bottom:0;
  left:0;
  width: 100%;
  height: 100%;
  align-items:center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Titel = styled.h1`
  color :black ;
  font-weight: 550;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: 0.25;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover{
    background-color:#e9f5f5;
    transform: scale(1.2);
  };
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      
      <Link to ={`/products/${item.cat}`}>
        <Imge src={item.img}/>
        <Info>
           <Titel>{item.title}</Titel>
           <Button> Shop Now</Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem