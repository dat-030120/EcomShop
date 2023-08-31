import {  ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../responsive';
import { sliderItems } from '../sliderItems';

const Container= styled.div`
  margin:25px;
  display:flex;
  height:90vh;
  position:relative;
  background-color: white;

  overflow: hidden;
  ${mobile({display: "none"})}
`;
const Arrow =styled.div`
  width:50px;
  align-items:center;
  background-color: white;
  height: 50px;
  display:flex;
  justify-content:center;
  border-radius:50%;
  top:0;
  margin:auto;
  bottom: 0;
  left:${props=>props.direction==="left"&& "12px"};
  right:${props=>props.direction==="right"&& "12px"};
  position:absolute;
  opacity:0.5;
  cursor: pointer;  
  z-index: 2;
`;
 const Slide =styled.div`
  height: 95vh; 
  display: flex;
  width: 100vw;
  align-items: center; 
  background-color:#${props=>props.bg};
`;
const Image = styled.img`
  height:100%;
  width: 100%;
  
`;
const ImgContainer =styled.div`
  flex: 1;
  height:100%;
`;
const InfoContainer =styled.div`
  flex: 1;
  padding:50px;
`;
const Wrapper=styled.div`
  height:100%;
  display: flex;
  transition: all 1.5s ease;
  transform:translateX(${(props) =>props.slideIndex *-100}vw);
`;
const Title=styled.h2`
 font-size:60px;
`;
const Direction=styled.p`
  margin:50px 0px;
  font-size: 18px;
  font-weight: 510;
  letter-spacing:3px;
`;
const Button=styled.button`
 padding: 10px;
 font-size: 22px;
 background-color: transparent;
 cursor: pointer;
`;

const Slider = () => {
  const history = useNavigate ();

  const user = useSelector((state) => state.product.products);
    const [slideIndex,setSlideIndex] =useState (0); 
    const handleClick = (direction)=>{
      if (direction ==="left"){
        setSlideIndex(  )
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex +1 :0 )
      }
    };
    
  const click=(id)=>{
    history("/product/"+id)
  }
  useEffect(() => {
    setTimeout(()=>{
      if(slideIndex <2){
        setSlideIndex(slideIndex => slideIndex+1)
      }else{setSlideIndex(0)}
    },7000) 
  }, [slideIndex]); 
  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {user.slice(0,3).map((item) =>(
          <Slide bg={item.bg} key={item?.id} >
            <ImgContainer>
              <Image src={item.img}/>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Direction>{item.desc}</Direction>
              <Button onClick={()=>click(item._id)}>Click in site</Button>
            </InfoContainer>
          </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider