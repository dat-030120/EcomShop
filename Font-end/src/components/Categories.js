import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import {categories} from "../sliderItems"
import CategoryItem from './CategoryItem';


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  margin:20px;
  flex: 1;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;


const Categories = () => {
  return (
    <Container>

        {categories.map(item=>(
            <CategoryItem item={item} key ={item.id}/>
        ))}
    </Container>
  )
}

export default Categories