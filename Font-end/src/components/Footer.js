import { Facebook, Instagram, Mail, Phone, Room } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container =styled.div`
    display: flex;
    background-color: lightblue;
    ${mobile({flexDirection: "column"})}
`;
const Left =styled.div`
    flex:1;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;
const Desc =styled.p`
    margin:20px 0px ;

`;
const Logo =styled.h1`
`;
const SocialContainer =styled.div`
    display: flex;

`;
const SocialIcon =styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props =>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:20px ;
`;
const Center =styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})}
`;
const Title =styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap:wrap ;

`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Right =styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: "#fff8f8"})}
`;
const Map =styled.iframe`
    width:400;
    height: 500;
    border: 0;
`;
const ContactItem= styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>Homme </Logo>
            <Desc>
                We have alot of product use for help care your pet. Wellcom to us shop.
            </Desc>
            <SocialContainer>
                <SocialIcon color='3B5999'>
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title> </Title>
            <List>
                <ListItem><Link to="/" style={{ textDecoration: 'none' }}>Home</Link></ListItem>
                <ListItem><Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link></ListItem>
                <ListItem><Link to="/products" style={{ textDecoration: 'none' }}>All product</Link></ListItem>
            </List>
        </Center>
        <Right>
            <Title>Comtact</Title>
            <Map src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d445.66281503091693!2d108.25642197594159!3d16.016261319172575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1662285112331!5m2!1svi!2s"></Map>
            <ContactItem><Room style={{marginRight:"15px"}}/> Ha Noi</ContactItem>
            <ContactItem><Phone style={{marginRight:"15px"}}/>(+84) 702*****8</ContactItem>
            <ContactItem><Mail style={{marginRight:"15px"}}/>Test@gmail.com</ContactItem>
        </Right>
    </Container>
  )
}


export default Footer