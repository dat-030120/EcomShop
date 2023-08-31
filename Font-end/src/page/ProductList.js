import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
 background-color : lightblue;
 `;
const Title= styled.h1`
  margin: 20px;
`;
const FilterContainer= styled.div`
  display:flex;
  justify-content: space-between;
`;

const Filter= styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px",display:"flex",flexDirection:"column"})}
`;
const FilterText =styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`;
const Option= styled.option``;
const Select= styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters,setFilters] = useState({});
  
  const handleFilters=(e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    })
  };

  useEffect(() => {
    setFilters({
      "category" :cat});
  }, [cat]);

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title> {cat || "List Products" } </Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Product:</FilterText>
            <Select name ="category" onChange={handleFilters}>
              <Option disabled  selected>
                {cat || "Category"}
              </Option>
              <Option>Pet</Option>
              <Option>Toy</Option>
              <Option>Care</Option>
              <Option>Food</Option>
              <Option>All</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={filters}  />
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList